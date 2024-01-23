import React, { useState } from 'react';
import { Slider } from '@mui/material'; 
import './Filter.css';
import Search from './Search';

export default function Filter({ onFilterChange, onSearchChange, onResetClick }) {
  const [filter, setFilter] = useState({
    color: {
      'Red': false,
      'Blue': false,
      'Green': false,
      'Black': false,
      'White': false,
      'All': false,
    },
    price: [0, 50000],
    mileage: [0, 20]
  });

  const handleColorChange = (event) => {
    const newColorArray = {...filter.color, [event.target.value] : !(filter.color[event.target.value])};
    setFilter({ ...filter, color: newColorArray });
    onFilterChange({ ...filter, color: newColorArray });
  };

  const handlePriceChange = (event, newValue) => {
    setFilter({ ...filter, price: newValue});
    onFilterChange({ ...filter, price: newValue});
  };

  const handleMileageChange = (event, newValue) => {
    setFilter({ ...filter, mileage: newValue });
    onFilterChange({ ...filter, mileage: newValue });
  };

  const handleResetClick = () => {
    setFilter({
      color: [''],
      price: [0, 50000],
      mileage: [0, 20]
    });
    onResetClick({
      color: [''],
      price: [0, 50000],
      mileage: [0, 20]
    });
  };


  function handleSearchChange(newCar) {
    onSearchChange(newCar);
  }

  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'All'];
  const initialCheckedColors = Object.fromEntries(colors.map(color => [color, false]));
  const [checkedColors, setCheckedColors] = useState(initialCheckedColors);

  return (
    <div className="car-filter">
      <Search onSearchChange={handleSearchChange}/>
      <h2 className='filter-mainheading'>Car Filters</h2>
      <div className='filters'>
        <h3 className='filter-headings'>Color</h3>
        {colors.map((col) => (
          <div key={col} className='colors'>
            <input
              type="checkbox"
              id={col}
              name="color"
              value={col}
              onChange={handleColorChange}
              checked={filter.color[col]}
            />
            {/* {console.log(filter.color)} */}
            <label htmlFor={col}>{col}</label>
          </div>
        ))}
      </div>

      <div className='filters'>
        <h3 className='filter-headings'>Price<em> (Rs.)</em></h3>
        <p className='slider-values'><span className='filter1'>{filter.price[0]}</span><span className='filter2'>{filter.price[1]}</span></p>

        <Slider
          value={filter.price}
          min={0}
          max={50000}
          onChange={handlePriceChange}
          // valueLabelDisplay="auto"
        />
      </div>

      <div className='filters'>
        <h3 className='filter-headings'>Mileage <em>(kmpl)</em></h3>
        <p className='slider-values'><span className='filter1'>{filter.mileage[0]}</span><span className='filter2'>{filter.mileage[1]}</span></p>
        <Slider
          value={filter.mileage}
          min={0}
          max={20}
          onChange={handleMileageChange}
          // valueLabelDisplay="auto"
        />
      </div>
      <button className="resetbutton" onClick={handleResetClick}>
          RESET
      </button>
    </div>
  );
}
