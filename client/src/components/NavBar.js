import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSetRecoilState } from "recoil";
import { userAtom } from "./HelperFunctions/atoms";

export default function NavBar(){
  //TODO logout button
  const setUser = useSetRecoilState(userAtom)

  function handleClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
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
            <div className="column">
              <div className="ui button"
              onClick={handleClick}>Log Out</div>
            </div>
            <NavLink className="column" activeClassName="current"
            to="/totals" exact>Totals</NavLink>
            <NavLink className="column" activeClassName="current"
            to="/" exact>Placeholder</NavLink>
          </div>
        </div>
      </div>
  )
}