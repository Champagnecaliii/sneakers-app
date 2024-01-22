import React, { useState } from 'react';
import ThemeToggle from './componets/ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateCollection from './componets/CreateCollection';
import Login from './componets/auth/Login';
import Registration from './componets/auth/Register';
import DashboardPage from './pages/DashboardPage';
import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'




function App() {
  const {auth, home, collection} = routes;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={home.dashboard}>
              <img src='https://designersneakers.co.uk/wp-content/uploads/2020/02/designersneakers-logo-01-01.png' alt='logo' height="30" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to={auth.register}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={auth.login}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={home.dashboard}>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <LanguageToggle />
        <ThemeToggle toggleTheme={toggleTheme} />

        <Routes>
          <Route path={home.dashboard} element={<DashboardPage isUserAuthenticated={false} />} />
          <Route path={auth.register} element={<Registration />} />
          <Route path={auth.login} element={<Login />} />
          <Route path={collection.createCollection} element={<CreateCollection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
