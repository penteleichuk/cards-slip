import React, {ChangeEvent} from "react";
import {ItemToUpdateType} from "../Packs/Packs";
import {Button, InputText} from "../../components";
import {Popup} from "../../Popup/Popup";

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
        <Popup show={!!itemToUpdate.packId} title={'Update pack'} modalOnClick={clearFieldsItemsToUpdate}>
            <InputText value={itemToUpdate.packName} onChange={updatePackName} placeholder="Name"/>
            <div className="popup__buttons">
                <Button onClick={updatePack}>Yes</Button>
                <Button onClick={clearFieldsItemsToUpdate}>No</Button>
            </div>
        </Popup>
    )
}