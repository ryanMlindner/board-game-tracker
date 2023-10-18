import React from "react";
import { useRecoilState } from "recoil";
import { updatedAtom } from "../HelperFunctions/atoms";

export default function GameInstanceCard({ gameinstance }) {
  //TODO fill in gameinstance data
  const [updated, setUpdated] = useRecoilState(updatedAtom)

  function handleClick() {
    fetch(`gameinstancesbyid/${gameinstance.id}`, {
      method: "DELETE",
    })
    .then(() => {
      setUpdated(!updated)
    })
  }
  return (
    <div>
      <div>Title: {gameinstance.game.title}</div>
      <div>Date: {gameinstance.session.date}</div>
      <div>Total Scores: {gameinstance.scores.length}</div>
      <button className="button" onClick={handleClick}>Delete Instance</button>
    </div>
  )
}