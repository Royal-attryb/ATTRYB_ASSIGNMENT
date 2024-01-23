import React from 'react'
import wheel from '../assets/wheel.png';
import './Loading.css';

export default function Loading() {
    return (
        <div className='loading'>
            <img  className='loading-wheel' src={wheel} alt="loading wheel"></img>
        </div>
    )
}
