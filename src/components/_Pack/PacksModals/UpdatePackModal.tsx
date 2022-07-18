import React, {ChangeEvent, useCallback} from "react";
import {ItemToUpdateType} from "../Packs/PacksDraw";
import {Button, InputText} from "../../components";
import {Popup} from "../../Popup/Popup";

type UpdatePackModalPropsType = {
    itemToUpdate: ItemToUpdateType
    setItemToUpdate: (itemToUpdate: ItemToUpdateType) => void
    updatePack: () => void
    clearFieldsItemsToUpdate: () => void
}

export const UpdatePackModal = (props: UpdatePackModalPropsType) => {
    const {itemToUpdate, setItemToUpdate, updatePack, clearFieldsItemsToUpdate} = {...props};

    const updateNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setItemToUpdate({...itemToUpdate, packName: e.currentTarget.value})
    }, []);

    return (
        <Popup show={!!itemToUpdate.packId} title={'Update pack'} modalOnClick={clearFieldsItemsToUpdate}>
            <InputText value={itemToUpdate.packName} onChange={updateNameHandler} placeholder="Name"/>
            <div className="popup__buttons">
                <Button onClick={updatePack}>Confirm</Button>
                <Button onClick={clearFieldsItemsToUpdate}>Cancel</Button>
            </div>
        </Popup>
    )
}
