import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playersAtom, userAtom } from "../HelperFunctions/atoms";

export default function NewPlayer() {
  const user = useRecoilValue(userAtom)
  const [players, setPlayers] = useRecoilState(playersAtom)

  const [playerName, setName] = useState('')

  function handleSubmit(e) {
    const newPlayer = {
      name: playerName,
      user_id: user.id,
    } 
    e.preventDefault();
    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    })
    .then(res => {
      if (res.ok) {
        res.json().then((player) => setPlayers([...players, player]))
      }
    })
  }
  
  return (
    <div className="ui full-page">
    {user ?
      <form className="ui form" onSubmit={handleSubmit}>
        <h1>Add Player</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={playerName}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="ui button" type="submit">Add Player</button>
      </form>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}