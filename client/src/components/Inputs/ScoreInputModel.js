import React, { useState } from "react";

export default function ScoreInputModel({id , handleChange}) {

  //TODO unknown if this will work, dont want to have to put everything in the previous model
  //but if we have to i guess its fine

  return (
    <div>
      <label htmlFor="points">Points</label>
        <input
          type="text"
          id="points"
          value={points}
          onChange={(e) => handleChange(e.target.value, "points", id)}
        />
      <label htmlFor="placement">Placement</label>
        <input
          type="text"
          id="placement"
          value={placement}
          onChange={(e) => handleChange(e.target.value, "placement", id)}
        />
    </div>
  )
}