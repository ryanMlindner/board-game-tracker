import { atom } from "recoil";

export const userAtom = atom({
  key: 'userKey',
  default: ''
})

export const playersAtom = atom({
  key: 'playersKey',
  default: ''
})