// Settings Context - src/context/Settings
import * as React from "react"
import { TrackShape } from "../models/tracks"

export interface ITrack {
  id: string
  version: TrackShape
}

export const versionDefault = {
  id: "",
  title: "",
  length: "",
  url: "",
  genres: [],
  vibes: [],
  energy: {
    name: "",
    id: "",
    slug: "",
  },
  priority: 0,
}

export type ActiveTrackContextType = {
  activeTrack: ITrack
  updateActiveTrack: (track: ITrack) => void
}

export const ActiveTrackContext = React.createContext<ActiveTrackContextType | null>(null)

const ActiveTrackProvider: React.FC = ({ children }) => {
  const [activeTrack, setActiveTrack] = React.useState<ITrack>({
    id: "",
    version: versionDefault,
  })

  const updateActiveTrack = (track: ITrack) => {
    setActiveTrack(track)
  }

  return (
    <ActiveTrackContext.Provider value={{ activeTrack, updateActiveTrack }}>{children}</ActiveTrackContext.Provider>
  )
}

export default ActiveTrackProvider
