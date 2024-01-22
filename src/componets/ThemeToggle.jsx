import React from 'react';

const ThemeToggle = ({ toggleTheme }) => {
    return (
      <div className="position-fixed top-0 end-0 p-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeToggle"
            onChange={toggleTheme}
          />
          <label className="form-check-label" htmlFor="themeToggle">
            Dark Mode
          </label>
        </div>
      </div>
    );
  };

export default ThemeToggle;