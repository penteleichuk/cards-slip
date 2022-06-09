import React from "react";
import {SkeletonItems} from "../Skeleton/SkeletonItems/SkeletonItems";
import {Pack} from "../Pack/Pack";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {CardPacksType} from "../../../pages/pack/s3-dal/PackApi";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {setCurrentPageAC} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import './Packs.scss';

export const Packs = React.memo(() => {

    const totalPacksCards = useSelector<AppStoreType, number>(state => state.pack.cardPacksTotalCount);
    const countPages = useSelector<AppStoreType, number>(state => state.pack.pageCount);
    const packCards = useSelector<AppStoreType, CardPacksType[]>(state => state.pack.cardPacks);
    const currentPage = useSelector<AppStoreType, number>(state => state.pack.page);
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
    const dispatch = useAppDispatch();

    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    return <>
        {isFetch === 'loading' ?
            <SkeletonItems/> :
            <>
                {packCards.map(c =>
                    <Pack key={c._id}
                          author={c.user_name}
                          description={c.name}
                          packs={c.cardsCount}
                          date={c.created}
                    />
                )}
                <PaginatedPage onPageChanged={clickPageHandler}
                               totalCards={totalPacksCards}
                               countPages={countPages}
                               currentPage={currentPage}
                />
            </>
        }
    </>
});