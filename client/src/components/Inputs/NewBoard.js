import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { gamesAtom } from "../HelperFunctions/atoms";
//TODO tailor forms

export default function NewBoard() {
  //optional modularize
  const [title, setTitle] = useState("")
  const [publisher, setPublisher] = useState("")
  const [genre, setGenre] = useState("")
  const [game, setGame] = useState(null)

  const [games, setGames] = useRecoilState(gamesAtom)

  function handleSubmit(e) {
    const newGame = {
      title: title,
      publisher: publisher,
      genre: genre,
    } 
    e.preventDefault();
    fetch("/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    })
    .then(res => {
      if (res.ok) {
        res.json().then(returnedGame => {
          setGame(returnedGame);
          setGames([...games, returnedGame])
        })
      }
    })
  }
  
  return (
    <div className="ui full-page">
      <form className="ui form" onSubmit={handleSubmit}>
        <h1>Add new board game to the database</h1>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="publisher">Publisher</label>
        <input
          type="text"
          id="publisher"
          autoComplete="off"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          autoComplete="off"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button className="ui button" type="submit">Add Game</button>
      </form>
      {game ?
      <div>Last game added: {game.title}</div>
      : <div>Use the form above to add a game PLACEHOLDER</div>
      }
    </div>)
}