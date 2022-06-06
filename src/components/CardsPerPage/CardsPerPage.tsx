import React, {useState} from 'react';
import {InputText} from "../InputText/InputText";
import {useDispatch} from "react-redux";
import {setCardPerPageAC} from "../../pages/pack/s2-bll/PackActions";


type CardsPerPageType = {
    pageCount: number | undefined
}

export const CardsPerPage: React.FC<CardsPerPageType> = ({pageCount,}: CardsPerPageType) => {
    const [total, setTotal] = useState<number>(40)

    const dispatch = useDispatch()
    const changePageCount = () => {
        dispatch(setCardPerPageAC(total))
    }
    const changeTotalHandler = (value: string) => {
        setTotal(JSON.parse(value))
    }
    return (
        <span>
            <span>Show</span>
            <InputText value={total} onChangeText={changeTotalHandler} onEnter={changePageCount}
                       style={{width: '30px', textAlign: 'center'}}/>
            <span>cards per page</span>
        </span>
    );
};