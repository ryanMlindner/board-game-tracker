import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function InputNavBar(){

  return(
      <div className="input-nav navbar-container">
        <div className="ui grid">
          <div className="three column row">
            <NavLink className="column" activeClassName="current"
            to="/newsession" exact>New Session</NavLink>
            <NavLink className="column" activeClassName="current"
            to="/newplayer" exact >New Player</NavLink>
            <NavLink className="column" activeClassName="current"
            to="/newboard" exact>Add Board Game</NavLink>
          </div>
        </div>
        <div className="ui grid">
          <div className="three column row">
            <NavLink className="column" activeClassName="current"
            to="/newscore" exact>New Score</NavLink>
            <NavLink className="column" activeClassName="current"
            to="/newgame" exact>New Played Game</NavLink>
            <NavLink className="column" activeClassName="current"
            to="/" exact>Placeholder</NavLink>
          </div>
        </div>
      </div>
  )
}