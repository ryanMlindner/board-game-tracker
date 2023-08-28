import React from "react";

export default function GameCard({ title, publisher, genre}) {
  return (
    <div className="ui inverted card">
      <div className="content">
        <div className="header">Title: {title}</div>
        <div className="meta">Publisher: {publisher}</div>
        <div className="meta">Genre: {genre} </div>
      </div>
    </div>
  )
}