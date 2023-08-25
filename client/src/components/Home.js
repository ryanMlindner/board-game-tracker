import React from "react";
import { userAtom } from "./HelperFunctions/atoms";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom)
  return (
    <div className="ui full-page">
      {user ? 
      <div>
      Welcome, {user.username}
      </div>
      : <div>Sign up or Log in PLACEHOLDER</div>
      }
      <h1>How To:</h1>
      <p>Login or Signup, then add <b>New Players</b> and add <b>Board Games</b> as you see fit. 
        Add <b>New Sessions</b> for nights of games, then add the <b>New Played Games</b> that 
        session using the dropdowns provided in those inputs. After adding a game for a session, 
        add in the <b>New Scores</b> for each player that participated. The <b>Totals</b> page will 
        update with statistics for each player as soon as the first score is submitted.
      </p>
    </div>
  )
}