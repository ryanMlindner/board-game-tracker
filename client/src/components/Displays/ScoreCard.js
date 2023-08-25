import React from "react";

export default function ScoreCard({ placement, points, gameInstance}) {

  return (
    <div>
      <div>Placement : {placement}</div>
      <div>Points : {points}</div>
      {gameInstance ? 
      <div>
        <div>Game: {gameInstance.game.title}</div>
        <div>Date: {gameInstance.session.date}</div>
        <div>---</div>
      </div>
      : <div></div>
      }
    </div>
  )
}