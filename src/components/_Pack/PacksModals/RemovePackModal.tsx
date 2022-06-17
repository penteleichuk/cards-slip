import {Popup} from "../../Popup/Popup";
import React from "react";
import {Button} from "../../components";

type RemovePackModalPropsType = {
    itemToRemove: string
    removePack: () => void
    clearFieldsItemsToRemove: () => void
}

export const RemovePackModal = ({itemToRemove, removePack, clearFieldsItemsToRemove}: RemovePackModalPropsType) => {
    return (
        <Popup show={!!itemToRemove}
               title={'Are you sure you want to remove the pack?'}
               modalOnClick={clearFieldsItemsToRemove}>
            <div className="popup__buttons">
                <Button onClick={removePack}>Yes</Button>
                <Button onClick={clearFieldsItemsToRemove}>No</Button>
            </div>
        </Popup>
    )
}