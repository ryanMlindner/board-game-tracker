import React from "react";
import { userAtom } from "./HelperFunctions/atoms";
import { useRecoilValue } from "recoil";

export default function Home() {
  const user = useRecoilValue(userAtom)
  return (
    <div className="ui full-page">
      <div>
        Welcome, {user.username}
      </div>
    </div>
  )
}