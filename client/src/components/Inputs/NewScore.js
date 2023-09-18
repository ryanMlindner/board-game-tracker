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
    if (!scoresArray.find(score => score.id === id)) {
      let playerScore = {
        id : id,
        points : points,
        placement : placement
      }
      console.log(playerScore)
      scoresArray.push(playerScore)
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
    scoresArray.forEach(score => {
      console.log(score)
      const newScore = {
          game_instance_id: gameinstance,
          player_id: score.id,
          points: score.points,
          placement: score.placement
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
    })
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
        <h1>New Scores</h1>
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
              : <div>No players found for this user,
                make sure that the session is selected, 
                or add players in New Player!</div>
              }
            </div>
          </div>
        <h4>Make sure all scores are confirmed and the game is selected!</h4>
        <form onSubmit={handleNewSubmit}>
          <input className="button-primary" 
          type="submit" 
          value="Submit"
          />
        </form>
      {score ?
      <div>Scores Successfully Submitted!</div>
      : <div>No Scores added this session</div>
      }
      </div>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}