import React from "react";

export default function ScoreCard({ placement, points, gameInstanceId}) {
  //TODO add in reference lists for games to grab titles from IDs
  return (
    <div>
      <div>Placement : {placement}</div>
      <div>Points : {points}</div>
      <div>Game PLACEHOLDER: {gameInstanceId}</div>
    </div>
  )
}