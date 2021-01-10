import React, { useMemo, useEffect, useState, SyntheticEvent } from "react"
import withLocation from "../utils/withLocation"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import tw from "twin.macro"
import { matchSorter } from "match-sorter"
import { TrackShape, CategoryShape } from "../models/tracks"
import { ActiveTrackContext, ActiveTrackContextType, versionDefault } from "../contexts/ActiveTrackContext"

import TrackDetails from "./TrackDetails"

import highlightSearch from "../utils/highlightSearch"

export interface Props {
  data: []
  title: string
  search: {
    s: string
  }
  placeholder?: React.FC | HTMLElement
  navigate: Function
}

const TracksTable: React.FC<Props> = ({ data, title, search, navigate, placeholder }) => {
  const { updateActiveTrack } = React.useContext(ActiveTrackContext) as ActiveTrackContextType

  const memoizedData = useMemo(() => data, [data])

  const searchFields = ["search"]

  const filterResults = (inputValue: string) => {
    const query = inputValue
    const filteredData = matchSorter(memoizedData, inputValue, {
      keys: searchFields,
    })
    const keys = searchFields
    return !inputValue && memoizedData ? memoizedData : highlightSearch(query, filteredData, keys)
  }

  const [filteredData, setFilteredData] = useState(filterResults(search.s))
  const [searchValue, setSearchValue] = useState(search.s || "")

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      navigate(`?s=${searchValue}`)
      updateActiveTrack({
        id: "",
        version: versionDefault,
      })
      if (window.player) {
        window.player.destroy()
      }
    }, 200)
    return () => clearTimeout(timeOutId)
  }, [searchValue])

  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    const inputValue: string = (e.target as HTMLInputElement).value
    setSearchValue(inputValue)
    setFilteredData(filterResults(inputValue))
  }

  const SearchInput = (
    <input
      tw="w-full xs:w-2/3 sm:w-1/2 py-3 pl-3"
      type="text"
      value={searchValue}
      onChange={handleSearch}
      placeholder={`Search ${title ? title.toLowerCase() + " " : ""}tracks`}
    />
  )

  type Track = { track: TrackShape }
  const TrackRow: React.FC<Track> = ({ track }) => {
    const versions = () => {
      if (track.children && track.children.length) {
        const count = track.children.length + 1
        return <span>{count} versions</span>
      }
    }
    return (
      <>
        <div tw="w-2/7">
          {track.title} {versions()}
        </div>
        <div tw="w-1/7">
          <Link to={`/library/energy/${track.energy?.slug}`}>{track.energy?.name}</Link>
        </div>
        <div tw="w-1/7">
          {track.genres?.map((genre: CategoryShape, index) => (
            <span key={genre.id}>
              <Link to={`/library/genre/${genre.slug}`}>{genre.name}</Link>
              {index < track.genres.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div tw="w-2/7">
          {track.vibes?.map((vibe: CategoryShape, index) => (
            <span key={vibe.id}>
              <Link to={`/library/vibe/${vibe.slug}`}>{vibe.name}</Link>
              {index < track.vibes.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div tw="w-full">
          <TrackDetails track={track} />
        </div>
      </>
    )
  }

  return (
    <StyledTracksTable>
      <div>{SearchInput}</div>
      {!searchValue && placeholder ? (
        <>{placeholder}</>
      ) : (
        <div className="tracks-table" tw="mt-8 flex flex-wrap w-full">
          <div tw="w-2/7">Title</div>
          <div tw="w-1/7">Energy</div>
          <div tw="w-1/7">Genres</div>
          <div tw="w-3/7">Vibes</div>
          {filteredData.map(track => (
            <TrackRow key={track.id} track={track} />
          ))}
        </div>
      )}
    </StyledTracksTable>
  )
}

const StyledTracksTable = styled.div`
  ${tw``}
`

export default withLocation(TracksTable)
