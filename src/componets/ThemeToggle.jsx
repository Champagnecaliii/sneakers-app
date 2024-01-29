import React, { useContext } from 'react';
import { ModeContext } from '../context';

const ThemeToggle = () => {
const {isDarkModeOn, setIsDarkModeOn} = useContext(ModeContext)

  const toggleTheme = () => {
    setIsDarkModeOn(!isDarkModeOn)
  }

    return (
      <div className="position-absolute top-0 end-0 p-3">
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