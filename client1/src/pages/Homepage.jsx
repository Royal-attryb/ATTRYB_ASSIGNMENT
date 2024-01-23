import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Filter from '../components/Filter';
import './Homepage.css';
import axios from 'axios';
import Loading from '../components/Loading';

export default function Homepage() {
  const [cars, setCars] = useState([]);
  const [searchbox, setSearchbox] = useState('');
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

  useEffect(() => {
    async function fetchCars() {
      try {
        if (firstload)
          setFirstload(false);

        setLoading(true);
        const response = await axios.get('http://localhost:3000/marketplace_inventory', {  
          params: {
            color: filter.color,
            maxprice: filter.price[1],
            minprice: filter.price[0],
            minmileage: filter.mileage[0],
            maxmileage: filter.mileage[1],
            car_req: searchbox
          }
        });

        setCars(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(`Error!!`);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Display the loading component for 1 second
      }
    }

    if (firstload) //no debounce on first load
    {
      fetchCars();
      return;
    }

    const timerId = setTimeout(() => {  //debounce except on first load
      fetchCars();
    }, 500); 

    return () => clearTimeout(timerId); // Cleanup on unmount or when searchbox changes
  }, [filter, searchbox]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  function handleSearchChange(newCar) {
    setSearchbox(newCar);
  }

  const marketplace = cars.map((car) => (
    <Card key={car.id} name={`${car.oem_name} ${car.model_name} ${car.model_year}`} price={car.price} color={car.color} mileage={car.mileage}/>
  ));

  return (
    <div className="homepage-wrapper">
      {loading && <Loading />} {/* Display Loading component when loading is true */}
      <div className="homepage">
        <article>
          <Filter onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} onResetClick={handleFilterChange}/>
          {/* {console.log(filter)}; */}
        </article>
        <main className='cards-page'>{!loading && marketplace}</main> {/* Display marketplace when loading is false */}
      </div>
    </div>
  );
}