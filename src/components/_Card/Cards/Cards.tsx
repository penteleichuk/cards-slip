import React, {ChangeEvent, useEffect, useState} from "react";
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
import {Popup} from "../../Popup/Popup";

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

    const removeCard = (cardId: string) => {
        setItemToRemove('')
        dispatch(removeCardTC(cardId))
    }

    const updateCardQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setItemToUpdate({...itemToUpdate, cardQuestion: e.currentTarget.value})
    }
    const updateCardAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setItemToUpdate({...itemToUpdate, cardAnswer: e.currentTarget.value})
    }

    const updateCard = (cardId: string, newCardQuestion: string, newCardAnswer: string) => {
        setItemToUpdate({cardId: '', cardQuestion: '', cardAnswer: ''})
        dispatch(updateCardTC(cardId, newCardQuestion, newCardAnswer))
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
                {
                    <Popup show={!!itemToRemove} title={'Are you sure you want to remove the card?'}>
                        <span style={{padding: '10px'}} onClick={() => removeCard(itemToRemove)}>Yes</span>
                        <span style={{padding: '10px'}} onClick={() => setItemToRemove('')}>No</span>
                    </Popup>
                }
                {
                    <Popup show={!!itemToUpdate.cardId} title={'Update card'}>
                        <div>
                            <div>Question</div>
                            <textarea style={{minWidth: "30vw", maxWidth: "30vw", minHeight: "5vh", maxHeight: "5vh"}}
                                      value={itemToUpdate.cardQuestion}
                                      onChange={updateCardQuestion}
                            />
                        </div>
                        <div>
                            <div>Answer</div>
                            <textarea style={{minWidth: "30vw", maxWidth: "30vw", minHeight: "10vh", maxHeight: "10vh"}}
                                      value={itemToUpdate.cardAnswer}
                                      onChange={updateCardAnswer}
                            />
                        </div>
                        <span
                            onClick={() => updateCard(
                                itemToUpdate.cardId,
                                itemToUpdate.cardQuestion,
                                itemToUpdate.cardAnswer)}
                        >
                            Yes
                        </span>
                        <span onClick={() => setItemToUpdate({cardId: '', cardQuestion: '', cardAnswer: ''})}>
                            No
                        </span>
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