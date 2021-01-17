import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { TrackShape } from "../models/tracks"
import Select, { ValueType } from "react-select"
import hex2rgba from "hex2rgba"
import colors from "../config/colors"
// import PageLink from "./PageLink"
//import Container, { Col } from "./Container"

type Props = {
  className?: string
  track: TrackShape
  handleChangeVersion: (id: string) => void
  version: TrackShape
}

type Version = ValueType<{ value: string; label: string }, false>

const TrackVersions: React.FC<Props> = ({ className, track, handleChangeVersion, version }) => {
  const parentTrack = [{ value: track.id, label: track.title }]
  const childTracks = track.children?.map(child => {
    return { value: child.id, label: child.title }
  })

  const tracks = parentTrack.concat(childTracks || [])

  const handleChange = (event: Version) => {
    handleChangeVersion(event?.value || "")
  }
  const download = version.url.replace("raw=1", "dl=1").replace("dl.dropboxusercontent", "www.dropbox")
  return (
    <StyledTrackVersions color={hex2rgba(colors["dk-green"], 0.2)} className={`container ${className}`}>
      {tracks.length > 1 && (
        <Select
          styles={selectStyles}
          className="version-select"
          isSearchable={false}
          classNamePrefix="version-select"
          colors
          onChange={event => handleChange(event)}
          value={{ value: version.id, label: version.title }}
          options={tracks}
        />
      )}
      <a href={`mailto:dancoke@gmail.com?subject=License for '${version.title}' track`}>License</a>
      <a href={download}>Download</a>
    </StyledTrackVersions>
  )
}

const selectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#ffffff",
    color: state.isSelected ? colors["dk-green"] : "#111111",
    fontWeight: state.isSelected ? 600 : 400,
    cursor: "pointer",
  }),
  control: (base: any) => ({
    ...base,
    "&:hover": {
      borderColor: "gray",
      cursor: "pointer",
    },
    border: "0px solid transparent",
    boxShadow: "none",
  }),
}
const StyledTrackVersions = styled.div<{ color: string }>`
  ${tw`flex z-10 relative mr-1 bg-gray-200 p-2 rounded-md`}
  .css-1okebmr-indicatorSeparator {
    display: none;
  }
  .version-select__option:hover {
    background: ${props => props.color};
  }
  .version-select {
    width: 240px;
    ${tw`mr-2`}
    &:hover {
      cursor: pointer;
    }
  }
  a {
    background-color: #fff;
    display: block;
    min-height: 36px;
    ${tw`flex items-center px-3 rounded-md`}
    &:last-child {
      ${tw`ml-2`}
    }
  }
`
export default TrackVersions
