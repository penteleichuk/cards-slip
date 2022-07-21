import React, {useCallback, useState} from "react";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Card, SkeletonItems} from "../../components";
import {fetchGetCards, fetchRemoveCard, fetchUpdateCard} from "../../../pages/card/s2-bll/CardThunks";
import {useParams} from "react-router-dom";
import {RemoveCardModal} from "../CardsModals/RemoveCardModal";
import {UpdateCardModal} from "../CardsModals/UpdateCardModal";
import {setCardsPagination} from "../../../pages/card/s2-bll/CardActions";

export type ItemToUpdateType = {
    cardId: string
    cardQuestion: string
    cardAnswer: string
}

export const CardsDraw = React.memo(() => {
    const {cardsTotalCount, pageCount, cards, page} = useAppSelector(state => state.card);
    const isFetch = useAppSelector(state => state.app.status);
    const packId = useParams().id;

    const [itemToRemove, setItemToRemove] = useState<string>('');
    const [itemToUpdate, setItemToUpdate] = useState<ItemToUpdateType>({
        cardId: '',
        cardQuestion: '',
        cardAnswer: ''
    });

    const dispatch = useAppDispatch();

    // Confirm card removal
    const removeCardHandler = useCallback(() => {
        packId && dispatch(fetchRemoveCard(itemToRemove, packId));
        clearFieldsRemoveHandler();
    }, [itemToRemove, packId]);

    // Confirm card upgrade
    const updateCardHandler = useCallback(() => {
        packId && dispatch(fetchUpdateCard(itemToUpdate.cardId, packId, itemToUpdate.cardQuestion, itemToUpdate.cardAnswer));
        clearFieldsUpdateHandler();
    }, [itemToUpdate]);

    // Cleanup Deletion Fields
    const clearFieldsRemoveHandler = useCallback(() => {
        setItemToRemove('');
    }, []);

    // Clear Update Fields
    const clearFieldsUpdateHandler = useCallback(() => {
        setItemToUpdate({cardId: '', cardQuestion: '', cardAnswer: ''});
    }, []);

    // Pagination work
    const paginationHandler = useCallback((page: number) => {
        dispatch(setCardsPagination({page}));
        dispatch(fetchGetCards({}));
    }, []);

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

                {cards.length < 1 && <NotFound/>}

                <PaginatedPage onPageChanged={paginationHandler}
                               totalCards={cardsTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />

                <RemoveCardModal itemToRemove={itemToRemove}
                                 removeCard={removeCardHandler}
                                 clearFieldsItemsToRemove={clearFieldsRemoveHandler}/>

                <UpdateCardModal itemToUpdate={itemToUpdate}
                                 setItemToUpdate={setItemToUpdate}
                                 updateCard={updateCardHandler}
                                 clearFieldsItemsToUpdate={clearFieldsUpdateHandler}/>
            </>
        }
    </>
});

const NotFound = React.memo(() => {
    return <>
        <div> </div>
        <div className={"nf"}>Not found</div>
        <div> </div>
    </>
});
