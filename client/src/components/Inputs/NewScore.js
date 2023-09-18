import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playersAtom, sessionsAtom, userAtom } from "../HelperFunctions/atoms";
import ScoreInputModel from "./ScoreInputModel";
//TODO set up modular inputs for # of players in session == # of score input components

export default function NewScore() {
  const user = useRecoilValue(userAtom); //object
  const [players, setPlayers] = useRecoilState(playersAtom); //object
  const [sessions, setSessions] = useRecoilState(sessionsAtom); //object

  const [session, setSession] = useState(null); //id
  const [gameinstance, setGameInstance] = useState(null); //id

  const [score, setScore] = useState(null);

  const [updated, setUpdated] = useState(false);

  let scoresArray = [];

  // console.log("players")
  // console.log(players)
  // console.log("session")
  // console.log(sessions[session - 1])

  //TODO array of player ids for post, get players from players in a way
  //that doesnt completely suck (attendances!)

  function getPlayerSet() {
    let sessionPlayerIds = []
    sessions[session - 1].attendances.forEach(attendance => {
      sessionPlayerIds.push(attendance.player_id)
    })
    let sessionPlayers = []
    sessionPlayerIds.forEach(id => {
      let player = players.find(player => player.id === id)
      sessionPlayers.push(player)
    })
    return sessionPlayers
  }

  function handleChange(id, points, placement) {
    let playerScore = scoresArray.filter((score) => score.id == id);
    
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
    // const newScore = {
    //   game_instance_id: gameId,
    //   player_id: playerId,
    //   points: points,
    //   placement: placement
    // }
    // fetch("/scores", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newScore),
    // })
    // .then(res => {
    //   if (res.ok) {
    //     res.json().then((score) => {
    //       setScore(score)
    //     })
    //   }
    // })
  }

  function handleUpdateSubmit(e) {
    e.preventDefault();
    // const updatedScore = {
    //   player_id: playerId,
    //   game_instance_id: gameId,
    //   points: points,
    //   placement: placement
    // }
    // fetch(`/scoresbyid/${playerId}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedScore)
    // })
    // .then(res => {
    //   if (res.ok) {
    //     setUpdated(!updated)
    //   }
    // })
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

  //TODO make scoreinputmodel work, skeleton is all there
  return (
    <div className="ui full-page">
    <div className="ui hidden divider"></div>
    {user ?
      <div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="session">Session</label>
            <select className="u-full-width" onChange={(e) => setSession(e.target.value)}>
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
          <div className="six columns">
            <label htmlFor="gameinstance">Game</label>
            <select className="u-full-width" onChange={(e) => setGameInstance(e.target.value)}>
              <option value={null}>Select Game</option>
              {checkGameInstances() ?
                sessions[session - 1].game_instances.map(gameinstance => {
                  return <option key={gameinstance.id} 
                  value={gameinstance.id}>{gameinstance.game.title}</option>
                })
              : <option value={null}>No games found</option>
              }
            </select>
          </div>
        </div>
          <div className="row">
            <div className="four columns">
              {session ? getPlayerSet().map(player => {
                return <ScoreInputModel 
                key={player.id} id={player.id}
                player={player} handleChange={handleChange}/>
              })
              : <div>No players found for this user, add players in New Player!</div>
              }
            </div>
          </div>
        <form onSubmit={handleNewSubmit}>
          <input className="button-primary" 
          type="submit" 
          value="Submit (ensure all scores are correct!)"
          />
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