import React, { useEffect } from "react";
import ScoreCard from "./ScoreCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, updatedAtom } from "../HelperFunctions/atoms";

export default function PlayerCard({ id, name, scores, totalPoints, wins, averagePlacement }) {
  const gameinstances = useRecoilValue(gameinstancesAtom)
  const [updated, setUpdated] = useRecoilState(updatedAtom)

  function handleClick() {
    fetch(`playersbyid/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      setUpdated(!updated)
    })
  }
  
  return (
    <div className="card">
      <div className="container">
        <h1>{name}</h1>
        <h5>Total Points: {totalPoints} | Wins: {wins} </h5>
        <h5>Average Placement: 
          {averagePlacement ?
          averagePlacement.toFixed(2)
          : null
          } 
        </h5>
        <h5><button className="button-primary" onClick={handleClick}>Delete Player</button></h5>
      </div>
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Game</th>
            <th>Placement</th>
            <th>Points</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scores ?
          scores.map(score => {
            return <ScoreCard
            key={score.id}
            id={score.id}
            placement={score.placement}
            gameInstance={gameinstances ?
              gameinstances.find((gameinstance) => gameinstance.id === score.game_instance_id)
              : null
            }
            points={score.points}
            />})
            :<div>No scores for player</div>}
        </tbody>
      </table>
    </div>
    )
}