import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playersAtom, userAtom } from "../HelperFunctions/atoms";

export default function NewPlayer() {
  const user = useRecoilValue(userAtom)
  const [players, setPlayers] = useRecoilState(playersAtom)

  const [playerName, setName] = useState('')
  const [player, setPlayer] = useState(null)

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
        res.json().then((player) => {
          setPlayers([...players, player])
          setPlayer(player)
        })
      }
    })
  }
  
  return (
    <div className="ui full-page">
      <div className="ui hidden divider"></div>
    {user ?
    <div>
      <div className="ui inverted segment">
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
        <div className="ui hidden divider"></div>
        <button className="ui primary button" type="submit">Add Player</button>
      </form>
      </div>
      
      {player ?
        <div>Last Player added: {player.name}</div>
        : <div>No Players added this session PLACEHOLDER</div>
      }
    </div>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}