import React, {useEffect, useState} from "react";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Card, SkeletonItems} from "../../components";
import {fetchGetCards, fetchRemoveCard, fetchUpdateCard} from "../../../pages/card/s2-bll/CardThunks";
import {useLocation, useSearchParams} from "react-router-dom";
import {RemoveCardModal} from "../CardsModals/RemoveCardModal";
import {UpdateCardModal} from "../CardsModals/UpdateCardModal";
import {setCardsPagination} from "../../../pages/card/s2-bll/CardActions";

export type ItemToUpdateType = {
    cardId: string
    cardQuestion: string
    cardAnswer: string
}

export const CardsDraw = React.memo(({navigatePage}: { navigatePage: string }) => {

    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const packId = urlParams.get('id');
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
        if (packId) {
            dispatch(fetchGetCards({cardsPack_id: packId, page: page, pageCount: pageCount}));
        }
    }, [dispatch, page, pageCount, location, cardsTotalCount, packId])

    const removeCard = () => {
        packId && dispatch(fetchRemoveCard(itemToRemove, packId))
        clearFieldsItemsToRemove()
    }
    const clearFieldsItemsToRemove = () => {
        setItemToRemove('')
    }

    const updateCard = () => {
        packId && dispatch(fetchUpdateCard(itemToUpdate.cardId, packId, itemToUpdate.cardQuestion, itemToUpdate.cardAnswer))
        clearFieldsItemsToUpdate()
    }
    const clearFieldsItemsToUpdate = () => {
        setItemToUpdate({cardId: '', cardQuestion: '', cardAnswer: ''})
    }

    // Pagination work
    const paginationHandler = (page: number) => {
        dispatch(setCardsPagination({page}));
        dispatch(fetchGetCards({}));
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

                <PaginatedPage onPageChanged={paginationHandler}
                               totalCards={cardsTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />
            </>
        }
    </>
});
