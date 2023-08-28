import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playersAtom, userAtom } from "../HelperFunctions/atoms";

export default function NewPlayer() {
  const user = useRecoilValue(userAtom)
  const [players, setPlayers] = useRecoilState(playersAtom)

  const [playerId, setPlayerId] = useState(null)
  const [playerName, setName] = useState('')
  const [player, setPlayer] = useState(null)

  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    fetch("/players")
    .then(res => res.json())
    .then(data => setPlayers(data))
  }, [updated])

  function handleNewSubmit(e) {
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

  function handleUpdateSubmit(e) {
    e.preventDefault();
    const updatedPlayer = {
      name: playerName,
      user_id: user.id
    }
    fetch(`/playersbyid/${playerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlayer)
    })
    .then(res => {
      if (res.ok) {
        setUpdated(!updated)
      }
    })
  }
  
  return (
    <div className="ui full-page">
      <div className="ui hidden divider"></div>
    {user ?
    <div>
      <div className="ui inverted segment">
      <form className="ui form" onSubmit={handleNewSubmit}>
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
      <div className="ui inverted segment">
      <form className="ui form" onSubmit={handleUpdateSubmit}>
        <h1>Select Player</h1>
        <select className="ui search dropdown" onChange={(e) => setPlayerId(e.target.value)}>
          <option value={null}>Select Player</option>
          {players ?
            players.map(player => {
              return <option key={player.id} value={player.id}>{player.name}</option>
            })
          : <option value={null}>No players found</option>
          }
        </select>
        <label htmlFor="name">Rename</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={playerName}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="ui hidden divider"></div>
        <button className="ui primary button" type="submit">Rename Player</button>
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