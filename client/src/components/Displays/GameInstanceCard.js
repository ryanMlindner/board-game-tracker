import React from "react";
import { useRecoilState } from "recoil";
import { updatedAtom } from "../HelperFunctions/atoms";

export default function GameInstanceCard({ gameinstance }) {
  //TODO fill in gameinstance data
  const [updated, setUpdated] = useRecoilState(updatedAtom)
  
  console.log(gameinstance)

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
      <h5>{gameinstance.id}</h5>
      <button className="button" onClick={handleClick}>Delete Instance</button>
    </div>
  )
}