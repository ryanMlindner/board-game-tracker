import React, { useState } from "react";

export default function PlayerButton( { player } ) {
    const [inSession, setInSession] = useState(false);

    function handleClick() {
        setInSession(!inSession)
    }

    return (
        <div className="three columns">
            <button className="button" onClick={handleClick}>{player.name}</button>
        </div>
    )
}