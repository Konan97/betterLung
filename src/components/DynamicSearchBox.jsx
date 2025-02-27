import React, { useState } from 'react';

function DynamicSearchBox({ suggestions }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const newFilteredSuggestions = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(newFilteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        placeholder="Search..."
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DynamicSearchBox;