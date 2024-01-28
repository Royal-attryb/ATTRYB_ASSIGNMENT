import { Slider } from "@mui/material";
import './SliderWithLabels.css';

export default function SliderWithLabels({filter, handleFunction}) {

    const filterProps = Object.keys(filter);
    const filterValues = Object.values(filter);

    console.log(filterProps, filterValues);
    return (
        <div className='filters'>
            <h2 className='filter-headings'>{filterProps[0]}</h2>
            <p className='slider-values'><span className='filter1'>{filterValues[0][0]}</span><span className='filter2'>{filterValues[0][1]}</span></p>
            <Slider
                value={filterValues[0]}
                min={filterValues[1]}
                max={filterValues[2]}
                onChange={handleFunction}
            // valueLabelDisplay="auto"
            />
        </div>
    )
}