import React, { useContext, useEffect } from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import colors from "../config/colors"
import { isMobile } from "react-device-detect"
import tw from "twin.macro"
import TrackPlayer from "./TrackPlayer"
import Play from "../graphics/play.svg"
import { TrackShape } from "../models/tracks"
import { ActiveTrackContext, ActiveTrackContextType } from "../contexts/ActiveTrackContext"

interface Props {
  track: TrackShape
  open?: boolean
}

const TrackDetails: React.FC<Props> = ({ track, open }) => {
  const { activeTrack, updateActiveTrack } = useContext(ActiveTrackContext) as ActiveTrackContextType
  const versions = () => {
    if (track.children && track.children.length) {
      const count = track.children.length + 1
      return <span>({count} versions)</span>
    }
  }

  const handleExpand = () => {
    document.body.className = ""
    updateActiveTrack({
      id: track.id,
      version: track,
    })
  }

  useEffect(() => {
    if (open) {
      handleExpand()
    }
  }, [open])

  const handleChangeVersion = (id?: string) => {
    const child = track.children?.find(child => child.id === id)
    updateActiveTrack({
      id: track.id,
      version: child ? child : track,
    })
  }

  return (
    <StyledTrackDetails color={colors["hippie-blue"]} id={track.id}>
      {activeTrack.id == track.id ? (
        <div tw="py-5" id={`c-${track.id}`}>
          <div className="track-versions" tw="lg:flex justify-between items-center">
            <h4 tw="text-base pb-4 lg:mb-0 lg:text-xl mb-0 font-bold">{track.title}</h4>
          </div>
          <TrackPlayer
            className="track-player"
            pause={open ? true : false}
            track={{ id: activeTrack.version.id, url: activeTrack.version.url }}
          />
        </div>
      ) : (
        <div onClick={handleExpand} className="launcher" tw="text-base font-bold absolute flex items-center">
          {!isMobile && <Play tw="mr-2" />}
          {track.title} {versions()}
        </div>
      )}
    </StyledTrackDetails>
  )
}

export default TrackDetails

const loading = keyframes`
  from { background-position: 0 0; }
  to   { background-position: 60px 30px; }
`

const StyledTrackDetails = styled.div<{ color: string; id: string }>`
  ${tw`relative`}
  #c-${props => props.id} {
    border-top: solid 2px ${props => props.color};
    border-bottom: solid 2px ${props => props.color};
    .track-player {
      background-size: 30px 30px;
      background-image: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.05) 25%,
        transparent 25%,
        transparent 50%,
        rgba(0, 0, 0, 0.05) 50%,
        rgba(0, 0, 0, 0.05) 75%,
        transparent 75%,
        transparent
      );
      animation: ${loading} 0.5s linear infinite;
      .player-loaded & {
        background-image: none;
      }
    }
  }
  .launcher {
    top: -56px;
    bottom: 100%;
    svg {
      width: 18px;
      height: 18px;
      path {
        fill: ${props => props.color};
      }
    }
    &:hover {
      cursor: pointer;
    }
    span {
      ${tw`text-gray-400 ml-2 font-normal text-sm`}
    }
  }
`
