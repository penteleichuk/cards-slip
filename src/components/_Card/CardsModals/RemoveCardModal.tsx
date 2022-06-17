import {Popup} from "../../Popup/Popup";
import React from "react";
import {Button} from "../../components";

type RemoveCardModalPropsType = {
    itemToRemove: string
    removeCard: () => void
    clearFieldsItemsToRemove: () => void
}

export const RemoveCardModal = ({itemToRemove, removeCard, clearFieldsItemsToRemove}: RemoveCardModalPropsType) => {
    return (
        <Popup show={!!itemToRemove}
               title={'Are you sure you want to remove the card?'}
               modalOnClick={clearFieldsItemsToRemove}>

            <div className="popup__buttons">
                <Button onClick={removeCard}>Yes</Button>
                <Button onClick={clearFieldsItemsToRemove}>No</Button>
            </div>
        </Popup>
    )
}