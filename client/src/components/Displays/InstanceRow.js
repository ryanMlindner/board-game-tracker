import React from "react"


export default function InstanceRow({ items }) {
  return (
    <div className="container">
      <div className="row">
        <div className="four columns">
          {items[0]}
        </div>
        <div className="four columns">
          {items[1]}
        </div>
        <div className="four columns">
          {items[2]}
        </div>
      </div>
    </div>
  )
}