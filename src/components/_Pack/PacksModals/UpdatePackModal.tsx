import {Popup} from "../../Popup/Popup";
import React, {ChangeEvent} from "react";
import {ItemToUpdateType} from "../Packs/Packs";

type UpdatePackModalPropsType = {
    itemToUpdate: ItemToUpdateType
    setItemToUpdate: (itemToUpdate: ItemToUpdateType) => void
    updatePack: () => void
    clearFieldsItemsToUpdate: () => void
}

export const UpdatePackModal = ({
                                    itemToUpdate,
                                    setItemToUpdate,
                                    updatePack,
                                    clearFieldsItemsToUpdate
                                }: UpdatePackModalPropsType) => {

    const updatePackName = (e: ChangeEvent<HTMLInputElement>) => {
        setItemToUpdate({...itemToUpdate, packName: e.currentTarget.value})
    }

    return (
        <Popup show={!!itemToUpdate.packId} title={'Update pack'}>
            <input value={itemToUpdate.packName} onChange={updatePackName}/>
            <span style={{padding: '10px'}}
                  onClick={updatePack}>Yes</span>
            <span style={{padding: '10px'}}
                  onClick={clearFieldsItemsToUpdate}>No</span>
        </Popup>
    )
}