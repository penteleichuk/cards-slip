import {Popup} from "../../Popup/Popup";
import React from "react";

type RemovePackModalPropsType = {
    itemToRemove: string
    removePack: () => void
    clearFieldsItemsToRemove: () => void
}

export const RemovePackModal = ({itemToRemove, removePack, clearFieldsItemsToRemove}: RemovePackModalPropsType) => {
    return(
        <Popup show={!!itemToRemove} title={'Are you sure you want to remove the pack?'} modalOnClick={clearFieldsItemsToRemove}>
            <span style={{padding: '10px'}} onClick={removePack}>Yes</span>
            <span style={{padding: '10px'}} onClick={clearFieldsItemsToRemove}>No</span>
        </Popup>
    )
}