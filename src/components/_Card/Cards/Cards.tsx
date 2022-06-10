import React, {useEffect} from "react";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {setCurrentPageAC} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Card, SkeletonItems} from "../../components";
import './../../_Pack/Packs/Packs.scss';
import {fetchCards} from "../../../pages/card/s2-bll/PackThunks";
import {useSearchParams} from "react-router-dom";

type CardsPropsType = {
    navigatePage: string
}

export const Cards = React.memo(({navigatePage}: CardsPropsType) => {
    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();

    const {cardsTotalCount, pageCount, cards, page} = useAppSelector(state => state.card);
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

    useEffect(() => {
        const packId = urlParams.get('id');
        if (packId) {
            dispatch(fetchCards({cardsPack_id: packId}));
        }
    }, [])

    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    return <>
        {isFetch === 'loading' ?
            <SkeletonItems/> :
            <>
                {cards.map(c =>
                    <Card key={c._id}
                          id={c._id}
                          author_id={c.user_id}
                          answer={c.answer}
                          question={c.question}
                          grade={c.grade}
                          created={c.created}
                    />
                )}
                <PaginatedPage onPageChanged={clickPageHandler}
                               totalCards={cardsTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />
            </>
        }
    </>
});