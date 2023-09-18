import React, { useState } from "react";

export default function ScoreInputModel({id , player, handleChange}) {

  //TODO unknown if this will work, dont want to have to put everything in the previous model
  //but if we have to i guess its fine
  const [points, setPoints] = useState(0);
  const [placement, setPlacement] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(id, points, placement);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5>{player.name}</h5>
        <div className="row">
          <div className="six columns">
            <label htmlFor="points">Points</label>
            <input className="u-full-width"
              type="text"
              id="points"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
            />
          </div>
          <div className="six columns">
            <label htmlFor="placement">Placement</label>
            <input className="u-full-width"
              type="text"
              id="placement"
              value={placement}
              onChange={(e) => setPlacement(parseInt(e.target.value))}
            />
          </div>
        </div>
        <input className="button" 
        type="submit" 
        value="Confirm"
        />
      </form>
    </div>
  )
}