import React, {ChangeEvent, useState} from "react";
import {SkeletonItems} from "../Skeleton/SkeletonItems/SkeletonItems";
import {Pack} from "../Pack/Pack";
import {PaginatedPage} from "../../Paginated/PaginatedPage";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {setCurrentPageAC} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import './Packs.scss';
import {Popup} from "../../Popup/Popup";
import {removePackTC, updatePackTC} from "../../../pages/pack/s2-bll/PackThunks";

type PacksType = {
    navigatePage: string
}

export type ItemToUpdateType = {
    packId: string
    packName: string
}

export const Packs = React.memo(({navigatePage}: PacksType) => {

    const {cardPacksTotalCount, pageCount, cardPacks, page} = useAppSelector(state => state.pack);
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
    const dispatch = useAppDispatch();

    const [itemToRemove, setItemToRemove] = useState<string>('')
    const [itemToUpdate, setItemToUpdate] = useState<ItemToUpdateType>({packId: '', packName: ''})

    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    const removePack = (packId: string) => {
        setItemToRemove('')
        dispatch(removePackTC(packId))
    }

    const updatePackName = (e: ChangeEvent<HTMLInputElement>) => {
        setItemToUpdate({...itemToUpdate, packName: e.currentTarget.value})
    }

    const updatePack = (packId: string, newPackName: string) => {
        setItemToUpdate({packId: '', packName: ''})
        dispatch(updatePackTC(packId, newPackName))
    }

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
                {
                    <Popup show={!!itemToRemove} title={'Are you sure you want to remove the pack?'}>
                        <span style={{padding: '10px'}} onClick={() => removePack(itemToRemove)}>Yes</span>
                        <span style={{padding: '10px'}} onClick={() => setItemToRemove('')}>No</span>
                    </Popup>
                }
                {
                    <Popup show={!!itemToUpdate.packId} title={'Update pack'}>
                        <input value={itemToUpdate.packName} onChange={updatePackName}/>
                        <span style={{padding: '10px'}}
                              onClick={() => updatePack(itemToUpdate.packId, itemToUpdate.packName)}>Yes</span>
                        <span style={{padding: '10px'}}
                              onClick={() => setItemToUpdate({packId: '', packName: ''})}>No</span>
                    </Popup>
                }
                <PaginatedPage onPageChanged={clickPageHandler}
                               totalCards={cardPacksTotalCount}
                               countPages={pageCount}
                               currentPage={page}
                />
            </>
        }
    </>
});