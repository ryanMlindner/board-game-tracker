import React from "react";

export default function GameCard({ title, publisher, genre }) {

  return (
    <div className="card">
      <h1>
        {title} 
      </h1>
      <h5>
        {publisher}
      </h5>
      <h5>
        Genre: {genre}
      </h5>
    </div>
  )
}