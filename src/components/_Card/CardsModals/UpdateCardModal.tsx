import {Popup} from "../../Popup/Popup";
import React, {ChangeEvent, useCallback} from "react";
import {ItemToUpdateType} from "../Cards/CardsDraw";
import {Button} from "../../components";

type UpdateCardModalPropsType = {
    itemToUpdate: ItemToUpdateType
    setItemToUpdate: (itemToUpdate: ItemToUpdateType) => void
    updateCard: () => void
    clearFieldsItemsToUpdate: () => void
}

export const UpdateCardModal = React.memo((props: UpdateCardModalPropsType) => {
    const {itemToUpdate, updateCard, setItemToUpdate, clearFieldsItemsToUpdate} = {...props};

    const updateQuestionHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setItemToUpdate({...itemToUpdate, cardQuestion: e.currentTarget.value})
    }, [itemToUpdate]);

    const updateAnswerHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setItemToUpdate({...itemToUpdate, cardAnswer: e.currentTarget.value})
    }, [itemToUpdate]);

    return (
        <Popup show={!!itemToUpdate.cardId} title={'Update card'} modalOnClick={clearFieldsItemsToUpdate}>
            <div className={"popup__textarea"}>
                <div className={"popup__textarea-title"}>Question</div>
                <textarea className={"popup__textarea-area"}
                          style={{minWidth: "30vw", maxWidth: "30vw", minHeight: "5vh", maxHeight: "7vh"}}
                          value={itemToUpdate.cardQuestion}
                          onChange={updateQuestionHandler}
                />
            </div>
            <div className={"popup__textarea"}>
                <div className={"popup__textarea-title"}>Answer</div>
                <textarea className={"popup__textarea-area"}
                          style={{minWidth: "30vw", maxWidth: "30vw", minHeight: "10vh", maxHeight: "10vh"}}
                          value={itemToUpdate.cardAnswer} onChange={updateAnswerHandler}
                />
            </div>
            <div className="popup__buttons">
                <Button onClick={updateCard}>Confirm</Button>
                <Button onClick={clearFieldsItemsToUpdate}>Canel</Button>
            </div>
        </Popup>
    )
});
