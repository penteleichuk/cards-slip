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
    }, []);

    const updateAnswerHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setItemToUpdate({...itemToUpdate, cardAnswer: e.currentTarget.value})
    }, []);

    return (
        <Popup show={!!itemToUpdate.cardId} title={'Update card'} modalOnClick={clearFieldsItemsToUpdate}>
            <div>
                <div>Question</div>
                <textarea style={{minWidth: "30vw", maxWidth: "30vw", minHeight: "5vh", maxHeight: "5vh"}}
                          value={itemToUpdate.cardQuestion}
                          onChange={updateQuestionHandler}
                />
            </div>
            <div>
                <div>Answer</div>
                <textarea style={{minWidth: "30vw", maxWidth: "30vw", minHeight: "10vh", maxHeight: "10vh"}}
                          value={itemToUpdate.cardAnswer} onChange={updateAnswerHandler}
                />
            </div>
            <div className="popup__buttons">
                <Button onClick={updateCard}>Yes</Button>
                <Button onClick={clearFieldsItemsToUpdate}>No</Button>
            </div>
        </Popup>
    )
});
