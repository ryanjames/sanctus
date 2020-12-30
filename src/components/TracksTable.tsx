import React, { useMemo, useState } from "react"
//import Downshift from 'downshift'
import { Column, Table, AutoSizer } from "react-virtualized"
import "react-virtualized/styles.css"
import withLocation from "../utils/withLocation"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PropTypes from "prop-types"
import { matchSorter } from 'match-sorter'

import highlightSearch from "../utils/highlightSearch"

const TracksTableComponent = ({ data, category, className, navigate, search, placeholder, heading }) => {
  const memoizedData = useMemo(() => data)

  const searchFields = ["query"]

  const filterResults = inputValue => {
    const query = inputValue
    const filteredData = matchSorter(memoizedData, inputValue, {
      keys: searchFields,
    })
    const keys = searchFields
    return !inputValue && memoizedData ? memoizedData : highlightSearch(query, filteredData, keys)
  }

  const [filteredData, setFilteredData] = useState(filterResults(search.s))
  const [searchValue, setSearchValue] = useState(search.s || "")

  const handleSearch = e => {
    const inputValue = e.target.value
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
      placeholder={`Search ${category ? category.name : "All Parts"}`}
    />
  )

  return (
    <div className={className} tw="w-full overflow-hidden -ml-3">
      <div tw="xs:flex justify-between items-center">
        <h2 tw="hidden xs:inline mb-0 ml-3 leading-none">
          <strong>{category ? category.name : "All Parts"}</strong>
        </h2>
        {SearchInput}
      </div>
      {!searchValue && placeholder ? (
        <>{placeholder}</>
      ) : (
        <div tw="overflow-scroll w-full">
          {!searchValue && heading && <>{heading}</>}
          <div className="parts-table" tw="mt-8">
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={30}
                  rowHeight={50}
                  rowCount={filteredData.length}
                  rowGetter={({ index }) => filteredData[index]}
                >
                  <Column
                    label="Part"
                    dataKey="query"
                    width={500}
                    cellRenderer={({ cellData }) => (
                      <div className="row" dangerouslySetInnerHTML={{ __html: cellData }} />
                    )}
                  />
                  <Column width={150} label="Variation" dataKey="variation" />
                  <Column width={120} label="Equivalents" dataKey="eq1" />
                  <Column width={100} label="" dataKey="eq2" />
                  <Column width={100} label="" dataKey="eq3" />
                </Table>
              )}
            </AutoSizer>
          </div>
        </div>
      )}
    </div>
  )
}

TracksTableComponent.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  category: PropTypes.object,
  placeholder: PropTypes.object,
  heading: PropTypes.object,
}

const TracksTable = styled(TracksTableComponent)`
  .parts-table {
    ${tw`mb-12`}
    height: 50vh;
    width: 1100px;
  }
  .ReactVirtualized__Grid {
    outline: none;
  }
  .ReactVirtualized__Table__headerRow {
    ${tw`border-0 border-b border-solid border-gray-400 py-4`}
    font-size: 0.7rem;
    letter-spacing: 0.1rem;
  }
  .ReactVirtualized__Table__row {
    ${tw`border-0 border-b border-solid border-gray-400 py-4 text-xs`}
    span {
      ${tw`font-bold px-1 rounded bg-techna-blue bg-opacity-20`}
      font-weight: 700;
    }
    small {
      ${tw`block font-normal tracking-normal capitalize`}
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.7rem;
      margin-right: 20px;
    }
  }
`

export default withLocation(TracksTable)
