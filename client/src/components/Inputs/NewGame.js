import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, gamesAtom, sessionsAtom, userAtom } from "../HelperFunctions/atoms";

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
    <div className="full-page">
    {user ?
      <form onSubmit={handleNewSubmit}>
        <h1>New Played Game</h1>
        <div className="container">
          <div className="row">
            <div className="six columns">
              <label htmlFor="gameinstance">Game</label>
              <select className="u-full-width" onChange={(e) => setGameId(e.target.value)}>
                <option value={null}>Select Game</option>
                {games ?
                  games.map(game => {
                    return <option key={game.id} value={game.id}>{game.title}</option>
                  })
                : <option value={null}>No games found</option>
                }
              </select>
            </div>
            <div className="six columns">
              <label htmlFor="session">Session</label>
              <select className="u-full-width" onChange={(e) => setSessionId(e.target.value)}>
                <option value={null}>Select Session</option>
                {sessions ?
                  sessions.map(session => {
                    return <option key={session.id} value={session.id}>{session.date}</option>
                  })
                : <option value={null}>No sessions found</option>
                }
              </select>
            </div>
          </div>
          <button className="ui button" type="submit">Add Played Game</button>
        </div>
      </form>
    : <div>Log in to use this feature!</div>
    }
    {id ?
    <div>Last Game Added ID: {id}</div>
    : <div>No Games added this session</div>
    }
  </div>
  )
}