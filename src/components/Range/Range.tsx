import React from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchGetPacks} from "../../pages/pack/s2-bll/PackThunks";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Range.scss';

type RangePropsType = {
    user_id?: string | undefined
    value: number[]
    setValue: (value: number[]) => void
    minCardsCount: number
    maxCardsCount: number
    title?: string
    step?: number
    disable?: boolean
}

export const Range = React.memo(({
                                     user_id,
                                     value,
                                     setValue,
                                     minCardsCount,
                                     maxCardsCount,
                                     title,
                                     ...restProps
                                 }: RangePropsType) => {
    const dispatch = useAppDispatch();

    const onSliderChange = (rangeValues: any) => {
        setValue(rangeValues);
    }

    const afterChangeHandler = (rangeValues: any) => {
        dispatch(fetchGetPacks({user_id: user_id, min: rangeValues[0], max: rangeValues[1]}));
    }

    return <div className="range">
        <Slider range
                min={minCardsCount}
                max={maxCardsCount}
                onAfterChange={afterChangeHandler}
                value={value}
                onChange={onSliderChange}
                allowCross={false}
                pushable={false}
                {...restProps}
        />
        <div className="range__body">
            <span className="range__count">{value[0]}</span>
            {title && <span className="range__title">{title}</span>}
            <span className="range__count">{value[1]}</span>
        </div>
    </div>
})
