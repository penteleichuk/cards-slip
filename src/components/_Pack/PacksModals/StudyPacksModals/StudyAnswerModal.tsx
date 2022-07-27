import React, {useCallback, useEffect, useState} from 'react';
import {Popup} from "../../../Popup/Popup";
import {Button} from "../../../Button/Button";
import './StudyPacksModal.scss';

type AnswerModalPropsType = {
    isShowModal: boolean
    title: string
    studyField: string
    closeStudyModal: () => void
    modalAction: () => void
    actualGrade: number | undefined
    setActualGrade: (grade: number) => void
}

export type GradeType = {
    value: number
    selected: boolean
}

const StudyAnswerModal = React.memo((props: AnswerModalPropsType) => {
    const {
        isShowModal,
        studyField,
        title,
        closeStudyModal,
        modalAction,
        actualGrade,
        setActualGrade
    } = {...props};

    const [grades, setGrades] = useState<GradeType[]>([
        {value: 1, selected: false}, {value: 2, selected: false}, {value: 3, selected: false},
        {value: 4, selected: false}, {value: 5, selected: false}
    ]);

    useEffect(() => {
        return () => setActualGrade(0)
    }, [])

    const onChangeGrade = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const grade = e.currentTarget.dataset.t || '0';

        setGrades(grades.map(g => (g.value === +grade) ? {...g, selected: !g.selected} : {...g, selected: false}));
        setActualGrade(+grade);
    }, [grades])

    return (
        <Popup show={isShowModal}
               title={title}
               modalOnClick={closeStudyModal}>
            <div className="studying">
                <div className="studying__title">Answer:</div>
                <div className="studying__content">{studyField}</div>
            </div>
            {
                <div className="grade">
                    <div className="grade__body">
                        {grades.map(g => actualGrade && (g.value <= actualGrade)
                            ? <div key={g.value} className="grade__item grade__active" data-t={g.value}
                                   onClick={onChangeGrade}>★</div>
                            : <div key={g.value} className="grade__item" data-t={g.value}
                                   onClick={onChangeGrade}>★</div>)
                        }
                    </div>
                </div>
            }
            <div className="popup__buttons">
                <Button onClick={closeStudyModal}>Leave</Button>
                <Button onClick={modalAction}>Next</Button>
            </div>
        </Popup>
    );
});

export default StudyAnswerModal;