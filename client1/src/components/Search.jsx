import { useState } from 'react';
import './Search.css';
import img from '../assets/remove.png';

export default function Search({ onSearchChange }) {
  const [car, setCar] = useState('');

  function handleChange(event) {
    const value = event.target.value;
    onSearchChange(value);
    setCar(value);
  }

  function handleClear() {
    onSearchChange('');
    setCar('');
  }

  return (
    <>
      <div className="search-box">
        <input
          id="car"
          type="text"
          name="car"
          placeholder="Search car"
          value={car}
          onChange={handleChange}
        />
        {car && (
          <button className="clear-button" type="button" onClick={handleClear}>
            <img src={img} alt="clear button" />
          </button>
        )}
      </div>
    </>
  );
}
