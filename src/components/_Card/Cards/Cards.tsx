import React, {useEffect, useState} from "react";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {setCurrentPageAC, setPacks} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Card, SkeletonItems} from "../../components";
import {fetchCards, fetchRemoveCard, fetchUpdateCard} from "../../../pages/card/s2-bll/CardThunks";
import {useLocation, useSearchParams} from "react-router-dom";
import './../../_Pack/Packs/Packs.scss';
import {RemoveCardModal} from "../CardsModals/RemoveCardModal";
import {UpdateCardModal} from "../CardsModals/UpdateCardModal";

export type ItemToUpdateType = {
    cardId: string
    cardQuestion: string
    cardAnswer: string
}

export const Cards = React.memo(({navigatePage}: { navigatePage: string }) => {

    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const location = useLocation();

    const {cardsTotalCount, pageCount, cards, page} = useAppSelector(state => state.card);
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

    const [itemToRemove, setItemToRemove] = useState<string>('')
    const [itemToUpdate, setItemToUpdate] = useState<ItemToUpdateType>({
        cardId: '',
        cardQuestion: '',
        cardAnswer: ''
    })

    useEffect(() => {
        const packId = urlParams.get('id');
        if (packId) {
            dispatch(fetchCards({cardsPack_id: packId, page: page, pageCount: pageCount}));
        }
    }, [page, pageCount, location, cardsTotalCount])

    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC({currenPage: page}));
    }

    const removeCard = () => {
        const packId = urlParams.get('id')

        packId && dispatch(fetchRemoveCard(itemToRemove, packId))
        clearFieldsItemsToRemove()
    }
    const clearFieldsItemsToRemove = () => {
        setItemToRemove('')
    }

    const updateCard = () => {
        const packId = urlParams.get('id')

        packId && dispatch(fetchUpdateCard(itemToUpdate.cardId, packId, itemToUpdate.cardQuestion, itemToUpdate.cardAnswer))
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

                <PaginatedPage onPageChanged={clickPageHandler}
                               totalCards={cardsTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />
            </>
        }
    </>
});
