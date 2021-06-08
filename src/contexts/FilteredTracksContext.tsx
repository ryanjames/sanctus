// Settings Context - src/context/Settings
import * as React from "react"
import { TrackShape } from "../models/tracks"

export type FilteredTracksContextType = {
  filteredTracks: TrackShape[]
  updateFilteredTracks: (tracks: TrackShape[]) => void
}

export const FilteredTracksContext = React.createContext<FilteredTracksContextType | null>(null)

const FilteredTracksProvider: React.FC = ({ children }) => {
  const [filteredTracks, setFilteredTracks] = React.useState<TrackShape[]>([])

  const updateFilteredTracks = (tracks: TrackShape[]) => {
    setFilteredTracks(tracks)
  }

  return (
    <FilteredTracksContext.Provider value={{ filteredTracks, updateFilteredTracks }}>
      {children}
    </FilteredTracksContext.Provider>
  )
}

export default FilteredTracksProvider
