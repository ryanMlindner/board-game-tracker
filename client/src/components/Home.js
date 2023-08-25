import React from "react";
import { userAtom } from "./HelperFunctions/atoms";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom)
  return (
    <div className="ui full-page">
      <div className="ui hidden divider"></div>
      {user ? 
      <div className="ui segment">
        <h2>Welcome, {user.username}</h2>
      </div>
      : <h4>Sign up or Log in PLACEHOLDER</h4>
      }
      <h1>How To:</h1>
      <div className="ui large segment">
        Login or Signup, then add <b>New Players</b> and 
        add <b>New Board Games</b> as you see fit. 
        Add <b>New Sessions</b> for nights of games, then add the <b>New Played Games</b> that 
        session using the dropdowns provided in those inputs. After adding a game for a session, 
        add in the <b>New Scores</b> for each player that participated. The <b>Totals</b> page will 
        update with statistics for each player as soon as the first score is submitted.
      </div>
      <h4>About the Author:</h4>
      <div className="ui tertiary segment">
        Ryan Lindner is a software engineer who loves to play board games in his spare time,
        and is pretty terrible at thinking of things to say about himself.
        Perhaps there will be more information here someday, but for now have some links.
      </div>
      <div className="ui grid">
        <a className="five wide column" href="https://github.com/ryanMlindner">Github</a>
        <a className="five wide column" href="https://www.linkedin.com/in/ryan-lindner-5697b1264/">LinkedIn</a>
        <a className="five wide column" href="https://medium.com/@ryan.m.lindner">Blog</a>
      </div>
    </div>
  )
}