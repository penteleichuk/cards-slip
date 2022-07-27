import React, {useCallback, useLayoutEffect, useState} from "react";
import {SkeletonItems} from "../Skeleton/SkeletonItems/SkeletonItems";
import {Pack} from "../Pack/Pack";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {setPacksPagination} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {fetchGetPacks, fetchRemovePack, fetchUpdatePack} from "../../../pages/pack/s2-bll/PackThunks";
import {RemovePackModal} from "../PacksModals/RemovePackModal";
import {UpdatePackModal} from "../PacksModals/UpdatePackModal";
import StudyQuestionModal from "../PacksModals/StudyPacksModals/StudyQuestionModal";
import {StudyStageType} from "../../../enums/enums";
import StudyAnswerModal from "../PacksModals/StudyPacksModals/StudyAnswerModal";
import {setActualStudyCard, setStudyStage} from "../../../pages/card/s2-bll/CardActions";
import {fetchGetCards, fetchUpdateCardGrade} from "../../../pages/card/s2-bll/CardThunks";
import {getStudyCard} from "../../../helpers/randomizer";

export type ItemToUpdateType = {
    packId: string
    packName: string
}

export const PacksDraw = React.memo(({navigatePage}: { navigatePage: string }) => {

    const {cardPacksTotalCount, pageCount, cardPacks, page} = useAppSelector(state => state.pack);
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
    const dispatch = useAppDispatch();

    const [itemToRemove, setItemToRemove] = useState<string>('')
    const [itemToUpdate, setItemToUpdate] = useState<ItemToUpdateType>({packId: '', packName: ''})

    const {cards, studyStage, actualStudyCard} = useAppSelector(state => state.card)
    const [actualGrade, setActualGrade] = useState<number>(0)

    useLayoutEffect(() => {
        cards.length && dispatch(setActualStudyCard({actualStudyCard: getStudyCard(cards)}))
    }, [cards])

    const closeStudyModal = useCallback(() => {
        dispatch(setStudyStage({studyStage: StudyStageType.noActivity}))
    }, [])

    const questionModalAction = useCallback(() => {
        dispatch(setStudyStage({studyStage: StudyStageType.answer}))
    }, [])

    const answerModalAction = useCallback(() => {
        actualStudyCard && dispatch(fetchUpdateCardGrade(actualStudyCard._id, actualGrade || 0))
    }, [actualStudyCard, actualGrade])

    const startStudying = (packId: string) => {
        dispatch(fetchGetCards({cardsPack_id: packId, pageCount: 30}, StudyStageType.question)) //fix pageCount
    }

    // Confirm pack removal
    const removePackHandler = useCallback(() => {
        dispatch(fetchRemovePack(itemToRemove));
        clearFieldsRemoveHandler();
    }, [itemToRemove]);

    // Confirm pack upgrade
    const updatePackHandler = useCallback(() => {
        dispatch(fetchUpdatePack(itemToUpdate.packId, itemToUpdate.packName));
        clearFieldsUpdateHandler();
    }, [itemToUpdate.packId, itemToUpdate.packName]);

    // Cleanup Deletion Fields
    const clearFieldsRemoveHandler = useCallback(() => {
        setItemToRemove('');
    }, []);

    // Clear Update Fields
    const clearFieldsUpdateHandler = useCallback(() => {
        setItemToUpdate({packId: '', packName: ''});
    }, [itemToUpdate.packId, itemToUpdate.packName]);

    // Pagination work
    const paginationHandler = useCallback((page: number) => {
        dispatch(setPacksPagination({page}));
        dispatch(fetchGetPacks({}));
    }, []);

    return <>
        {isFetch === 'loading' ?
            <SkeletonItems/> :
            <>
                {cardPacks.map(c =>
                    <Pack key={c._id}
                          id={c._id}
                          author_id={c.user_id}
                          author={c.user_name}
                          description={c.name}
                          packs={c.cardsCount}
                          date={c.updated}
                          navigatePage={navigatePage}
                          setItemToRemove={setItemToRemove}
                          setItemToUpdate={setItemToUpdate}
                          startStudying={startStudying}
                    />)
                }

                <RemovePackModal itemToRemove={itemToRemove}
                                 removePack={removePackHandler}
                                 clearFieldsItemsToRemove={clearFieldsRemoveHandler}/>

                <UpdatePackModal itemToUpdate={itemToUpdate}
                                 setItemToUpdate={setItemToUpdate}
                                 updatePack={updatePackHandler}
                                 clearFieldsItemsToUpdate={clearFieldsUpdateHandler}/>

                <StudyQuestionModal isShowModal={studyStage === StudyStageType.question && !!cards.length}
                                    title={'Studying'}
                                    studyField={actualStudyCard && studyStage === StudyStageType.question ? actualStudyCard.question : ''}
                                    closeStudyModal={closeStudyModal} modalAction={questionModalAction}/>

                <StudyAnswerModal isShowModal={studyStage === StudyStageType.answer} title={'Studying'}
                                  studyField={actualStudyCard && studyStage === StudyStageType.answer ? actualStudyCard.answer : ''}
                                  closeStudyModal={closeStudyModal} modalAction={answerModalAction}
                                  actualGrade={actualGrade}
                                  setActualGrade={setActualGrade}/>

                <PaginatedPage onPageChanged={paginationHandler}
                               totalCards={cardPacksTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />
            </>
        }
    </>
});
