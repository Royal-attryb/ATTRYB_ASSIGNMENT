import './Suggestions.css';
import { useState } from 'react';

export default function Suggestions() {
    const suggestions = [];
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