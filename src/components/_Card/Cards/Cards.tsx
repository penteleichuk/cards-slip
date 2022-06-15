import React, {useEffect, useState} from "react";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {setCurrentPageAC} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Card, SkeletonItems} from "../../components";
import {fetchCards, removeCardTC} from "../../../pages/card/s2-bll/CardThunks";
import {useLocation, useSearchParams} from "react-router-dom";
import './../../_Pack/Packs/Packs.scss';
import {Popup} from "../../Popup/Popup";

type CardsPropsType = {
    navigatePage: string
}

export const Cards = React.memo(({navigatePage}: CardsPropsType) => {

    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const location = useLocation();

    const {cardsTotalCount, pageCount, cards, page} = useAppSelector(state => state.card);
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

    const [itemToRemove, setItemToRemove] = useState<string | null>(null)

    useEffect(() => {
        const packId = urlParams.get('id');
        if (packId) {
            dispatch(fetchCards({cardsPack_id: packId, page: page, pageCount: pageCount}));
        }
    }, [page, pageCount, location])

    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    const removeCard = (cardId: string) => {
        setItemToRemove(null)
        dispatch(removeCardTC(cardId))
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
                          setItemToRemove={setItemToRemove}
                    />
                )}
                {
                    itemToRemove
                    && <Popup show={true} title={'Are you sure you want to remove the card?'}>
                        <span style={{padding: '10px'}} onClick={() => removeCard(itemToRemove)}>Yes</span>
                        <span style={{padding: '10px'}} onClick={() => setItemToRemove(null)}>No</span>
                    </Popup>
                }
                <PaginatedPage onPageChanged={clickPageHandler}
                               totalCards={cardsTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />
            </>
        }
    </>
});