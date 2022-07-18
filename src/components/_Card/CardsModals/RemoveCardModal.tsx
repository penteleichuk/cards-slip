import React from "react";
import {Popup} from "../../Popup/Popup";
import {Button} from "../../components";

type RemoveCardModalPropsType = {
    itemToRemove: string
    removeCard: () => void
    clearFieldsItemsToRemove: () => void
}

export const RemoveCardModal = React.memo((props: RemoveCardModalPropsType) => {
    const {itemToRemove, removeCard, clearFieldsItemsToRemove} = {...props};

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
});
