import { atom } from "recoil";

export const userAtom = atom({
  key: 'userKey',
  default: ''
})

export const playersAtom = atom({
  key: 'playersKey',
  default: ''
})

export const gamesAtom = atom({
  key: 'gamesKey',
  default: ''
})

export const sessionsAtom = atom({
  key: 'sessionsKey',
  default: ''
})

export const gameinstancesAtom = atom({
  key: 'gameinstancesKey',
  default: ''
})