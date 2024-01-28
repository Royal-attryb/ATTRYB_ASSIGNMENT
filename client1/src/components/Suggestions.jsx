import './Suggestions.css';
import { useState } from 'react';

export default function Suggestions({suggestions}) {
    console.log(suggestions);
    return (
        <div className="suggestions-wrapper">
            <ul className="suggestions-list">
                {suggestions?.map(suggestion => 
                    <li className="suggestions" value={suggestion}>{suggestion}</li>
                )}
            </ul>
        </div>
    )
}