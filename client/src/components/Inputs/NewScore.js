import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, playersAtom, sessionsAtom, userAtom } from "../HelperFunctions/atoms";

//TODO set up modular inputs for # of players in session == # of score input components

export default function NewScore() {
  const user = useRecoilValue(userAtom);
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [sessions, setSessions] = useRecoilState(sessionsAtom);

  const [session, setSession] = useState(null)

  const [points, setPoints] = useState(0);
  const [placement, setPlacement] = useState(0);
  
  const [gameId, setGameId] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  const [score, setScore] = useState(null);

  const [updated, setUpdated] = useState(false);

  let scoresArray = [];

  let gameinstance = null;

  //TODO array to hold each set of player scores that gets submitted in the form, then use
  //array to modularize the posts

  //TODO get list of players for game from either gameinstance->session or from session?
  //session has a list of gameinstances get from there -> select session then select game

  function handleChange(value, target, id) {
    let playerScore = scoresArray.filter((score) => score.id == id);
    if (playerScore == []) {
      playerScore = {
        id : id,
        points : 0,
        placement : 0
      }
      scoresArray.push(playerScore)
    }
    if (target === "points") {
      playerScore.points = value
    }
    if (target === "placement") {
      playerScore.placement = value
    }
    console.log(scoresArray)
  }
  
  useEffect(() => {
    fetch("/players")
    .then(res => res.json())
    .then(data => setPlayers(data))

    fetch("/sessions")
    .then(res => res.json())
    .then(data => setSessions(data))
  }, [updated])

  function handleNewSubmit(e) {
    e.preventDefault();
    //TODO modularize for each player score
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
          setScore(score)
        })
      }
    })
  }

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

  function checkGameInstances() {
    console.log(sessions[session - 1])
    if (sessions[session - 1]) {
      if (sessions[session - 1].game_instances.length > 0) {
        return true
      } 
    }
    else return false
  }

  //TODO refactor to select session -> game instance -> show all players at that game that need scores
  return (
    <div className="ui full-page">
    <div className="ui hidden divider"></div>
    {user ?
      <div>
        <div>
          <label htmlFor="session">Session</label>
          <select className="" onChange={(e) => setSession(e.target.value)}>
            <option value={null}>Select Session</option>
            {sessions ?
              sessions.map(session => {
                return <option key={session.id} 
                value={session.id}>{session.date}</option>
              })
            : <option value={null}>No sessions found</option>
            }
          </select>
        </div>
        <div>-</div>
          <label htmlFor="gameinstance">Game</label>
          <select className="" onChange={(e) => {gameinstance = e.target.value}}>
            <option value={null}>Select Game</option>
            {checkGameInstances() ?
              sessions[session - 1].game_instances.map(gameinstance => {
                return <option key={gameinstance.id} 
                value={gameinstance.id}>{gameinstance.game.title}</option>
              })
            : <option value={null}>No games found</option>
            }
          </select>
        <form>
          <div className="row">
          <div className="four columns">
          </div>
          <div className="four columns">
          
          </div>
        </div>
        </form>
      {score ?
      <div>Last Score Added: Points: {score.points} Placement: {score.placement}</div>
      : <div>No Scores added this session</div>
      }
      <div className="ui hidden divider"></div>
      <div className="ui inverted segment">
      <form className="ui form" onSubmit={handleUpdateSubmit}>
        <h1>Update Score</h1>
        <label htmlFor="gameinstance">Game</label>
        <button className="ui button" type="submit">Edit Score</button>
      </form>
      </div>
      </div>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}