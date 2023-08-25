import React, { useState } from "react";
import { sessionsAtom, userAtom } from "../HelperFunctions/atoms";
import { useRecoilState, useRecoilValue } from "recoil";


export default function NewSession() {
  const [date, setDate] = useState('');
  const [session, setSession] = useState(null);

  const user = useRecoilValue(userAtom);
  const [sessions, setSessions] = useRecoilState(sessionsAtom);
  
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
    <div className="ui full-page">
      <div className="ui hidden divider"></div>
      {user ?
      <div>
      <form className="ui form" onSubmit={handleSubmit}>
        <h1>New Session</h1>
        <label htmlFor="date">Date</label>
        <input
          type="text"
          id="date"
          autoComplete="off"
          value={date}
          placeholder="mm/dd/yyyy"
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="ui button" type="submit">Add Session</button>
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