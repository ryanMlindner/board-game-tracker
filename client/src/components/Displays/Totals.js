import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playersAtom, userAtom } from "../HelperFunctions/atoms";
import PlayerCard from "./PlayerCard";

export default function Totals() {
  const [players, setPlayers] = useRecoilState(playersAtom)
  const user = useRecoilValue(userAtom)

  useEffect(() => {
    fetch("/players")
    .then(res => res.json())
    .then(data => {
      //console.log(data)
      setPlayers(data)
    })
    }, [])
  
  return (
    <div className="ui cards full-page">
      {players ?
      players.map(player => {
        return <PlayerCard
        key = {player.id}
        name = {player.name}
        scores = {player.scores}
        />
      })
      :
      <div>No Players to show for user</div>
      }
    </div>
  )
}