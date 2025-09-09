import React from "react";
import Toggle from "./Toggle";
import { Link } from "react-router";

const Navbar = ({theme, setTheme}) => {
  const toggleTheme = () => {
    theme === '' ? setTheme('dark') : setTheme('');
  }


  return (
    <nav className="navbar">
        <div className="logo">
            <h1 className="logo">Notes App</h1>
            <div className="links">
            <Link to="/">Home</Link>
            <Link to="/notes">New Note</Link>
        </div>
        </div>
        <Toggle theme={theme} setTheme={setTheme} />
    </nav>
  );
};

export default Navbar;
