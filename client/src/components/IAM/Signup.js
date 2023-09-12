import React, { useState} from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../HelperFunctions/atoms";

export default function Signup() {
  const [user, setUser] = useRecoilState(userAtom) //todo change to both, ternary for if user is logged in
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  //TODO show something else if user is logged in
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then(res => {
      if (res.ok) {
        res.json().then((user) => setUser(user))
      }
    })
  }

  return (
    <div className="full-page">
      {user ?
      <h3>Logged in: {user.username} Use the menu button to log out</h3>
      : 
      <>
      <h2>Sign Up</h2>
      <form className=""onSubmit={handleSubmit}>
        <div className="row">
          <div className="four columns">
          <label htmlFor="username">Username</label>
          <input className="u-full-width"
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div className="four columns">
          <label htmlFor="password">Password</label>
          <input className="u-full-width"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>
        <button className="button-primary" type="submit">Sign Up</button>
      </form>
      </>
      }
    </div>
  )
}