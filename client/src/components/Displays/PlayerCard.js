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
    <div className="ui raised card">
      <div className="content">
        <div className="header">Name: {name}</div>
        <div className="content">Total Points: {totalPoints} Wins: {wins} </div>
        <div className="content">Average Placement: {averagePlacement} </div>
        <button className="ui button" onClick={handleClick}>Delete Player</button>
      </div>
      <div className="content">
        {scores ?
        scores.map(score => {
          return <ScoreCard
          key={score.id}
          id={score.id}
          placement={score.placement}
          points={score.points}
          gameInstance={gameinstances[score.game_instance_id - 1]}
          />})
        :<div>No scores for player</div>}
      </div>
    </div>
    )
}