import React, { useState } from "react";

export default function PlayerButton( { player, addToSession, removeFromSession } ) {
    const [inSession, setInSession] = useState(false);

    function handleClick() {
        if (!inSession){addToSession(player)}
        else {removeFromSession(player)}
        setInSession(!inSession)
    }

    return (
        <div className="two columns">
            <button className={inSession ? "button-primary" : "button"}
             onClick={handleClick}>{player.name}</button>
        </div>
    )
}