import React, { useState, useEffect } from "react";
import { attendancesAtom, playersAtom, sessionsAtom, updatedAtom, userAtom } from "../HelperFunctions/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import PlayerButton from "./PlayerButton";


export default function NewSession() {
  const [date, setDate] = useState('');
  const [session, setSession] = useState(null);

  const user = useRecoilValue(userAtom);
  const updated = useRecoilValue(updatedAtom);
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [sessions, setSessions] = useRecoilState(sessionsAtom);
  const [attendances, setAttendances] = useRecoilState(attendancesAtom);
  
  const [playersInSession, setPlayersInSession] = useState([]);

  useEffect(() => {
    fetch("/players")
    .then(res => res.json())
    .then(data => setPlayers(data))
  }, [updated])

  function handleSubmit(e) {
    const newSession = {
      date: date,
      user_id: user.id,
    } 
    e.preventDefault();
    fetch("/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSession),
    })
    .then(res => {
      if (res.ok) {
        res.json().then(session => {
          setSession(session)
          setSessions([...sessions, session])

          playersInSession.forEach((player) => {
            const newAttendance = {
              player_id : player.id,
              session_id : session.id,
            }
            fetch("/attendances", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newAttendance),
            })
            .then(res => {
              if (res.ok) {
                res.json().then(attendance => {
                  setAttendances([...attendances, attendance])
                  })
                }
            })
          })
        })
      }
    })
  }

  function addToSession(player) {
    setPlayersInSession([...playersInSession, player]);
  }

  function removeFromSession(player) {
    let tempArray = [...playersInSession];
    tempArray.pop(player);
    setPlayersInSession(tempArray);
  }

  return (
    <div className="full-page">
      {user ?
      <div>
        <form className="" onSubmit={handleSubmit}>
          <h1>New Session</h1>
          <h5>Input date of session, then select players who attended, then press Add Session!</h5>
          <div className="container">
            <div className="row">
              <div className="four columns">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  id="date"
                  autoComplete="off"
                  value={date}
                  placeholder="mm/dd/yyyy"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <label htmlFor="players">Players</label>
              {players ?
              players.map(player => {
                return <PlayerButton 
                key = {player.id} 
                player = {player} 
                addToSession={addToSession}
                removeFromSession={removeFromSession}/>
              })
              :
              <h3>No Players added for this user, Add players first!</h3>
              }
            </div>
          </div>
          <div className="container">
            <button className="button-primary" type="submit">Add Session</button>
          </div>
        </form>
      {session ?
      <div className="container">Last session added: {session.date}</div>
      : <div className="container">No Session added this Session!</div>
      }
      </div>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}