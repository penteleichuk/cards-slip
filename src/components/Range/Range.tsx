import React, {useCallback} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Range.scss';

type RangePropsType = {
    user_id?: string | undefined
    onAfterChange?: (rangeValues: number[] | number) => void
    value: number[]
    setValue: (value: number[]) => void
    minCardsCount: number
    maxCardsCount: number
    title?: string
    step?: number
    disable?: boolean
}

export const Range = React.memo((props: RangePropsType) => {
    const {user_id, value, setValue, minCardsCount, maxCardsCount, title, ...restProps} = {...props};

    const onChangeHandler = useCallback((rangeValues: any) => {
        setValue(rangeValues);
    }, []);

    return <div className="range">
        <Slider range
                min={minCardsCount}
                max={maxCardsCount}
                value={value}
                onChange={onChangeHandler}
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
