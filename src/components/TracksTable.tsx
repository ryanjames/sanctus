import React, { useMemo, useEffect, useState, SyntheticEvent } from "react"
import withLocation from "../utils/withLocation"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { matchSorter } from "match-sorter"
import { ParentTrackShape, CategoryShape } from "../staticQueries/queryAirtableTracks"

import highlightSearch from "../utils/highlightSearch"

interface Props {
  data: []
  navigate: Function
  search: {
    s: string
  }
  genre: string
  placeholder: React.FC | HTMLElement
  heading: React.FC | HTMLElement
}

const TracksTable: React.FC<Props> = ({ data, genre, search, navigate, placeholder, heading }) => {
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
    const timeOutId = setTimeout(() => navigate(`?s=${searchValue}`), 500)
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
      placeholder={`Search ${genre || "All Tracks"}`}
    />
  )

  type Track = { track: ParentTrackShape }
  const TrackRow: React.FC<Track> = ({ track }) => {
    return (
      <>
        <div tw="w-2/7">{track.title}</div>
        <div tw="w-1/7">{track.energy}</div>
        <div tw="w-1/7">
          {track.genres.map((genre: CategoryShape, index) => (
            <>
              <a key={genre.id} href={`/library/genres/${genre.slug}`}>
                {genre.name}
              </a>
              {index < track.genres.length - 1 ? ", " : ""}
            </>
          ))}
        </div>
        <div tw="w-3/7">
          {track.vibes.map((vibe: CategoryShape, index) => (
            <>
              <a key={vibe.id} href={`/library/vibes/${vibe.slug}`}>
                {vibe.name}
              </a>
              {index < track.vibes.length - 1 ? ", " : ""}
            </>
          ))}
        </div>
      </>
    )
  }

  return (
    <StyledTracksTable>
      <div tw="xs:flex justify-between items-center">
        <h2 tw="hidden xs:inline mb-0 leading-none">
          <strong>{genre || "All Tracks"}</strong>
        </h2>
        {SearchInput}
      </div>
      {!searchValue && placeholder ? (
        <>{placeholder}</>
      ) : (
        <div>
          {!searchValue && heading && <>{heading}</>}
          <div className="tracks-table" tw="mt-8 flex flex-wrap w-full">
            <div tw="w-2/7">Title</div>
            <div tw="w-1/7">Energy</div>
            <div tw="w-1/7">Genres</div>
            <div tw="w-3/7">Vibes</div>
            {filteredData.map(track => (
              <TrackRow key={track.id} track={track} />
            ))}
          </div>
        </div>
      )}
    </StyledTracksTable>
  )
}

const StyledTracksTable = styled.div`
  ${tw``}
`

export default withLocation(TracksTable)
