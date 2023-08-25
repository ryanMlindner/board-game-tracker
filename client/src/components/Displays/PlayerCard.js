import React, { useEffect } from "react";
import ScoreCard from "./ScoreCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom } from "../HelperFunctions/atoms";

export default function PlayerCard({ name, scores, totalPoints, wins, averagePlacement }) {
  const gameinstances = useRecoilValue(gameinstancesAtom)

  return (
    <div className="ui raised card">
      <div className="content">
        <div className="header">Name: {name}</div>
        <div className="meta">Total Points: {totalPoints} Wins: {wins} </div>
        <div className="meta">Average Placement: {averagePlacement} </div>
      </div>
      <div className="extra content">
        {scores ?
        scores.map(score => {
          return <ScoreCard
          key={score.id}
          placement={score.placement}
          points={score.points}
          gameInstance={gameinstances[score.game_instance_id - 1]}
          />})
        :<div>No scores for player</div>}
      </div>
    </div>
    )
}