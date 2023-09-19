import React, { useEffect } from "react";
import { gamesAtom, userAtom } from "./HelperFunctions/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom)
  const [games, setGames] = useRecoilState(gamesAtom)
  useEffect(() => {
    fetch("/games")
    .then(res => res.json())
    .then(data => setGames(data))
  }, [])


  return (
    <div className="full-page">
      {user ? 
      <div className="">
        <h5>Welcome, {user.username}</h5>
      </div>
      :
      <div className="">
        <h4>Sign up or Log in to use most features!</h4>
      </div>
      }
      <h1>How To:</h1>
      <div className="">
        Login or Signup, then add <b>New Players</b> and 
        add <b>New Board Games</b> as you see fit. 
        Add <b>New Sessions</b> for nights of games, then add the <b>New Played Games</b> that 
        session using the dropdowns provided in those inputs. After adding a game for a session, 
        add in the <b>New Scores</b> for each player that participated. The <b>Totals</b> page will
        update with statistics for each player as soon as the first score is submitted.
        Adding board games to the database is possible without logging in, as they are not user
        dependent.
      </div>
      <h5>About the Author:</h5>
      <div className="">
        Ryan Lindner is a software engineer who loves to play board games in his spare time,
        and is pretty terrible at thinking of things to say about himself.
        Perhaps there will be more information here someday, but for now have some links.
      </div>
      <div className="row">
        <div className="four columns">
          <a href="https://github.com/ryanMlindner">Github</a>
        </div>
        <div className="four columns">
        <a href="https://www.linkedin.com/in/ryan-lindner-5697b1264/">LinkedIn</a>
        </div>
        <div className="four columns">
        <a href="https://medium.com/@ryan.m.lindner">Blog</a>
        </div> 
      </div>
    </div>
  )
}