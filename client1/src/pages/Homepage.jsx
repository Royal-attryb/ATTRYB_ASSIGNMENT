import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Filter from '../components/Filter';
import './Homepage.css';
import axios from 'axios';
import Loading from '../components/Loading';

export default function Homepage() {
  const [cars, setCars] = useState([]);
  const [searchbox, setSearchbox] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState('');
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
  const [loading, setLoading] = useState(false);
  const [firstload, setFirstload] = useState(true);

  async function fetchCars(search) {
    try {
      if (firstload)
        setFirstload(false);

      setLoading(true);
      const response = await axios.get('https://attryb-assignment-aegs.vercel.app/marketplace_inventory', {  
        params: {
          color: filter.color,
          maxprice: filter.price[1],
          minprice: filter.price[0],
          minmileage: filter.mileage[0],
          maxmileage: filter.mileage[1],
          car_req: search || searchbox
        }
      });
      
      setCars(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(`Error!!`);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500); // Display the loading component for 1 second
    }
  }

  useEffect(() => {
    if (firstload) //no debounce on first load
    {
      fetchCars();
      return;
    }

    const timerId = setTimeout(() => {  //debounce except on first load
      fetchCars();
    }, 500); 

    return () => clearTimeout(timerId); // Cleanup on unmount or when searchbox changes
  }, [filter]);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
          const response = await axios.get('https://attryb-assignment-aegs.vercel.app/search_suggestions', {
          params: {
            car_req: searchbox
          }
        });

        setSuggestions(response.data.map(suggestion => {
            return suggestion.candidate;
        }));
        // setSuggestions(response.data);
        // console.log(suggestions);

      }

      catch(error) {
        console.log(error);
      }
    }

    const timerId = setTimeout(() => {  //debounce input
      fetchSuggestions();
    }, 500); 

    return () => clearTimeout(timerId);
  }, [searchbox]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  function handleSearchChange(newCar) {
    setSearchbox(newCar);
  }

  function handleSuggestionClick (val) {
    if(val) { setSearchbox(suggestion); fetchCars(suggestion);}
  }
  const marketplace = cars.map((car) => (
    <Card key={car.id} name={`${car.oem_name} ${car.model_name} ${car.model_year}`} price={car.price} color={car.color} mileage={car.mileage}/>
  ));

  return (
    <div className="homepage-wrapper">
      {loading && <Loading />} {/* Display Loading component when loading is true */}
      <div className="homepage">
        <article>
          <Filter onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} onResetClick={handleFilterChange} suggestions={suggestions} onEnterPress={(key) => { if (key === 'Enter') {fetchCars();}}} suggestionClicked={handleSuggestionClick} onSuggestionHover={(val) => {setSuggestion(val);}} />
          {/* {console.log(filter)}; */}
        </article>
        {!loading && cars.length === 0 && (
          <div>
            <p className='empty-page'>No cars found.</p>
          </div>
        )}
        {!loading && cars.length > 0 && (
          <main className='cards-page'>{!loading && marketplace}</main> 
        )}
      </div>
    </div>
  );
}