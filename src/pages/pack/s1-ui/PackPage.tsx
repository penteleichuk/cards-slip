import './PackPage.scss';
import {getPacksTC} from "../s2-bll/PackThunks";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, AppStoreType} from "../../app/s2-bll/store";
import {ThunkDispatch} from "redux-thunk";
import {CardPacksType, GetPackRequestType} from "../s3-dal/PackApi";
import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {PaginatedPage} from "../../../components/Paginated/PaginatedPage";
import {setCurrentPageAC} from "../s2-bll/PackActions";
import {CardsPerPage} from "../../../components/CardsPerPage/CardsPerPage";
import {RequestStatusType} from "../../app/s2-bll/AppReducer";
import {LoadingPage} from "../../../components/_Pages/Loading/LoadingPage";

export const PackPage = React.memo(() => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const paramsCards = useSelector<AppStoreType, GetPackRequestType>(state => state.pack)
    const currentPage = useSelector<AppStoreType, number>(state => state.pack.page)
    const totalPacksCards = useSelector<AppStoreType, number>(state => state.pack.cardPacksTotalCount)
    const countPages = useSelector<AppStoreType, number>(state => state.pack.pageCount)
    const packCards = useSelector<AppStoreType, CardPacksType[]>(state => state.pack.cardPacks)
    const dispatch: ThunkDispatch<AppStoreType, GetPackRequestType, ActionType> = useDispatch()


    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    useEffect(() => {
        dispatch(getPacksTC({page: currentPage, pageCount: paramsCards.pageCount}))
    }, [currentPage, paramsCards.pageCount])
    if (!isAuth) {
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return (
        <section className="content forgot">
            <div>Pack Page</div>
            {status === 'loading' ?
                <LoadingPage/> :
                <div className="content loading-page">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cards Count</th>
                            <th>Created</th>
                            <th>Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packCards.map(c =>
                            <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{c.cardsCount}</td>
                                <td>{JSON.stringify(c.created)}</td>
                                <td>{JSON.stringify(c.updated)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }
            <div>
                <PaginatedPage onPageChanged={clickPageHandler} totalCards={totalPacksCards} countPages={countPages}
                               currentPage={currentPage}/>
                <CardsPerPage pageCount={paramsCards.pageCount}/>
            </div>
        </section>
    )
})