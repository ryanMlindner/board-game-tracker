import React, { useState, useEffect } from "react";
import { playersAtom, sessionsAtom, updatedAtom, userAtom } from "../HelperFunctions/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import PlayerButton from "./PlayerButton";


export default function NewSession() {
  const [date, setDate] = useState('');
  const [session, setSession] = useState(null);

  const user = useRecoilValue(userAtom);
  const updated = useRecoilValue(updatedAtom);
  const [players, setPlayers] = useRecoilState(playersAtom);
  const [sessions, setSessions] = useRecoilState(sessionsAtom);
  
  let playersInSession = [];

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
        })
      }
    })
  }

  return (
    <div className="full-page">
      <div className="ui hidden divider"></div>
      {user ?
      <div>
        <form className="ui form" onSubmit={handleSubmit}>
          <h1>New Sesh</h1>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            autoComplete="off"
            value={date}
            placeholder="mm/dd/yyyy"
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="container">
            <div className="row">
            {players ?
            players.map(player => {
              return <PlayerButton key = {player.id} player = {player}/>
            })
            :
            <h3>No Players added for this user, Add players first!</h3>
            }
            </div>
          </div>
          <button className="ui primary button" type="submit">Add Session</button>
        </form>
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