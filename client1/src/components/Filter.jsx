import React, { useState } from 'react';
import { Slider } from '@mui/material'; 
import './Filter.css';
import Search from './Search';
import Suggestions from './Suggestions';
import SliderWithLabels from './SliderWithLabels';

export default function Filter({ onFilterChange, onSearchChange, onResetClick, suggestions, onEnterPress, suggestionClicked, onSuggestionHover }) {
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

  const rangeFilters = [{"Price":filter.price, "min":0, "max":50000}, {"Mileage":filter.mileage, "min":0, "max": 20}];
  // console.log(rangeFilters[0].Price);
  // console.log("filter", rangeFilters[0]);
  const [suggestionSearch, setSuggestionSearch] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [suggestionClick, setSuggestionClick] = useState(false);

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

  function handleEnterPress(key) {
    onEnterPress(key);
  }

  function handleHover(value) {
    setSuggestionSearch(value);
    onSuggestionHover(value);
  }

  const handleFunctions = [handlePriceChange, handleMileageChange];

  const displaySuggestions = ((searchClicked)) ? ( <Suggestions suggestions={suggestions} onHover={handleHover} suggestionClicked={(val) => {suggestionClicked(val); setSuggestionClick(false); setSearchClicked(false); }} /> ) : null;
  // console.log("Suggestion clicked", suggestionClick);  
  // console.log("Search clicked", searchClicked);
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'All'];
  const initialCheckedColors = Object.fromEntries(colors.map(color => [color, false]));
  const [checkedColors, setCheckedColors] = useState(initialCheckedColors);
  
  return (
    <div className="car-filter">
      <Search onSearchChange={handleSearchChange} onEnterPress={handleEnterPress} suggestionSearch={suggestionSearch} searchClick={(val) => setSearchClicked(val)} />
      {displaySuggestions}
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
      
      {/* {rangeFilters.map((row, rowIndex) => (
        <SliderComp filter={row} heading="Price" handlePriceChange={handlePriceChange} handleMileageChange={handleMileageChange}/>
      ))}; */}

      {rangeFilters.map((filter, index) => <SliderWithLabels filter={filter} handleFunction={handleFunctions[index]}/>)}
      {/* <div className='filters'>
        <h3 className='filter-headings'>Price<em> (Rs.)</em></h3>
        <p className='slider-values'><span className='filter1'>{new Intl.NumberFormat().format(filter.price[0])}</span><span className='filter2'>{new Intl.NumberFormat().format(filter.price[1])}</span></p>

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
      </div> */}
      <button className="resetbutton" onClick={handleResetClick}>
          RESET
      </button>
    </div>
  );
}
