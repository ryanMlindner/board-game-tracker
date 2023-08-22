import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./IAM/Signup.js";
import Login from "./IAM/Login.js";
import Home from "./Home.js";
import NavBar from "./NavBar.js";
import { useRecoilState } from "recoil";
import { userAtom } from "./HelperFunctions/atoms.js";

//TODOS components for displaying actual data!
//next is testing resources, and setting stuff up for those
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
      </Switch>
    </div>
  )
}
//TODO more routes as needed
