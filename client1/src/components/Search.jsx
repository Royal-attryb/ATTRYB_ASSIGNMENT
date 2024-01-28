import { useState, useEffect } from 'react';
import './Search.css';
import img from '../assets/remove.png';
import Suggestions from './Suggestions.jsx';

export default function Search({ onSearchChange, reset, suggestions, onSubmit }) {
  const [car, setCar] = useState('');

  useEffect(() => {
    if (reset) {
      setCar('');
    }
  }, [reset]);

  function handleChange(event) {
    const value = event.target.value;
    onSearchChange(value);
    setCar(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(car);
    onSearchChange(car);
    onSubmit(true);
  }

  function handleClear() {
    setCar('');
  }

  return (
    <>
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <input
            id="car"
            type="text"
            name="car"
            placeholder="Search car"
            value={car}
            onChange={handleChange}
          />
        </form>
        {car && (
          <button className="clear-button" type="button" onClick={handleClear}>
            <img src={img} alt="clear button" />
          </button>
        )}
      </div>
      <Suggestions suggestions={suggestions}/>
    </>
  );
}
