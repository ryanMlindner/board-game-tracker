import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { gamesAtom } from "../HelperFunctions/atoms";
import GameCard from "./GameCard";

export default function GameList() {
  const [games, setGames] = useRecoilState(gamesAtom)

  useEffect(() => {
    fetch("/games")
    .then(res => res.json())
    .then(data => setGames(data))
  }, [])

  return (
    <div className="ui full-page">
      <div className="ui hidden divider"></div>
      <div className="ui header">List of Games in the database:</div>
      <div className="ui cards">
        {games ?
          games.map(game => {
            return <GameCard title = {game.title} publisher = {game.publisher} genre = {game.genre}/>
          })
        :
        <div>No Games submitted to the database yet!</div>
        }
      </div>
    </div>
  )
}