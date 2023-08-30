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
    <div className="ui full-page">
      <div className="ui hidden divider"></div>
      <div className="ui inverted segment">
        <form className="ui form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div className="ui hidden divider"></div>
          <button className="ui primary button" type="submit">Sign Up</button>
        </form>
      </div>
      <div className="ui hidden divider"></div>
      {user ?
      <h3>Signed up: {user.username}</h3>
      : <div>Use the form above to log in PLACEHOLDER</div>
      }
    </div>
  )
}