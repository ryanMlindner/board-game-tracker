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
  
  let playersInSession = [];//add to state

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
    playersInSession.push(player);
    console.log(playersInSession);
  }

  function removeFromSession(player) {
    playersInSession.pop(player);
    console.log(playersInSession);
  }

  return (
    <div className="full-page">
      <div className="ui hidden divider"></div>
      {user ?
      <div>
        <form className="" onSubmit={handleSubmit}>
          <h1>New Sesh</h1>
          <div className="row">
            <div className="6 columns">
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
          <button className="button-primary" type="submit">Add Session</button>
        </form>
        <div className="container">
          <div className="row">
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
      <div className="ui hidden divider"></div>
      {session ?
      <div>Last session added: {session.date}</div>
      : <div>no session added this session PLACEHOLDER</div>
      }

      </div>
    : <div>Log in to use this feature!</div>
    }
    </div>
  )
}