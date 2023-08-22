import React from "react";
import { userAtom } from "./HelperFunctions/atoms";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom)
  return (
    <div className="ui full-page">
      {user ? 
      <div>
      Welcome, {user.username}
      </div>
      : <div>Sign up or Log in PLACEHOLDER</div>
      }
    </div>
  )
}