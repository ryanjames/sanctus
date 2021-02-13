import React, { useContext } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { TrackShape } from "../models/tracks"
import Select, { ValueType } from "react-select"
import hex2rgba from "hex2rgba"
import Download from "../graphics/download.svg"
import Share from "../graphics/share.svg"
import { isMobile } from "react-device-detect"
import colors from "../config/colors"
import { SharedTrackContext, SharedTrackContextType } from "../contexts/SharedTrackContext"

type Props = {
  className?: string
  track: TrackShape
  handleChangeVersion: (id: string) => void
  version: TrackShape
  isShared: boolean
}

type Version = ValueType<{ value: string; label: string }, false>

const TrackVersions: React.FC<Props> = ({ className, track, handleChangeVersion, version, isShared }) => {
  const { updateSharedTrack } = useContext(SharedTrackContext) as SharedTrackContextType

  const parentTrack = [{ value: track.id, label: track.title }]
  const childTracks = track.children?.map(child => {
    return { value: child.id, label: child.title }
  })

  const tracks = parentTrack.concat(childTracks || [])

  const handleChange = (event: Version) => {
    handleChangeVersion(event?.value || "")
  }

  const handleShared = () => {
    updateSharedTrack(track)
  }

  const download = version.url.replace("raw=1", "dl=1").replace("dl.dropboxusercontent", "www.dropbox")
  return (
    <StyledTrackVersions tw="flex" color={hex2rgba(colors["hippie-blue"], 0.2)} className={`container ${className}`}>
      {tracks.length > 1 && (
        <Select
          styles={selectStyles}
          tw="flex-1"
          className="version-select"
          isSearchable={false}
          classNamePrefix="version-select"
          colors
          onChange={event => handleChange(event)}
          value={{ value: version.id, label: version.title }}
          options={tracks}
        />
      )}
      <a href={``}>License</a>
      {!isMobile && (
        <a href={download}>
          {" "}
          <Download />
        </a>
      )}
      {!isShared && (
        <a onClick={handleShared}>
          {" "}
          <Share />{" "}
        </a>
      )}
    </StyledTrackVersions>
  )
}

const selectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#ffffff",
    color: state.isSelected ? colors["hippie-blue"] : "#111111",
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
  ${tw`flex z-10 relative mr-1 bg-gray-200 p-2 lg:w-5/8 rounded-md`}
  .css-1okebmr-indicatorSeparator {
    display: none;
  }
  .version-select__option:hover {
    background: ${props => props.color};
  }
  .version-select {
    &:hover {
      cursor: pointer;
    }
  }
  a {
    background-color: #fff;
    display: block;
    min-height: 36px;
    ${tw`flex items-center px-3 rounded-md cursor-pointer`}
    ${tw`ml-2`}
  }
`
export default TrackVersions
