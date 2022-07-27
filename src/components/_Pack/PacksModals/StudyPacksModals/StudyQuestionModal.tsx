import React from 'react';
import {Popup} from "../../../Popup/Popup";
import {Button} from "../../../Button/Button";
import './StudyPacksModal.scss';

type QuestionModalPropsType = {
    isShowModal: boolean
    title: string
    studyField: string
    closeStudyModal: () => void
    modalAction: () => void
}

const StudyQuestionModal = React.memo((props: QuestionModalPropsType) => {
    const {
        isShowModal,
        studyField,
        title,
        closeStudyModal,
        modalAction
    } = {...props};

    return (
        <Popup show={isShowModal}
               title={title}
               modalOnClick={closeStudyModal}>
            <div className="studying">
                <div className="studying__title">Question:</div>
                <div className="studying__content">{studyField}</div>
            </div>
            <div className="popup__buttons">
                <Button onClick={closeStudyModal}>Leave</Button>
                <Button onClick={modalAction}>Answer</Button>
            </div>
        </Popup>
    );
});

export default StudyQuestionModal;