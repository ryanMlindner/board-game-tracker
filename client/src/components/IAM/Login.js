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
    <div className="ui full-page">
      <form className="ui form"onSubmit={handleSubmit}>
        <h1>Log In</h1>
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
        <button className="ui button" type="submit">Login</button>
      </form>
      {user ?
      <div>Logged in: {user.username}</div>
      : <div>Use the form above to log in PLACEHOLDER</div>
      }
    </div>
  )
}