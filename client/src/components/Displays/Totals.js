import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, playersAtom, updatedAtom, userAtom } from "../HelperFunctions/atoms";
import PlayerCard from "./PlayerCard";

export default function Totals() {
  const updated = useRecoilValue(updatedAtom)
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
    }, [user, updated])

  function handleClick(sortBy) {
    let tempList = [...players]
    let sortedList = []
    if (sortBy === "total_score") {
      sortedList = tempList.sort((a,b) => b.total_score - a.total_score)
    }
    if (sortBy === "average_placement") {
      sortedList = tempList.sort((a,b) => a.average_placement - b.average_placement)
    }
    if (sortBy === "wins") {
      sortedList = tempList.sort((a,b) => b.wins - a.wins)
    }
    setPlayers([...sortedList])
  }

  return (
    <div className="ui full-page">
      <div className="ui hidden divider"></div>
      <div className="ui inverted menu">
        <div className="item">
          <button className="ui inverted button" onClick={() => {handleClick("total_score")}}>
            Sort By Total Points
          </button>
        </div>
        <div className="item">
          <button className="ui inverted button" onClick={() => {handleClick("average_placement")}}>
            Sort By Average Placement
          </button>
        </div>
        <div className="item">
          <button className="ui inverted button" onClick={() => {handleClick("wins")}}>
            Sort By Wins
          </button>
        </div>
      </div>
      <div className="ui cards">
        {players ?
        players.map(player => {
          return <PlayerCard
          key = {player.id}
          id = {player.id}
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
    </div>
  )
}