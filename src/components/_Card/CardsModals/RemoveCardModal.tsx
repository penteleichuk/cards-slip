import {Popup} from "../../Popup/Popup";
import React from "react";

type RemoveCardModalPropsType = {
    itemToRemove: string
    removeCard: () => void
    clearFieldsItemsToRemove: () => void
}

export const RemoveCardModal = ({itemToRemove, removeCard, clearFieldsItemsToRemove}: RemoveCardModalPropsType) => {
    return (
        <Popup show={!!itemToRemove} title={'Are you sure you want to remove the card?'}>
            <span style={{padding: '10px'}} onClick={removeCard}>Yes</span>
            <span style={{padding: '10px'}} onClick={clearFieldsItemsToRemove}>No</span>
        </Popup>
    )
}