import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function NavBar(){
  //TODO logout button
    return(
        <div className="navbar-container">
          <div className="ui grid">
            <div className="three column row">
              <NavLink className="column" activeClassName="current"
              to="/signup" exact>Sign Up</NavLink>
              <NavLink className="column" activeClassName="current"
              to="/" exact >Home</NavLink>
              <NavLink className="column" activeClassName="current"
              to="/login" exact>Log In</NavLink>
            </div>
          </div>
          <div className="ui grid">
            <div className="three column row">
              <NavLink className="column" activeClassName="current"
              to="/" exact>Placeholder</NavLink>
              <NavLink className="column" activeClassName="current"
              to="/" exact>Placeholder</NavLink>
              <NavLink className="column" activeClassName="current"
              to="/" exact>Placeholder</NavLink>
            </div>
          </div>
        </div>
    )
}