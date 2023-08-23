import React from "react";
import ScoreCard from "./ScoreCard";

export default function PlayerCard({ name, scores }) {
  const totalScore = scores.reduce((accumulator, element) => {
    return accumulator + element.points;
  },0)
  //console.log(totalScore)

  return (
    <div className="ui raised card">
      <div className="content">
        <div className="header">Name: {name}</div>
        <div className="meta">Total Points: {totalScore}</div>
      </div>
      <div className="extra content">
        {scores ?
        scores.map(score => {
          return <ScoreCard
          key={score.id}
          placement={score.placement}
          points={score.points}
          gameInstanceId={score.game_instance_id}
          />})
        :<div>No scores for player</div>}
      </div>
    </div>
    )
}