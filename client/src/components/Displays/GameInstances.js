import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { gameinstancesAtom, updatedAtom } from "../HelperFunctions/atoms"

export default function GameInstances() {
    const updated = useRecoilValue(updatedAtom);
    const [gameinstances, setGameinstances] = useRecoilState(gameinstancesAtom);

    //TODO export to a helper file
    function parseForDisplay(list) {
        let setsOfThree = []
        for (let step = 0; step < list.length; step = step + 3) {
            let newDisplaySet = []
            for(let upToThree = 0; upToThree < 3; upToThree ++) {
                if (list[step]) {newDisplaySet.push(list[step])}
            }
            console.log(newDisplaySet)
        }
        console.log(setsOfThree)
        return setsOfThree
    }

    useEffect(() => {
        fetch("/gameinstances")
        .then(res => res.json())
        .then(data => setGameinstances(data))
      }, [updated])
    
    //TODO set up displays for 3 per row and have another in between component so that
    //all the containers line up correctly and theres not overflow that looks like shit
    //do that for all the previous thingys
    return (
        <div>

        </div>
    )
}