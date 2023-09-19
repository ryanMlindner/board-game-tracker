import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, gamesAtom, updatedAtom } from "../HelperFunctions/atoms";
import GameCard from "./GameCard";

export default function GameList() {
  const [games, setGames] = useRecoilState(gamesAtom)
  const [gameinstances, setGameinstances] = useRecoilState(gameinstancesAtom)
  const updated = useRecoilValue(updatedAtom)

  useEffect(() => {
    fetch("/games")
    .then(res => res.json())
    .then(data => setGames(data))
    fetch("/gameinstances")
    .then(res => res.json())
    .then(data => setGameinstances(data))
  }, [updated])

  return (
    <div className="full-page">
      <h5>List of Games in the database:</h5>
      <div className="container">
        <div className="row">
          {games ?
            games.map(game => {
              return <GameCard key = {game.id} id= {game.id} title= {game.title} publisher= {game.publisher} genre= {game.genre}/>
            })
          :
          <div>No Games submitted to the database yet!</div>
          }
        </div>
      </div>
    </div>
  )
}