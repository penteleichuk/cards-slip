import React, {useEffect, useState} from "react";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {setCurrentPageAC} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Card, SkeletonItems} from "../../components";
import {fetchCards, removeCardTC, updateCardTC} from "../../../pages/card/s2-bll/CardThunks";
import {useLocation, useSearchParams} from "react-router-dom";
import './../../_Pack/Packs/Packs.scss';
import {RemoveCardModal} from "../CardsModals/RemoveCardModal";
import {UpdateCardModal} from "../CardsModals/UpdateCardModal";

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
    }, [page, pageCount, location])

    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
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

                {!!itemToRemove
                    ? <RemoveCardModal itemToRemove={itemToRemove} removeCard={removeCard}
                                       clearFieldsItemsToRemove={clearFieldsItemsToRemove}/>
                    : null}

                {!!itemToUpdate.cardId
                    ? <UpdateCardModal itemToUpdate={itemToUpdate} setItemToUpdate={setItemToUpdate}
                                       updateCard={updateCard} clearFieldsItemsToUpdate={clearFieldsItemsToUpdate}/>
                    : null}

                <PaginatedPage onPageChanged={clickPageHandler}
                               totalCards={cardsTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />
            </>
        }
    </>
});