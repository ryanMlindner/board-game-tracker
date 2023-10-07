import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameinstancesAtom, gamesAtom, updatedAtom } from "../HelperFunctions/atoms";
import GameCard from "./GameCard";
import InstanceRow from "./InstanceRow";

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
    if (data.length != 0) {
        setDisplayList(parseFunction(gameinstances))
        return true
    }
    return false
}

  //TODO testing (im very tired)

  return (
    <div className="full-page">
      <h5>List of Games in the database:</h5>
        {displayList ?
          displayList.map(setOfThree => {
            let tempList = []
            setOfThree.forEach(element => {
              let item = <GameCard key = {element.id} id= {element.id} title= {element.title} 
              publisher= {element.publisher} genre= {element.genre}/>
              tempList.push(item)
            })
          return <InstanceRow items={tempList}/>
          })
        :<div>No Games submitted to the database yet!</div>
        }
    </div>
  )
}