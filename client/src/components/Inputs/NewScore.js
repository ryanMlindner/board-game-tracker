import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, playersAtom, userAtom } from "../HelperFunctions/atoms";

export default function NewScore() {
  const user = useRecoilValue(userAtom);
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [gameinstances, setGameinstances] = useRecoilState(gameinstancesAtom);
  const [points, setPoints] = useState(0);
  const [placement, setPlacement] = useState(0);
  
  const [gameId, setGameId] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  const [score, setScore] = useState(null);
  
  useEffect(() => {
    fetch('/gameinstances')
    .then(res => res.json())
    .then(gameinstances => setGameinstances(gameinstances))

    fetch("/players")
    .then(res => res.json())
    .then(data => setPlayers(data))
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    const newScore = {
      game_instance_id: gameId,
      player_id: playerId,
      points: points,
      placement: placement
    }
    fetch("/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newScore),
    })
    .then(res => {
      if (res.ok) {
        res.json().then((score) => {
          console.log(score)
          setScore(score)
        })
      }
    })
  }

  return (
    <div className="ui full-page">
    {user ?
      <div>
      <form className="ui form" onSubmit={handleSubmit}>
        <h1>Game</h1>
        <label htmlFor="gameinstance">Game</label>
        <select className="ui search dropdown" onChange={(e) => setGameId(e.target.value)}>
          <option value={null}>Select Game</option>
          {gameinstances ?
            gameinstances.map(gameinstance => {
              return <option key={gameinstance.id} 
              value={gameinstance.id}>{gameinstance.game.title}, {gameinstance.session.date}</option>
            })
          : <option value={null}>No games found</option>
          }
        </select>
        <label htmlFor="player">Player</label>
        <select className="ui search dropdown" onChange={(e) => setPlayerId(e.target.value)}>
          <option value={null}>Select Player</option>
          {players ?
            players.map(player => {
              return <option key={player.id} value={player.id}>{player.name}</option>
            })
          : <option value={null}>No players found</option>
          }
        </select>
        <h1>Points</h1>
        <label htmlFor="points">Points</label>
        <input
          type="text"
          id="points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
        <h1>Placement</h1>
        <label htmlFor="placement">Placement</label>
        <input
          type="text"
          id="placement"
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
        />
        <button className="ui button" type="submit">Add Player Score</button>
      </form>
      {score ?
      <div>Last Score Added: Points: {score.points} Placement: {score.placement}</div>
      : <div>No Scores added this session PLACEHOLDER</div>
      }
      </div>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}