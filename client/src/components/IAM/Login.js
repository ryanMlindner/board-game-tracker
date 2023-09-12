import React, { useState } from "react";
import { useRecoilState,  } from "recoil";
import { userAtom } from "../HelperFunctions/atoms";

export default function Login() {
  const [user, setUser] = useRecoilState(userAtom)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }

  return (
    <div className="full-page">
      {user ?
      <h3>Logged in: {user.username} Use the menu button to log out</h3>
      : 
      <>
      <h2>Log In</h2>
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
        
        <button className="button-primary" type="submit">Login</button>
      </form>
      </>
      }
    </div>
  )
}