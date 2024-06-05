import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaChalkboard,
  FaFolder,
  FaSignOutAlt,
  FaChartPie,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../style/Sidebar.css";
import { AuthContext } from "../context/auth.context";

function Sidebar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOutUser();
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <div className="mobile-menu-button">
            <button onClick={toggleMenu} className="hamburger">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className={`sidebar bg-darkgray text-white pl-5 pt-10 flex flex-col ${isMenuOpen ? "open" : ""}`}>
            <div className="flex-grow">
              <br />
              <div className="flex pb-5">
                <Link to={"/"} className="flex flex-row items-center" onClick={() => setMenuOpen(false)}>
                  <div className="pr-2">
                    <FaChalkboard />
                  </div>
                  <div className="">Dashboard</div>
                </Link>
              </div>

              <div className="flex pb-5">
                <Link to={"/category"} className="flex flex-row items-center" onClick={() => setMenuOpen(false)}>
                  <div className="pr-2">
                    <FaFolder />
                  </div>
                  Categories
                </Link>
              </div>
              <div className="flex pb-5">
                <Link to={"/monthly-report"} className="flex flex-row items-center" onClick={() => setMenuOpen(false)}>
                  <div className="pr-2">
                    <FaChartPie />
                  </div>
                  Monthly Report
                </Link>
              </div>
              <div className="flex">
                <Link to={"/yearly-report"} className="flex flex-row items-center" onClick={() => setMenuOpen(false)}>
                  <div className="pr-2">
                    <FaChartPie />
                  </div>
                  Yearly Report
                </Link>
              </div>
              <br />
            </div>
            <div className="flex mt-auto">
              {logOutUser && (
                <Link
                  to={"/login"}
                  className="flex flex-row items-center pb-4"
                  onClick={handleLogout}
                >
                  <div className="pr-2">
                    <FaSignOutAlt />
                  </div>
                  Logout
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
