import React, { useContext, useEffect, useState } from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import colors from "../config/colors"
import { isMobile } from "react-device-detect"
import tw from "twin.macro"
import TrackPlayer from "./TrackPlayer"
import Modal from "./Modal"
import Play from "../graphics/play.svg"
import { TrackShape } from "../models/tracks"
import siteContent from "../staticQueries/siteContent"
import { ActiveTrackContext, ActiveTrackContextType } from "../contexts/ActiveTrackContext"

interface Props {
  track: TrackShape
  open?: boolean
}

const handleMuteAll = () => {
  if (typeof window !== "undefined") {
    window.muteAll()
  }
}

const TrackDetails: React.FC<Props> = ({ track, open }) => {
  const { activeTrack, updateActiveTrack } = useContext(ActiveTrackContext) as ActiveTrackContextType
  const [modal, setModal] = useState("")
  const [licenseSubmitted, setLicenseSubmitted] = useState(false)

  const handleExpand = () => {
    document.body.className = ""
    handleMuteAll()
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

  const closeModal = () => {
    setModal("")
  }

  const handleLicensingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const licenseForm = document.getElementById("licenseForm") as HTMLFormElement
    const formData = new FormData(licenseForm) as URLSearchParams
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setLicenseSubmitted(true))
      .catch(error => alert(error))
  }
  const content = siteContent()

  const License: React.FC<Props> = ({ track }) => {
    return (
      <div tw="w-56 sm:w-96">
        <h2 tw="text-lg pr-12">{track.title}</h2>
        <label tw="text-xs font-bold pt-9 uppercase tracking-widest mb-4">Licensing</label>
        <p>{content.licensingIntro}</p>
        {!licenseSubmitted ? (
          <form id="licenseForm" name="licensing" method="POST" data-netlify="true" onSubmit={handleLicensingSubmit}>
            <input
              required
              tw="text-sm bg-transparent border border-solid p-3 text-white w-full border-gray-600 rounded mb-4"
              placeholder="Name"
              type="text"
              name="name"
            />
            <input
              required
              tw="text-sm bg-transparent border border-solid p-3 text-white w-full border-gray-600 rounded mb-4"
              placeholder="Email"
              type="email"
              name="email"
            />
            <input type="hidden" name="track" value={track.title} />
            <button tw="text-white border-0 text-sm rounded bg-gray-700 py-2 px-6 mr-3 cursor-pointer" type="submit">
              Send
            </button>
          </form>
        ) : (
          <div tw="p-4 bg-gray-900 rounded">
            Thank you for your inquiry. We&apos;ll get back to you as soon as we can.
          </div>
        )}
      </div>
    )
  }

  const Download: React.FC<Props> = ({ track }) => {
    const download = track.url.replace("raw=1", "dl=1").replace("dl.dropboxusercontent", "www.dropbox")
    return (
      <div tw="w-96">
        <h2 tw="text-lg pr-12">{track.title}</h2>
        <label tw="text-xs font-bold pt-9 uppercase tracking-widest mb-4">Download Sample</label>
        <p>{content.downloadSampleIntro}</p>
        <a href={download} className="modal-button" tw="mt-5 inline-block">
          Download Sample
        </a>
      </div>
    )
  }

  return (
    <StyledTrackDetails color={colors["white"]} id={track.id}>
      {activeTrack.id == track.id ? (
        <div tw="py-5" id={`c-${track.id}`}>
          <div className="track-versions" tw="lg:flex justify-between items-center">
            <h4 tw="text-base pb-4 lg:mb-0 lg:text-xl mb-0 font-bold">{track.title}</h4>
            <div className="track-actions" tw="flex">
              <div onClick={() => setModal("license")}>License</div>
              <div onClick={() => setModal("download")}>Download Sample</div>
              {modal == "download" && (
                <Modal close={closeModal}>
                  <Download track={track} />
                </Modal>
              )}
              {modal == "license" && (
                <Modal close={closeModal}>
                  <License track={track} />
                </Modal>
              )}
            </div>
          </div>
          <TrackPlayer
            className="track-player"
            pause={open ? true : false}
            track={{ id: activeTrack.version.id, url: activeTrack.version.url }}
          />
        </div>
      ) : (
        <div onClick={handleExpand} className="launcher" tw="text-sm absolute flex items-center">
          {!isMobile && <Play tw="mr-2" />}
          {track.title}
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
  .track-actions {
    ${tw`-mt-2`}
  }
  .track-actions > div {
    transition: all 0.2s ease-in-out;
    ${tw`rounded bg-gray-700 py-2 px-3 mr-3`}
    &:hover {
      cursor: pointer;
      ${tw`bg-gray-500`}
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
