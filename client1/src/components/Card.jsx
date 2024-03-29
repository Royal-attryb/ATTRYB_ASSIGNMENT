import React, { useState } from 'react';
import img from "../assets/car3.png";
import "./Card.css";
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

export default function Card ({name, price, color, mileage, image}) {

  return (
        <div className="card">
          <div className='img-wrapper'>
          <img src={image} alt="Car" className='car-image'/>
          </div>
            
            <div className='content'>
              <h3 className="name">{name}</h3>
              <ul className='color-mileage'>
                <li className='color'>{color}</li>
                <span className='divider'>|</span>
                <li className='mileage'>{mileage} km/l</li>
              </ul>
              <h2 className='price'><span className='rupee'>&#8377;</span>{new Intl.NumberFormat().format(price)}</h2>
            </div>
        </div>
  )
}