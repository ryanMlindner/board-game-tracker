import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom, showExtraAtom } from "./HelperFunctions/atoms";

export default function NavBar(){
  const setUser = useSetRecoilState(userAtom)

  const [showExtra, setShowExtra] = useRecoilState(showExtraAtom)

  function handleClick() {
    setShowExtra(!showExtra)
  }

  return(
      <div className="container">
        <div className="row">
          <div className="four columns">
            <div className="button">
            <NavLink activeClassName="current"
            to="/" exact >Home</NavLink>
            </div>
          </div>
          <div className="four columns">
            <div className="button">
            <NavLink activeClassName="current"
            to="/totals" exact>Player Scores</NavLink>
            </div>
          </div>
          <div className="four columns">
            <div className="button">
            <NavLink activeClassName="current"
            to="/gamelist" exact>Game List</NavLink>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="four columns">
            <div className="button">
            <NavLink activeClassName="current"
            to="/signup" exact>Sign Up</NavLink>
            </div>
          </div>
          <div className="four columns">
            <div className="button">
              <NavLink activeClassName="current"
              to="/login" exact>Log In/Log Out</NavLink>
            </div>
          </div>
          <div className="four columns">
            <div className="button"
            onClick={handleClick}>Input Menu
            </div>
          </div>
        </div>
        <div className="row">
          <div className="four columns">
          <div className="button">
              <NavLink activeClassName="current"
              to="/gameinstances" exact>Game Instances</NavLink>
            </div>
          </div>
        </div>
      </div>
  )
}