import React, { useMemo, useContext, useEffect, useState, SyntheticEvent } from "react"
import withLocation from "../utils/withLocation"
import PageLink from "./PageLink"
import styled from "@emotion/styled"
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
  const { activeTrack, updateActiveTrack } = useContext(ActiveTrackContext) as ActiveTrackContextType

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
    navigate(`?s=${searchValue}`)
    updateActiveTrack({
      id: "",
      version: versionDefault,
    })
    if (window.player) {
      window.player.destroy()
    }
  }, [searchValue])

  let searchTimeOut: ReturnType<typeof setTimeout>
  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeOut)
    const inputValue: string = (e.target as HTMLInputElement).value
    searchTimeOut = setTimeout(() => {
      setSearchValue(inputValue)
      setFilteredData(filterResults(inputValue))
    }, 150)
  }

  const SearchInput = (
    <input
      tw="w-full xs:w-2/3 sm:w-1/2 py-3 pl-3"
      type="text"
      onChange={handleSearch}
      placeholder={`Search ${title ? title.toLowerCase() + " " : ""}tracks`}
    />
  )

  type Track = { track: TrackShape }
  const TrackRow: React.FC<Track> = ({ track }) => {
    return (
      <div tw="border-gray-200 border-0 border-b border-solid text-sm">
        <div
          tw="flex flex-wrap w-full h-16 items-center"
          className={`track-row ${activeTrack.id == track.id ? "hide" : ""}`}
        >
          <div tw="w-3/8 text-lg font-bold" />
          <div tw="w-1/8" className="category-link">
            <PageLink to={`/library/energy/${track.energy?.slug}`}>{track.energy?.name}</PageLink>
          </div>
          <div tw="w-2/8">
            {track.genres?.map((genre: CategoryShape, index) => (
              <span key={genre.id} className="category-link">
                <PageLink to={`/library/genre/${genre.slug}`}>{genre.name}</PageLink>
                {index < track.genres.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <div tw="w-2/8">
            {track.vibes?.map((vibe: CategoryShape, index) => (
              <span key={vibe.id} className="category-link">
                <PageLink to={`/library/vibe/${vibe.slug}`}>{vibe.name}</PageLink>
                {index < track.vibes.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
        <div tw="w-full">
          <TrackDetails track={track} />
        </div>
      </div>
    )
  }

  return (
    <StyledTracksTable>
      <div>{SearchInput}</div>
      {!searchValue && placeholder ? (
        <>{placeholder}</>
      ) : (
        <div className="tracks-table" tw="mt-8">
          <div tw="text-xs font-bold uppercase tracking-widest pb-4 border-gray-200 border-0 border-b border-solid flex w-full">
            <div tw="w-3/8">Title</div>
            <div tw="w-1/8">Energy</div>
            <div tw="w-2/8">Genres</div>
            <div tw="w-2/8">Vibes</div>
          </div>
          <div className="table-rows" tw="overflow-y-scroll">
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
  .track-row.hide {
    display: none;
  }
  .table-rows {
    height: calc(100vh - 230px);
  }
  .category-link {
    ${tw`text-gray-400`}
    a {
      border-bottom: 1px solid;
      ${tw`border-gray-400 text-gray-400`}
      &:hover {
        color: #111;
        ${tw`border-gray-700 text-gray-700`}
      }
    }
  }
`

export default withLocation(TracksTable)
