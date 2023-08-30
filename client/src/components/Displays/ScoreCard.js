import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { updatedAtom } from "../HelperFunctions/atoms";

export default function ScoreCard({ id, placement, points, gameInstance}) {
  const [updated, setUpdated] = useRecoilState(updatedAtom)


  function handleClick() {
    fetch(`/scoresbyid/${id}`,{
      method: "DELETE",
    })
    .then(() => {
      setUpdated(!updated)
    })
  }

  return (
    <div>
      <div>Placement : {placement}</div>
      <div>Points : {points}</div>
      {gameInstance ? 
      <div>
        <div>Game: {gameInstance.game.title}</div>
        <div>Date: {gameInstance.session.date}</div>
        <button className="ui button" onClick={handleClick}>Delete Score</button>
        <div>---</div>
      </div>
      : <div></div>
      }
    </div>
  )
}