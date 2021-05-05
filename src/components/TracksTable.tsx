import React, { useMemo, useContext, useEffect, useState, SyntheticEvent } from "react"
import PageLink from "./PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { mQw, sizes, gutters } from "../utils/mediaQueries"
import { matchSorter } from "match-sorter"
import { TrackShape, CategoryShape } from "../models/tracks"
import { ActiveTrackContext, ActiveTrackContextType, versionDefault } from "../contexts/ActiveTrackContext"
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from "react-virtualized"
import "react-virtualized/styles.css"

import TrackDetails from "./TrackDetails"

import highlightSearch from "../utils/highlightSearch"

export interface Props {
  data: any
  title?: string
  placeholder?: any
}

const TracksTable: React.FC<Props> = ({ data, title, placeholder }) => {
  const { activeTrack, updateActiveTrack } = useContext(ActiveTrackContext) as ActiveTrackContextType

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 56,
  })

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

  const [filteredData, setFilteredData] = useState(filterResults(""))
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    updateActiveTrack({
      id: "",
      version: versionDefault,
    })
    if (window.player) {
      window.player.destroy()
    }
  }, [typeof window !== "undefined" ? window : null])

  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    const inputValue: string = (e.target as HTMLInputElement).value
    setSearchValue(inputValue)
    setFilteredData(filterResults(inputValue))
  }

  const SearchInput = (
    <input
      tw="w-full lg:w-2/3 xl:w-1/2 py-3 pl-3"
      type="text"
      onChange={handleSearch}
      placeholder={`Search ${title ? title.toLowerCase() + " " : ""}tracks (moods, energy, or title)`}
    />
  )

  const rowRenderer = ({ key, index, style, parent }) => {
    const track = filteredData[index]
    return (
      <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={index} columnIndex={0}>
        {({ measure, registerChild }) => (
          <div ref={registerChild} tw="border-gray-200 border-0 border-b border-solid text-sm" style={style}>
            <div
              tw="flex flex-wrap w-full h-16 items-center"
              className={`track-row ${activeTrack.id == track.id ? "hide" : ""}`}
            >
              <div tw="w-full md:w-3/8 text-lg font-bold" />
              <div tw="hidden md:block w-2/8" className="category-link">
                <PageLink to={`/library/energy/${track.energy?.slug}`}>{track.energy?.name}</PageLink>
              </div>
              <div tw="hidden md:block w-3/8">
                {track.moods?.map((mood: CategoryShape, index: number) => (
                  <span key={mood.id} className="category-link">
                    <PageLink to={`/library/mood/${mood.slug}`}>{mood.name}</PageLink>
                    {index < track.moods.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
            <div tw="w-full">
              <TrackDetails track={track} />
            </div>
          </div>
        )}
      </CellMeasurer>
    )
  }

  return (
    <StyledTracksTable>
      <>{SearchInput}</>
      {!searchValue && placeholder ? (
        <div className="table-placeholder" tw="mt-12 overflow-y-scroll overflow-x-hidden">
          {placeholder}
        </div>
      ) : (
        <div className="tracks-table">
          <div className="table-headings">
            <div tw="text-xs font-bold pt-9 uppercase tracking-widest pb-4 border-gray-200 border-0 border-b border-solid flex">
              <div tw="w-full md:w-3/8">Title</div>
              <div tw="hidden md:block w-2/8">Energy</div>
              <div tw="hidden md:block w-3/8">Moods</div>
            </div>
          </div>
          <div className="table-rows" tw="overflow-y-scroll overflow-x-hidden">
            <AutoSizer>
              {({height, width}) => (
                <List
                  height={height}
                  rowCount={filteredData.length}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                  overscanRowCount={10}
                  width={width}
                />
              )}
            </AutoSizer>
          </div>
        </div>
      )}
    </StyledTracksTable>
  )
}

let rowWidthQueries = ""
let i = 0
mQw.forEach((value: string, key: string) => {
  if (i > 2) {
    const outerSpace = `(100vw - ${sizes.get(key)}) / 2`
    const gutterKey = Object.keys(gutters)[i]
    const gutterValue = parseInt((gutters as any)[gutterKey].replace("px", "")) + "px"
    rowWidthQueries = rowWidthQueries.concat(
      `
      @media (${value}) { 
        padding-right: calc(${outerSpace} + ${gutterValue})
      }`
    )
  }
  i += 1
})

const StyledTracksTable = styled.div`
  .table-headings,
  .table-rows,
  .table-placeholder {
    ${rowWidthQueries}
  }
  .table-placeholder,
  .table-rows {
    height: calc(100vh - 280px);
  }
  .track-row.hide {
    display: none;
  }
  .ReactVirtualized__Grid {
    outline: none;
  }
  input {
    transition: border 0.3s ease-in-out;
    background: transparent;
    border: 1px solid #666;
    border-radius: 4px;
    outline: none;
    ${tw`text-muted px-4`}
    &:focus {
      border-color: #fff;
    }
  }
  .category-link {
    ${tw`text-gray-400`}
    a {
      border-bottom: 1px solid;
      ${tw`border-gray-400 text-gray-400`}
      &:hover {
        ${tw`border-gray-200 text-white`}
      }
    }
  }
`

export default TracksTable
