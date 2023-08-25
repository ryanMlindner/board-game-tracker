import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, playersAtom, userAtom } from "../HelperFunctions/atoms";
import PlayerCard from "./PlayerCard";

export default function Totals() {
  const [players, setPlayers] = useRecoilState(playersAtom)
  const [gameinstances, setGameinstances] = useRecoilState(gameinstancesAtom)
  const user = useRecoilValue(userAtom)

  useEffect(() => {
    fetch("/rankings")
    .then(res => res.json())
    .then(data => {
      const sortedList = data.sort((a,b) => b.total_score - a.total_score)
      setPlayers([...sortedList])
    })
    fetch('/gameinstances')
    .then(res => res.json())
    .then(gameinstances => setGameinstances(gameinstances))
    }, [])

  return (
    <div className="ui cards full-page">
      {players ?
      players.map(player => {
        return <PlayerCard
        key = {player.id}
        name = {player.name}
        scores = {player.scores}
        totalPoints = {player.total_score}
        wins = {player.wins}
        averagePlacement = {player.average_placement}
        />
      })
      :
      <div>No Players to show for user</div>
      }
    </div>
  )
}