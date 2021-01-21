// Settings Context - src/context/Settings
import * as React from "react"
import { TrackShape } from "../models/tracks"
import withLocation from "../utils/withLocation"
import { versionDefault } from "./ActiveTrackContext"

export type SharedTrackContextType = {
  sharedTrack: TrackShape
  updateSharedTrack: (track: TrackShape) => void
}

export const SharedTrackContext = React.createContext<SharedTrackContextType | null>(null)

type Props = {
  location: {
    href: string
  }
  navigate: Function
}

const SharedTrackProvider: React.FC<Props> = ({ children }) => {
  const [sharedTrack, setSharedTrack] = React.useState<TrackShape>(versionDefault)

  const updateSharedTrack = (track: TrackShape) => {
    setSharedTrack(track)
  }

  return (
    <SharedTrackContext.Provider value={{ sharedTrack, updateSharedTrack }}>{children}</SharedTrackContext.Provider>
  )
}

export default withLocation(SharedTrackProvider)
