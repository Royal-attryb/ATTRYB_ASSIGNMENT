import { useEffect, useState } from 'react';
import './Search.css';
import img from '../assets/remove.png';

export default function Search({ onSearchChange, onEnterPress, suggestionSearch, searchClick }) {
  const [car, setCar] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    setCar(suggestionSearch)
  },[suggestionSearch]);

  function handleChange(event) {
    const value = event.target.value;
    onSearchChange(value);
    setCar(value);
  }

  function handleClear() {
    onSearchChange('');
    setCar('');
  }

  function handleKeyPress(e) {
    onEnterPress(e.key);
  }

  function handleSearchClick() {
    setSearchClicked(true);
    searchClick(true);
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
          onKeyDown={(e) => handleKeyPress(e)}
          onFocus={handleSearchClick}
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
