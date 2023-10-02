import React, { useState, useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { gameinstancesAtom, updatedAtom } from "../HelperFunctions/atoms"
import parseFunction from "../HelperFunctions/parseFunction"
import InstanceRow from "./InstanceRow";
import GameInstanceCard from "./GameInstanceCard";

export default function GameInstances() {
    const updated = useRecoilValue(updatedAtom);
    const [gameinstances, setGameinstances] = useRecoilState(gameinstancesAtom);
    const [displayList, setDisplayList] = useState([])

    let display = false

    function updateList(data) {
        if (data.length != 0) {
            setDisplayList(parseFunction(gameinstances))
            return true
        }
        return false
    }

    useEffect(() => {
        fetch("/gameinstances")
        .then(res => res.json())
        .then(data => {
            setGameinstances(data)
            updateList(data)
        })
      }, [updated])
    
    //TODO hook up useful game instance data + delete button
    return (
        <div>
            {displayList ?
                displayList.map(setOfThree => {
                    let tempList = []
                    setOfThree.forEach(element => {
                        let item = <GameInstanceCard id={element.id} gameinstance={element}/>
                        tempList.push(item)
                    }); 
                    return <InstanceRow items={tempList}/>
                })
                :
                <div>No Game Instances Found</div>
            }
        </div>
    )
}