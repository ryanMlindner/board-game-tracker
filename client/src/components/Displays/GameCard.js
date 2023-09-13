import React from "react";

export default function GameCard({ id, title, publisher, genre}) {

  return (
    <div className="three columns">
      <div className="">
        Title: {title} | 
        Publisher: {publisher} |
        Genre: {genre}
      </div>
    </div>
  )
}