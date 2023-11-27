import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, updatedAtom } from "../HelperFunctions/atoms";

export default function ScoreCard({ id, placement, gameInstance, points}) {
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
    <>
    {gameInstance ?
    <tr>
      <td>{gameInstance.game.title}</td>
      <td>{placement}</td>
      <td>{points}</td>
      <td>{gameInstance.session.date}</td>
      <td><button onClick={handleClick}>Delete</button></td>
    </tr>
    : <>Loading</>
    }
    </>
  )
}