import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./IAM/Signup.js";
import Login from "./IAM/Login.js";
import Home from "./Home.js";
import NavBar from "./NavBar.js";
import { useRecoilState } from "recoil";
import { userAtom } from "./HelperFunctions/atoms.js";
import Title from "./Title.js";
import Totals from "./Displays/Totals.js";
import InputNavBar from "./Inputs/InputNavBar.js";
import NewSession from "./Inputs/NewSession.js";
import NewScore from "./Inputs/NewScore.js";
import NewPlayer from "./Inputs/NewPlayer.js";
import NewGame from "./Inputs/NewGame.js";
import NewBoard from "./Inputs/NewBoard.js";
import GameList from "./Displays/GameList.js";

//list::: aggregate games(placements per game), aggregate players(ranking by total, average, etc.)
//  aggregate sessions(points per session, attendance), total games(admin view for filling page space)
//TODO add in average points? can be in rankings to bootstrap like everything else
//TODO presentation video
//and thats it? do double checks later

export default function App() {
  const [user, setUser] = useRecoilState(userAtom)

  useEffect(() => {
    // auto-login
    fetch("/check_auth").then((r) => {
      if (r.status === 200) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className="ui full-page">
			<Title />
      <NavBar />
      <InputNavBar/>

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/totals">
          <Totals/>
        </Route>
        <Route exact path="/newboard">
          <NewBoard/>
        </Route>
        <Route exact path="/newgame">
          <NewGame/>
        </Route>
        <Route exact path="/newplayer">
          <NewPlayer/>
        </Route>
        <Route exact path="/newscore">
          <NewScore/>
        </Route>
        <Route exact path="/newsession">
          <NewSession/>
        </Route>
        <Route exact path="/gamelist">
          <GameList/>
        </Route>
      </Switch>
    </div>
  )
}
//TODO more routes as needed
