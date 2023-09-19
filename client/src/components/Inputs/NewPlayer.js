import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playersAtom, userAtom } from "../HelperFunctions/atoms";

export default function NewPlayer() {
  const user = useRecoilValue(userAtom)
  const [players, setPlayers] = useRecoilState(playersAtom)

  const [playerId, setPlayerId] = useState(null)
  const [newPlayerName, setNewName] = useState('')
  const [updatedPlayerName, setUpdatedName] = useState('')

  const [player, setPlayer] = useState(null)

  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    fetch("/players")
    .then(res => res.json())
    .then(data => setPlayers(data))
  }, [updated])

  function handleNewSubmit(e) {
    const newPlayer = {
      name: newPlayerName,
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
      name: updatedPlayerName,
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
    <div className="full-page">
    {user ?
    <div>
      <div className="">
      <form onSubmit={handleNewSubmit}>
        <h1>Add Player</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={newPlayerName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button className="button" type="submit">Add Player</button>
      </form>
      </div>
      {player ?
        <div>Last Player added: {player.name}</div>
        : <div>No Players added this session</div>
      }
      <div className="">
      <form onSubmit={handleUpdateSubmit}>
        <h1>Rename Player</h1>
        <select className="" onChange={(e) => setPlayerId(e.target.value)}>
          <option value={null}>Rename Player</option>
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
          value={updatedPlayerName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <button className="button" type="submit">Rename Player</button>
      </form>
      </div>
    </div>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}