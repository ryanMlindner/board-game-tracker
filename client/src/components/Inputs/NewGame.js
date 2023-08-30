import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, gamesAtom, sessionsAtom, userAtom } from "../HelperFunctions/atoms";
//TODO tailor forms

export default function NewGame() {
  const user = useRecoilValue(userAtom)
  const [games, setGames] = useRecoilState(gamesAtom)
  const [sessions, setSessions] = useRecoilState(sessionsAtom)
  const [gameinstances, setGameinstances] = useRecoilState(gameinstancesAtom)

  const [gameId, setGameId] = useState(null)
  const [sessionId, setSessionId] = useState(null)

  const [id, setId] = useState(null)

  useEffect(() => {
    fetch('/games')
    .then(res => res.json())
    .then(games => setGames(games))

    fetch("/sessions")
    .then(res => res.json())
    .then(data => setSessions(data))
  }, [])


  function handleNewSubmit(e) {
    e.preventDefault();
    const newGameInstance = {
      game_id: gameId,
      session_id: sessionId,
    }
    fetch("/gameinstances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGameInstance),
    })
    .then(res => {
      if (res.ok) {
        res.json().then(gameInstance => {
          setId(gameInstance.id)
          setGameinstances([...gameinstances, gameInstance])
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
      <form className="ui form" onSubmit={handleNewSubmit}>
        <h1>New Played Game</h1>
        <label htmlFor="gameinstance">Game</label>
        <select className="ui search dropdown" onChange={(e) => setGameId(e.target.value)}>
          <option value={null}>Select Game</option>
          {games ?
            games.map(game => {
              return <option key={game.id} value={game.id}>{game.title}</option>
            })
          : <option value={null}>No games found</option>
          }
        </select>
        <label htmlFor="gameinstance">Session</label>
        <select className="ui search dropdown" onChange={(e) => setSessionId(e.target.value)}>
          <option value={null}>Select Session</option>
          {sessions ?
            sessions.map(session => {
              return <option key={session.id} value={session.id}>{session.date}</option>
            })
          : <option value={null}>No sessions found</option>
          }
        </select>
        <div className="ui hidden divider"></div>
        <button className="ui button" type="submit">Add Played Game</button>
      </form>
      </div>
      <div className="ui hidden divider"></div>
      {id ?
      <div>Last Game Added ID: {id}</div>
      : <div>No Games added this session</div>
      }
      </div>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}