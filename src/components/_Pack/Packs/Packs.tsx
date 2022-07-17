import React, {useCallback, useState} from "react";
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
import './Packs.scss';

export type ItemToUpdateType = {
    packId: string
    packName: string
}

export const Packs = React.memo(({navigatePage}: { navigatePage: string }) => {

    const {cardPacksTotalCount, pageCount, cardPacks, page} = useAppSelector(state => state.pack);
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
    const dispatch = useAppDispatch();

    const [itemToRemove, setItemToRemove] = useState<string>('')
    const [itemToUpdate, setItemToUpdate] = useState<ItemToUpdateType>({packId: '', packName: ''})

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
                          date={c.created}
                          navigatePage={navigatePage}
                          setItemToRemove={setItemToRemove}
                          setItemToUpdate={setItemToUpdate}
                    />)
                }

                <RemovePackModal itemToRemove={itemToRemove}
                                 removePack={removePackHandler}
                                 clearFieldsItemsToRemove={clearFieldsRemoveHandler}/>

                <UpdatePackModal itemToUpdate={itemToUpdate}
                                 setItemToUpdate={setItemToUpdate}
                                 updatePack={updatePackHandler}
                                 clearFieldsItemsToUpdate={clearFieldsUpdateHandler}/>

                <PaginatedPage onPageChanged={paginationHandler}
                               totalCards={cardPacksTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />
            </>
        }
    </>
});
