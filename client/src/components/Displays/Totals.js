import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, playersAtom, updatedAtom, userAtom } from "../HelperFunctions/atoms";
import PlayerCard from "./PlayerCard";

//TODO date filtering functionality
//should probably fix dates first so that things work like they do everywhere else
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
      <div className="row">
        <div className="four columns">
          <button className="button" onClick={() => {handleClick("total_score")}}>
            Sort By Total Points
          </button>
        </div>
        <div className="four columns">
          <button className="button" onClick={() => {handleClick("average_placement")}}>
            Sort By Average Placement
          </button>
        </div>
        <div className="four columns">
          <button className="button" onClick={() => {handleClick("wins")}}>
            Sort By Wins
          </button>
        </div>
      </div>
      <div className="">
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