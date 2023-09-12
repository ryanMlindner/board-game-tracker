import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useRecoilValue } from "recoil";
import { showExtraAtom } from "../HelperFunctions/atoms";

export default function InputNavBar(){
  const showExtra = useRecoilValue(showExtraAtom)

  return(
      <div className={showExtra ? "container" : "hide container"}>
        <div className="row">
          <div className="two columns">
            <div className="">
              <NavLink activeClassName="current"
              to="/newscore" exact>New Score</NavLink>
            </div>
          </div>
          <div className="two columns">
            <div className="">
              <NavLink activeClassName="current"
              to="/newgame" exact>New Played Game</NavLink>
            </div>
          </div>
          <div className="two columns">
            <div className="">
              <NavLink activeClassName="current"
              to="/newsession" exact>New Session</NavLink>
            </div>
          </div>
          <div className="two columns">
            <div className="">
              <NavLink activeClassName="current"
              to="/newplayer" exact >New Player</NavLink>
            </div>
          </div>
          <div className="two columns">
            <div className="">
              <NavLink activeClassName="current"
              to="/newboard" exact>New Board Game</NavLink>
            </div>
          </div>
        </div>
      </div>
  )
}