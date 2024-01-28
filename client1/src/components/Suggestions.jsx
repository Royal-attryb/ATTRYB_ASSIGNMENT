import './Suggestions.css';
import { useState } from 'react';

export default function Suggestions({ suggestions, onHover, suggestionClicked }) {

    const [click, setClick] = useState(false);

    function handleSuggestionClicked (event) {
        setClick(true);
        suggestionClicked(true);
        setClick(false);
    }
    return (
        <div className="suggestions-wrapper">
            <ul className="suggestions-list">
                {suggestions.map(suggestion => 
                    <li className="suggestions" value={suggestion} onMouseOver={(e) => {onHover(e.target.getAttribute('value'));}} onClick={handleSuggestionClicked} >{suggestion}</li>
                )}
            </ul>
        </div>
    )
}