import { Input } from '@chakra-ui/react';
import { useState } from 'react';
import './Search.css';

export default function Search({ onSearchChange }) {
    const [car, setCar] = useState('');

    function handleChange(event) {
        onSearchChange(event.target.value);
        setCar(event.target.value);
    }

    return (
        <>
            <label htmlFor="car">Search car:</label>
            <input id="car" type="text" name="car" value={car} onChange={handleChange}></input>
        </>
    )
}