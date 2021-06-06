import React, { useContext, useEffect, useState } from "react"
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
}

const InlinePlayer: React.FC<Props> = ({ track }) => {
  const { activeTrack, updateActiveTrack } = useContext(ActiveTrackContext) as ActiveTrackContextType

  const play = () => {
    document.body.className = ""
    window.muteAll()
    updateActiveTrack({
      id: track.id,
      version: {
        id: track.id,
        title: track.title,
        length: "",
        url: track.url,
        moods: [],
        energy: {
          name: "",
          id: "",
          slug: "",
        },
        priority: 0,
      },
    })
  }

  return (
    <StyledInlinePlayer color={colors["white"]} id={track.id}>
      {activeTrack.id == track.id ? (
        <div tw="py-5" id={`c-${track.id}`}>
          <div className="track-versions" tw="lg:flex justify-between items-center">
            <h4 tw="text-base pb-4 lg:mb-0 lg:text-xl mb-0 font-bold">{track.title}</h4>
          </div>
          <TrackPlayer
            className="track-player"
            pause={false}
            track={{ id: activeTrack.version.id, url: activeTrack.version.url }}
          />
        </div>
      ) : (
        <div onClick={play} className="launcher" tw="text-xl font-bold top-0 absolute flex items-center">
          {!isMobile && <Play tw="mr-2" />}
          {track.title}
        </div>
      )}
    </StyledInlinePlayer>
  )
}

export default InlinePlayer

const loading = keyframes`
  from { background-position: 0 0; }
  to   { background-position: 60px 30px; }
`

const StyledInlinePlayer = styled.div<{ color: string; id: string }>`
  ${tw`relative my-16 min-h-16`}
  #c-${props => props.id} {
    border-top: solid 1px ${props => props.color};
    border-bottom: solid 1px ${props => props.color};
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
    bottom: 100%;
    height: 64px;
    width: 100%;
    border-top: solid 1px ${props => props.color};
    border-bottom: solid 1px ${props => props.color};
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
