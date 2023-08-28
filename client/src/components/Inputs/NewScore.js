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

  const [updated, setUpdated] = useState(false);
  
  useEffect(() => {
    fetch('/gameinstances')
    .then(res => res.json())
    .then(gameinstances => setGameinstances(gameinstances))

    fetch("/players")
    .then(res => res.json())
    .then(data => setPlayers(data))
  }, [updated])

  function handleNewSubmit(e) {
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

  //TODO better to grab player and game instance from score for UI ease
  function handleUpdateSubmit(e) {
    e.preventDefault();
    const updatedScore = {
      player_id: playerId,
      game_instance_id: gameId,
      points: points,
      placement: placement
    }
    fetch(`/scoresbyid/${playerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedScore)
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
        <h1>New Score</h1>
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
        <label htmlFor="points">Points</label>
        <input
          type="text"
          id="points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
        <label htmlFor="placement">Placement</label>
        <input
          type="text"
          id="placement"
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
        />
        <div className="ui hidden divider"></div>
        <button className="ui primary button" type="submit">Add Player Score</button>
      </form>
      </div>
      <div className="ui hidden divider"></div>

      <div className="ui inverted segment">
      <form className="ui form" onSubmit={handleUpdateSubmit}>
        <h1>Update Score</h1>
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
        <label htmlFor="gameinstance">Player</label>
        <select className="ui search dropdown" onChange={(e) => setPlayerId(e.target.value)}>
          <option value={null}>Select Player</option>
          {players ?
            players.map(player => {
              return <option key={player.id} value={player.id}>{player.name}</option>
            })
          : <option value={null}>No players found</option>
          }
        </select>
        <label htmlFor="name">Points</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
        <label htmlFor="placement">Placement</label>
        <input
          type="text"
          id="placement"
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
        />
        <div className="ui hidden divider"></div>
        <button className="ui primary button" type="submit">Rename Player</button>
      </form>
      </div>
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