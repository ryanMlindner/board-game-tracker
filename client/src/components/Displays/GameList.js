import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamesAtom, updatedAtom } from "../HelperFunctions/atoms";
import GameCard from "./GameCard";
import InstanceRow from "./InstanceRow";
import parseFunction from "../HelperFunctions/parseFunction"

export default function GameList() {
  const [games, setGames] = useRecoilState(gamesAtom)
  const updated = useRecoilValue(updatedAtom)

  const [displayList, setDisplayList] = useState(null)

  useEffect(() => {
    fetch("/games")
    .then(res => res.json())
    .then(data => { 
      setGames(data)
      updateList()
    })
  }, [updated])

  function updateList() {
    if (games.length !== 0) {
      setDisplayList(parseFunction(games))
    }
  }

  return (
    <div className="full-page">
      <h5>List of Games in the database:</h5>
        {displayList ?
          displayList.map(setOfThree => {
            let tempList = []
            setOfThree.forEach(element => {
              let item = <GameCard key = {element.id} id= {element.id} 
              title= {element.title} 
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