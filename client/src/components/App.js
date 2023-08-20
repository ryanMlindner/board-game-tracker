import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

//client todos! hell yeah! TODO login,signup,logout first?
//imports --home.js
export default function App() {
  return (
    <div className="ui full-page">
			
      <NavBar />
      
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
        <Route exact path="/allscores">
          <AllScores/>
        </Route>
      </Switch>
    </div>
  )
}
//TODO more routes as needed
