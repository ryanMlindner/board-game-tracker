import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { gameinstancesAtom, updatedAtom } from "../HelperFunctions/atoms"

export default function GameInstances() {
    const updated = useRecoilValue(updatedAtom);
    const [gameinstances, setGameinstances] = useRecoilState(gameinstancesAtom);

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