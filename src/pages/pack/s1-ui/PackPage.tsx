import './PackPage.scss';
import {getPacksTC, setCardsSortTC} from "../s2-bll/PackThunks";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, AppStoreType} from "../../app/s2-bll/store";
import {ThunkDispatch} from "redux-thunk";
import {CardPacksType, GetPackRequestType} from "../s3-dal/PackApi";
import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {PaginatedPage} from "../../../components/Paginated/PaginatedPage";
import {setCurrentPageAC} from "../s2-bll/PackActions";

export const PackPage = React.memo(() => {
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const paramsCards = useSelector<AppStoreType, GetPackRequestType>(state => state.pack)
    const currentPage = useSelector<AppStoreType, number>(state => state.pack.page)
    const totalPacksCards = useSelector<AppStoreType, number>(state => state.pack.cardPacksTotalCount)
    const countPages = useSelector<AppStoreType, number>(state => state.pack.pageCount)
    const packCards = useSelector<AppStoreType, CardPacksType[]>(state => state.pack.cardPacks)
    const dispatch: ThunkDispatch<AppStoreType, GetPackRequestType, ActionType> = useDispatch()
    const tableFieldNames = [
        {id: 1, title: 'Name', name: 'name'},
        {id: 2, title: 'Cords count', name: 'cardsCount'},
        {id: 3, title: 'Created', name: 'created'},
        {id: 4, title: 'Updated', name: 'updated'}
    ]

    const sort = (e: React.MouseEvent<HTMLElement>) => {
        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
        const code: string = e.currentTarget.dataset.c ? e.currentTarget.dataset.c : '';
        (type != '' && code != '') && dispatch(setCardsSortTC( { code, type }))
     }

    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    useEffect(() => {
        dispatch(getPacksTC({page: currentPage, pageCount: paramsCards.pageCount}))
    }, [currentPage])
    if (!isAuth) {
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return (
        <section className="content forgot" style={{marginTop: '50px'}}>
            <div>Pack Page</div>
            <table>
                <thead>
                <tr>
                    {
                        tableFieldNames.map(el => <th key={el.id}>
                            <div className="names__container">
                                <span>{el.title}</span>
                                <div>
                                    <div data-t={el.name} data-c="0" onClick={sort}>▲</div>
                                    <div data-t={el.name} data-c="1" onClick={sort}>▼</div>
                                </div>
                            </div>
                        </th>)
                    }
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
            <div>
                <PaginatedPage onPageChanged={clickPageHandler} totalCards={totalPacksCards} countPages={countPages}
                               currentPage={currentPage}/>
            </div>
        </section>
    )
})