import React, { useState } from "react"
import styled from "@emotion/styled"
import { CopyToClipboard } from "react-copy-to-clipboard"
import colors from "../config/colors"
import tw from "twin.macro"
import withLocation from "../utils/withLocation"
import Close from "../graphics/close.svg"
import Logo from "../graphics/logo.svg"
import { TrackShape } from "../models/tracks"
import Composer from "../graphics/composer.svg"
import TrackDetails from "../components/TrackDetails"
import PageLink from "../components/PageLink"
import ActiveTrackProvider from "../contexts/ActiveTrackContext"
import SharedTrackProvider from "../contexts/SharedTrackContext"

type Props = {
  className?: string
  track: TrackShape
  navigate: Function
  location: {
    origin: string
  }
}

const TrackSheet: React.FC<Props> = ({ className, track, navigate, location }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleClose = () => {
    navigate(`${location.origin}/library/`)
  }

  return (
    <StyledTrackSheet className={`container ${className}`}>
      <div tw="flex justify-center items-center absolute inset-0 bg-white sm:bg-opacity-90 z-40 pt-12">
        <div tw="bg-white px-6 md:px-16 pb-16 pt-12 max-w-2xl relative w-full sm:shadow-md sm:border border-gray-200 sm:border-solid">
          <PageLink tw="flex flex-col mb-12 sm:items-center" to="/">
            <Logo className="logo" tw="mb-2" />
            <Composer className="composer" />
          </PageLink>
          <SharedTrackProvider>
            <ActiveTrackProvider>
              <TrackDetails open track={track} />
            </ActiveTrackProvider>
          </SharedTrackProvider>
          <small tw="block pt-6 flex justify-between w-full">
            <span>Share link</span>
            {isCopied ? <span style={{ color: colors["dk-green"] }}>Copied</span> : null}
          </small>
          <CopyToClipboard
            tw="border border-gray-200 py-1 px-2 border-solid rounded block truncate"
            text={`${location.origin}/library/?track=${track.id}`}
            onCopy={() => setIsCopied(true)}
          >
            <span>
              {location.origin}/library/?track={track.id}
            </span>
          </CopyToClipboard>
          <Close onClick={handleClose} tw="cursor-pointer absolute right-6 md:right-16 top-12" />
        </div>
      </div>
    </StyledTrackSheet>
  )
}

const StyledTrackSheet = styled.div`
  ${tw``}
  .track-versions {
    display: block;
  }
  .logo {
    width: 95px;
    height: auto;
  }
  .composer {
    width: 70px;
    height: auto;
  }
`
export default withLocation(TrackSheet)
