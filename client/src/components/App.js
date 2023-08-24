import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./IAM/Signup.js";
import Login from "./IAM/Login.js";
import Home from "./Home.js";
import NavBar from "./NavBar.js";
import { useRecoilState } from "recoil";
import { userAtom } from "./HelperFunctions/atoms.js";
import Totals from "./Displays/Totals.js";
import InputNavBar from "./Inputs/InputNavBar.js";
import NewSession from "./Inputs/NewSession.js";
import NewScore from "./Inputs/NewScore.js";
import NewPlayer from "./Inputs/NewPlayer.js";
import NewGame from "./Inputs/NewGame.js";
import NewBoard from "./Inputs/NewBoard.js";

//TODOS components for displaying actual data!
//TODO add RANKINGS endpoint that does the mathyness for points to rank players cause duh
//thats a way to do it that makes sense to me, so thats how we gon do it
//TODO hunt down mismatches between games and gameinstances
//TODO track down non-UI updates for api calls
//list::: aggregate games(placements per game), aggregate players(ranking by total, average, etc.)
//  aggregate sessions(points per session, attendance), total games(admin view for filling page space)
//TODO class toggle to view input menu
//TODO display games (all games, gamecard, etc.)

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
			
      <NavBar />
      <InputNavBar className="input-nav"/>

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
      </Switch>
    </div>
  )
}
//TODO more routes as needed
