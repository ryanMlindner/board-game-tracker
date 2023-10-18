import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, gamesAtom, updatedAtom } from "../HelperFunctions/atoms";
import GameCard from "./GameCard";
import InstanceRow from "./InstanceRow";
import parseFunction from "../HelperFunctions/parseFunction"

export default function GameList() {
  const [games, setGames] = useRecoilState(gamesAtom)
  const [gameinstances, setGameinstances] = useRecoilState(gameinstancesAtom)
  const updated = useRecoilValue(updatedAtom)

  const [displayList, setDisplayList] = useState([])

  useEffect(() => {
    fetch("/games")
    .then(res => res.json())
    .then(data => { 
      setGames(data)
      updateList(data)
    })
    fetch("/gameinstances")
    .then(res => res.json())
    .then(data => setGameinstances(data))
  }, [updated])

  function updateList(data) {
    if (data.length !== 0) {
        setDisplayList(parseFunction(gameinstances))
        return true
    }
    return false
}

  return (
    <div className="full-page">
      <h5>List of Games in the database:</h5>
        {displayList ?
          displayList.map(setOfThree => {
            let tempList = []
            setOfThree.forEach(element => {
              let item = <GameCard key = {element.game.id} id= {element.game.id} 
              title= {element.game.title} 
              publisher= {element.game.publisher} genre= {element.game.genre}/>
              tempList.push(item)
            })
          return <InstanceRow items={tempList}/>
          })
        :<div>No Games submitted to the database yet!</div>
        }
    </div>
  )
}