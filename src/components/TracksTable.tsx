/** @jsx jsx */ import { jsx } from "@emotion/react"
import React, { useMemo, useState, SyntheticEvent } from "react"
import { Column, Table } from "react-virtualized"
import withLocation from "../utils/withLocation"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { matchSorter } from "match-sorter"

import highlightSearch from "../utils/highlightSearch"

interface Props {
  data: []
  navigate: Function
  search: {
    s: string
  }
  genre: {
    name: string
  }
  placeholder: {}
  heading: {}
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

  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    const inputValue: string = (e.target as HTMLInputElement).value
    setSearchValue(inputValue)
    setFilteredData(filterResults(inputValue))
    navigate(`?s=${inputValue}`)
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

  return (
    <StyledTracksTable tw="w-full -ml-3">
      <div tw="xs:flex justify-between items-center">
        <h2 tw="hidden xs:inline mb-0 ml-3 leading-none">
          <strong>{genre ? genre.name : "All Tracks"}</strong>
        </h2>
        {SearchInput}
      </div>
      {!searchValue && placeholder ? (
        <>{placeholder}</>
      ) : (
        <div>
          {!searchValue && heading && <>{heading}</>}
          <div className="parts-table" tw="mt-8">
            <Table
              width={900}
              height={20000}
              headerHeight={30}
              rowHeight={50}
              rowCount={filteredData.length}
              rowGetter={({ index }) => filteredData[index]}
            >
              <Column
                dataKey="search"
                width={900}
                cellRenderer={({ cellData }) => (
                  <div className="row">
                    <div className="search-string" dangerouslySetInnerHTML={{ __html: cellData }} />
                  </div>
                )}
              />
            </Table>
          </div>
        </div>
      )}
    </StyledTracksTable>
  )
}

const StyledTracksTable = styled.div`
  .ReactVirtualized__Grid {
    outline: none;
    height: auto !important;
    overflow: visible !important;
  }
  .ReactVirtualized__Grid__innerScrollContainer {
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }
  .ReactVirtualized__Table__row {
    position: relative !important;
    top: auto !important;
    height: auto !important;
  }
`

export default withLocation(TracksTable)
