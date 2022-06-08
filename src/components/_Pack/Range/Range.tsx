import React from "react";
import 'rc-slider/assets/index.css';
import './Range.scss';
import { Range as RangeModule } from 'rc-slider';

type RangePropsType = {
    title?: string
    onChangeRange?: (value: [number, number]) => void
    value: number[]
    min: number
    max: number
    step: number
    disable?: boolean
}

export const Range = React.memo(({ onChangeRange, value, min, max, step, title}: RangePropsType) => {

    const onChange = (value: any) => {
        if (onChangeRange) {
            onChangeRange(value)
        }
    };

    console.log(value)
    return <div className="range">
        <RangeModule min={min} max={max} value={value} step={step} onChange={onChange} allowCross={false}/>
        <div className="range__body">
            <span className="range__count">{value[0]}</span>
            {title && <span className="range__title">{title}</span>}
            <span className="range__count">{value[1]}</span>
        </div>
    </div>
})