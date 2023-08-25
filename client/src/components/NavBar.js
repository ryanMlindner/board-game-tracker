import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom, showExtraAtom } from "./HelperFunctions/atoms";

export default function NavBar(){
  const setUser = useSetRecoilState(userAtom)

  const [showExtra, setShowExtra] = useRecoilState(showExtraAtom)

  function handleLogOutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  function handleClick() {
    setShowExtra(!showExtra)
  }

  return(
      <div>
        <div className="ui menu">
          <div className="item">
            <div className="ui button">
            <NavLink activeClassName="current"
            to="/" exact >Home</NavLink>
            </div>
          </div>
          <div className="item">
            <div className="ui button">
            <NavLink activeClassName="current"
            to="/signup" exact>Sign Up</NavLink>
            </div>
          </div>
          <div className="item">
            <div className="ui button">
              <NavLink activeClassName="current"
              to="/login" exact>Log In</NavLink>
            </div>
          </div>
          <div className="item">
            <div className="ui button">
            <NavLink activeClassName="current"
            to="/totals" exact>Totals</NavLink>
            </div>
          </div>
          <div className="item">
            <div className="ui grey button"
            onClick={handleLogOutClick}>Log Out</div>
          </div>
          <div className="item">
            <div className="ui grey button"
            onClick={handleClick}>Show Input Menu</div>
          </div>
        </div>
      </div>
  )
}