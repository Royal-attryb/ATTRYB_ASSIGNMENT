import React, { useState } from 'react';
import img from "../assets/car1.jpg";
import "./Card.css";
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

export default function Card ({name, price, color, mileage}) {

  return (
        <div className="card">
            <img src={img} alt="Car" height="200" width="290"/>
            <p className="color">{color}</p>
            <h3 className="name">{name}</h3>
            <p>Price: {price}</p>
            <p>Mileage: {mileage}</p>
        </div>
  )
}