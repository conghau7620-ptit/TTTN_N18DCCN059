import React, { useCallback } from "react";
import { Link } from "react-router-dom";
// import { DASHBOARD_URL } from "pages/dashboard/url";
// import UserMenu from "components/userMenu";

const Header = () => {
  const handleSidebarMenuCollapsed = useCallback(() => {
    const sidebarCollapsed =
      document
        .getElementById("root")
        .classList.value.indexOf("sidebar-collapse") !== -1;
    if (sidebarCollapsed) {
      document.getElementById("root").classList.remove("sidebar-collapse");
    } else {
      document.getElementById("root").classList.add("sidebar-collapse");
    }
  }, []);

  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              type="button"
              className="nav-link"
              onClick={handleSidebarMenuCollapsed}
            >
              <i className="fas fa-bars" />
            </button>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link
              //   to={DASHBOARD_URL.DASHBOARD.URL}
              to="//ac"
              className="nav-link dashboard"
            >
              {/* {DASHBOARD_URL.DASHBOARD.NAME} */}
              hallo
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/contact" disabled className="nav-link disabled">
              Contact
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">{/* <UserMenu /> */}</ul>
      </nav>
    </>
  );
};

export default Header;
