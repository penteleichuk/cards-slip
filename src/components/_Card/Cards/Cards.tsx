import React, {useEffect, useState} from "react";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Card, SkeletonItems} from "../../components";
import {getCards, removeCardTC, updateCardTC} from "../../../pages/card/s2-bll/CardThunks";
import {useLocation, useSearchParams} from "react-router-dom";
import './../../_Pack/Packs/Packs.scss';
import {RemoveCardModal} from "../CardsModals/RemoveCardModal";
import {UpdateCardModal} from "../CardsModals/UpdateCardModal";
import {
    setCurrentCardPage,
    setSortCardsParams
} from "../../../pages/card/s2-bll/CardActions";

type CardsPropsType = {
    navigatePage: string
}

export type ItemToUpdateType = {
    cardId: string
    cardQuestion: string
    cardAnswer: string
}

export const Cards = React.memo(({navigatePage}: CardsPropsType) => {

    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const location = useLocation();

    const {cardsTotalCount, pageCount, cards, page} = useAppSelector(state => state.card);
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
    const CountCard = useAppSelector(state => state.card.cardsTotalCount);

    const [itemToRemove, setItemToRemove] = useState<string>('')
    const [itemToUpdate, setItemToUpdate] = useState<ItemToUpdateType>({
        cardId: '',
        cardQuestion: '',
        cardAnswer: ''
    })

    useEffect(() => {
        dispatch(setSortCardsParams({sortCode: "0", sortType: ''}))
    }, [CountCard])

    useEffect(() => {
        const packId = urlParams.get('id');
        if (packId) {
            dispatch(getCards({cardsPack_id: packId, page: page, pageCount: pageCount}));
        }
    }, [page, pageCount, location, cardsTotalCount])

    const clickPageHandler = (page: number) => {
        dispatch(setCurrentCardPage({page}))
    }

    const removeCard = () => {
        const packId = urlParams.get('id')

        packId && dispatch(removeCardTC(itemToRemove, packId))
        clearFieldsItemsToRemove()
    }
    const clearFieldsItemsToRemove = () => {
        setItemToRemove('')
    }

    const updateCard = () => {
        const packId = urlParams.get('id')

        packId && dispatch(updateCardTC(itemToUpdate.cardId, packId, itemToUpdate.cardQuestion, itemToUpdate.cardAnswer))
        clearFieldsItemsToUpdate()
    }
    const clearFieldsItemsToUpdate = () => {
        setItemToUpdate({cardId: '', cardQuestion: '', cardAnswer: ''})
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
                          setItemToUpdate={setItemToUpdate}
                    />
                )}

                <RemoveCardModal itemToRemove={itemToRemove}
                                 removeCard={removeCard}
                                 clearFieldsItemsToRemove={clearFieldsItemsToRemove}/>

                <UpdateCardModal itemToUpdate={itemToUpdate}
                                 setItemToUpdate={setItemToUpdate}
                                 updateCard={updateCard} clearFieldsItemsToUpdate={clearFieldsItemsToUpdate}/>

                {
                    !(cards.length < 1) &&
                    <PaginatedPage onPageChanged={clickPageHandler}
                                   totalCards={cardsTotalCount}
                                   countPages={pageCount}
                                   currentPage={page}
                    />
                }
            </>
        }
    </>
});