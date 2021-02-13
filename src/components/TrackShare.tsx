import React, { useState, useContext } from "react"
import styled from "@emotion/styled"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { SharedTrackContext, SharedTrackContextType } from "../contexts/SharedTrackContext"
import { versionDefault } from "../contexts/ActiveTrackContext"
import colors from "../config/colors"
import tw from "twin.macro"
import withLocation from "../utils/withLocation"
import Close from "../graphics/close.svg"
import Logo from "../graphics/logo.svg"
import Composer from "../graphics/composer.svg"
import TrackDetails from "../components/TrackDetails"
import PageLink from "../components/PageLink"
import TrackPlayer from "./TrackPlayer"

type Props = {
  className?: string
  location: {
    origin: string
  }
}

const TrackShare: React.FC<Props> = ({ className, location }) => {
  const [isCopied, setIsCopied] = useState(false)
  const { sharedTrack, updateSharedTrack } = useContext(SharedTrackContext) as SharedTrackContextType

  const handleClose = () => {
    updateSharedTrack(versionDefault)
  }

  if (sharedTrack.id) {
    return (
      <StyledTrackShare className={`container ${className}`}>
        <div tw="flex justify-center items-center absolute inset-0 bg-white sm:bg-opacity-90 z-40 pt-12">
          <div tw="bg-white px-6 md:px-16 pb-16 pt-12 max-w-2xl relative w-full sm:shadow-md sm:border border-gray-200 sm:border-solid">
            <h2>{sharedTrack.title}</h2>
            <small tw="block pt-6 flex justify-between w-full">
              <span>Share link</span>
              {isCopied ? <span style={{ color: colors["hippie-blue"] }}>Copied</span> : null}
            </small>
            <CopyToClipboard
              tw="border border-gray-200 py-1 px-2 border-solid rounded block truncate"
              text={`${location.origin}/library/?track=${sharedTrack.id}`}
              onCopy={() => setIsCopied(true)}
            >
              <span>
                {location.origin}/library/?track={sharedTrack.id}
              </span>
            </CopyToClipboard>
            <Close onClick={handleClose} tw="cursor-pointer absolute right-6 md:right-16 top-12" />
          </div>
        </div>
      </StyledTrackShare>
    )
  } else {
    return <></>
  }
}

const StyledTrackShare = styled.div`
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
export default withLocation(TrackShare)
