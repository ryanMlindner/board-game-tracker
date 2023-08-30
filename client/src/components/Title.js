import React from "react";
import Logo from '../Deps/trackerImage.png';

export default function Title() {

  return (
    <div>
      <div className="ui hidden divider"></div>
      <h1>
        Board Game Tracker <img src={Logo} width="20" height="20" alt="board" />
      </h1>
      <h5>The point tracker for people who take game night WAY too seriously</h5>
      <div className="ui hidden divider"></div>
    </div>
  )
}