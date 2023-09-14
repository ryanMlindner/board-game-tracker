import React, { useState } from "react";

export default function ScoreInputModel({}) {
  const [points, setPoints] = useState(0);
  const [placement, setPlacement] = useState(0);

  //TODO unknown if this will work, dont want to have to put everything in the previous model
  //but if we have to i guess its fine

  return (
    <div>
      <label htmlFor="points">Points</label>
        <input
          type="text"
          id="points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
      <label htmlFor="placement">Placement</label>
        <input
          type="text"
          id="placement"
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
        />
    </div>
  )
}