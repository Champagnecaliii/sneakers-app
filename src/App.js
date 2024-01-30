import React, { useContext } from "react";
import ThemeToggle from "./componets/ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CreateCollection from "./pages/collection/CreateCollection";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Register";
import DashboardPage from "./pages/DashboardPage";
import { routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import { ModeContext, UserContext } from "./context";
import LogOut from "./componets/auth/LogOut";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const { auth, home, collection } = routes;
  const { isUserAuthenticated } = useContext(UserContext);
  const { isDarkModeOn } = useContext(ModeContext);

  return (
    <Router>
      <div
        className={`app-container ${isDarkModeOn ? "dark-mode" : "light-mode"}`}
      >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={home.dashboard}>
              <img
                src="https://designersneakers.co.uk/wp-content/uploads/2020/02/designersneakers-logo-01-01.png"
                alt="logo"
                height="30"
              />
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {!isUserAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={auth.register}>
                        {t("register")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={auth.login}>
                        {t("login")}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={home.dashboard}>
                        {t("dashboard")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to={routes.collection.createCollection}
                      >
                        {t("mycollection")}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="border-radius 4px">
          <LanguageToggle />
        </div>
        <ThemeToggle />
        {isUserAuthenticated && (
          <div className="logOut">
            <LogOut />
          </div>
        )}

        <Routes>
          <Route
            path={home.dashboard}
            element={
              <DashboardPage isUserAuthenticated={isUserAuthenticated} />
            }
          />
          <Route path={auth.register} element={<Registration />} />
          <Route path={auth.login} element={<Login />} />
          <Route
            path={collection.createCollection}
            element={
              <ProtectedRoutes>
                <CreateCollection />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
