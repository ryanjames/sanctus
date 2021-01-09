// Settings Context - src/context/Settings
import * as React from "react"

export interface ITrack {
  id: string
  version: string
}

export interface IPlayer {
  id: string
  instance: {}
}

export type ActiveTrackContextType = {
  activeTrack: ITrack
  activePlayer: IPlayer
  updateActiveTrack: (track: ITrack) => void
  updateActivePlayer: (player: IPlayer) => void
}

export const ActiveTrackContext = React.createContext<ActiveTrackContextType | null>(null)

const ActiveTrackProvider: React.FC = ({ children }) => {
  const [activeTrack, setActiveTrack] = React.useState<ITrack>({
    id: "",
    version: "",
  })
  const [activePlayer, setActivePlayer] = React.useState<IPlayer>({
    id: "",
    instance: {},
  })

  const updateActiveTrack = (track: ITrack) => {
    setActiveTrack(track)
  }

  const updateActivePlayer = (player: IPlayer) => {
    setActivePlayer(player)
  }

  return (
    <ActiveTrackContext.Provider value={{ activeTrack, updateActiveTrack, activePlayer, updateActivePlayer }}>
      {children}
    </ActiveTrackContext.Provider>
  )
}

export default ActiveTrackProvider
