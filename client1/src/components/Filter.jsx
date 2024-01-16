import React, { useState } from 'react';
import { Slider } from '@material-ui/core'; // Assuming you're using Material-UI for the sliders
import './Filter.css';

export default function Filter({ onFilterChange }) {
  const [filter, setFilter] = useState({
    color: 'All',
    price: [0, 50000],
    mileage: [0, 20]
  });

  const handleColorChange = (event) => {
    setFilter({ ...filter, color: event.target.value });
    onFilterChange({ ...filter, color: event.target.value });
  };

  const handlePriceChange = (event, newValue) => {
    console.log(newValue);
    setFilter({ ...filter, price: newValue});
    onFilterChange({ ...filter, price: newValue});
  };

  const handleMileageChange = (event, newValue) => {
    setFilter({ ...filter, mileage: newValue });
    onFilterChange({ ...filter, mileage: newValue });
  };

  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'All'];

  return (
    <div className="car-filter">
      <h2>Car Filters</h2>

      <div>
        <h3>Color:</h3>
        {colors.map((color) => (
          <div key={color}>
            <input
              type="radio"
              id={color}
              name="color"
              value={color}
              onChange={handleColorChange}
            />
            <label htmlFor={color}>{color}</label>
          </div>
        ))}
      </div>

      <div>
        <h3>Price(Rs.):</h3>
        <Slider
          value={filter.price}
          min={0}
          max={50000}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
        />
      </div>

      <div>
        <h3>Mileage(kmpl):</h3>
        <Slider
          value={filter.mileage}
          min={0}
          max={20}
          onChange={handleMileageChange}
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
}
