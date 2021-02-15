import React, { useEffect, useState, SyntheticEvent } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
// import PageLink from "./PageLink"
//import Container, { Col } from "./Container"

type Props = {
  className?: string
}

const LogoWordmark: React.FC<Props> = ({ className }) => {
  const [ready, setReady] = useState(false)
  const audio: { [key: string]: any } = {}
  const letters = ["s1", "a", "n", "c", "t", "u", "s2"]

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)()

    const loadedAudio = (id: string, obj: AudioBufferSourceNode, gain: AudioParam) => {
      audio[id] = { obj: obj, gain: gain }
      if (Object.keys(audio).length == letters.length) {
        setReady(true)
        for (const letter of letters) {
          audio[letter].obj.start(0)
        }
      }
    }

    for (const letter of letters) {
      const fileSrc = `audio/${letter}.mp3`
      const source = context.createBufferSource()
      const gainNode = context.createGain()
      const request = new XMLHttpRequest()
      source.connect(gainNode)
      gainNode.connect(context.destination)
      request.open("GET", fileSrc, true)
      request.responseType = "arraybuffer"
      request.onload = () => {
        context.decodeAudioData(
          request.response,
          response => {
            source.buffer = response
            source.loop = true
            gainNode.gain.value = 0
            loadedAudio(letter, source, gainNode.gain)
          },
          () => {
            console.error("The request failed.")
          }
        )
      }
      request.send()
    }
  })

  const setSvgStatus = () => {
    const isPlaying = document.getElementsByClassName("letter-active").length > 0 ? true : false
    const svg = document.getElementById("logo-wordmark") || null
    if (svg) {
      if (isPlaying) {
        svg.setAttribute("class", "is-playing")
      } else {
        svg.setAttribute("class", "")
      }
    }
  }

  const toggleMute = (event: SyntheticEvent<SVGElement, MouseEvent>) => {
    const parent = (event.target as HTMLElement).parentElement
    const target = (parent == event.target ? event.target : parent) as HTMLElement
    const letter = target.id
    if (target.getAttribute("class") == "letter-active") {
      target.setAttribute("class", "")
      let vol = 1
      const fade = setInterval(() => {
        if (vol > 0) {
          vol -= 0.05
          audio[letter].gain.value = vol
        } else {
          clearInterval(fade)
        }
      }, 50)
    } else {
      target.setAttribute("class", "letter-active")
      let vol = 0
      const fade = setInterval(() => {
        if (vol < 1) {
          vol += 0.05
          audio[letter].gain.value = vol
        } else {
          clearInterval(fade)
        }
      }, 50)
    }
    setSvgStatus()
  }

  const muteAll = () => {
    Array.from(document.getElementsByClassName("letter-active")).forEach(element => {
      element.setAttribute("class", "")
      setSvgStatus()
      const letter = element.id
      const fade = setInterval(() => {
        if (audio[letter].gain.value > 0) {
          audio[letter].gain.value -= 0.05
        } else {
          clearInterval(fade)
        }
      }, 50)
    })
  }

  return (
    <StyledLogo className={`${className} ${ready ? "ready" : ""}`}>
      <svg
        id="logo-wordmark"
        width="161"
        height="48"
        viewBox="0 0 161 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="x" onClick={muteAll}>
          <rect opacity="0" x="140" y="17" width="21" height="24" fill="white" />
          <path
            d="M157.8 24.6L155.2 22L150.4 26.8L145.6 22L143 24.6L147.8 29.4L143 34.2L145.6 36.8L150.4 32L155.2 36.8L157.8 34.2L153 29.4L157.8 24.6Z"
            fill="white"
          />
        </g>
        <g id="s1" onClick={toggleMute}>
          <rect opacity="0" y="9" width="21" height="32" fill="#FFCC3E" />
          <path
            d="M14.1442 24.6156L5.87872 23.1419C4.94966 22.9817 4.27689 22.1808 4.27689 21.2357C4.27689 20.1625 5.14188 19.2975 6.2151 19.2975H11.5011C13.2792 19.2975 14.7048 20.7391 14.7048 22.5011H18.9817C18.9817 18.3684 15.6178 15.0046 11.4851 15.0046H6.19909C2.78719 15.0206 0 17.8078 0 21.2357C0 24.2471 2.16247 26.8261 5.12586 27.3547L13.3913 28.8284C14.3204 28.9886 14.9931 29.7895 14.9931 30.7346C14.9931 31.8078 14.1281 32.6728 13.0549 32.6728H7.76888C5.99085 32.6728 4.56522 31.2311 4.56522 29.4691H0.272311C0.272311 33.6018 3.63616 36.9657 7.76888 36.9657H13.0549C16.4828 36.9657 19.27 34.1785 19.27 30.7506C19.254 27.7231 17.1076 25.1442 14.1442 24.6156Z"
            fill="#FFCC3E"
          />
        </g>
        <g id="a" onClick={toggleMute}>
          <rect opacity="0" x="21" y="9" width="21" height="32" fill="#BDAC94" />
          <path
            d="M34.4714 15.0206H29.1854C25.0526 15.0206 21.6888 18.3844 21.6888 22.5172H25.9657C25.9657 20.7391 27.4073 19.3135 29.1693 19.3135H34.4554C35.5286 19.3135 36.3936 20.1785 36.3936 21.2517V22.8536L26.3821 24.6476C23.5149 25.1602 21.4165 27.659 21.4165 30.5744C21.4165 32.3684 22.1693 34.0824 23.4989 35.2838C24.6842 36.357 26.222 36.9497 27.8078 36.9497C28 36.9497 28.1762 36.9336 28.3684 36.9176L36.3936 36.1968V36.6774H40.6865V21.2357C40.6865 17.8078 37.8993 15.0206 34.4714 15.0206ZM36.4096 31.9039L28 32.6568C27.4073 32.7048 26.8307 32.5126 26.3982 32.1121C25.9497 31.7117 25.7094 31.151 25.7094 30.5584C25.7094 29.7094 26.3181 28.9886 27.151 28.8444L36.4256 27.1945V31.9039H36.4096Z"
            fill="#BDAC94"
          />
        </g>
        <g id="n" onClick={toggleMute}>
          <rect opacity="0" x="42" y="9" width="22" height="32" fill="#689CB2" />
          <path
            d="M55.2952 15.0206H51.0183C46.8856 15.0206 43.5217 18.3844 43.5217 22.5172V36.6934H47.7986V22.5011C47.7986 20.7231 49.2403 19.2975 51.0023 19.2975H55.2792C57.0572 19.2975 58.4828 20.7391 58.4828 22.5011V36.6773H62.7597V22.5011C62.7757 18.3684 59.4119 15.0206 55.2952 15.0206Z"
            fill="#689CB2"
          />
        </g>
        <g id="c" onClick={toggleMute}>
          <rect opacity="0" x="64" y="9" width="21" height="32" fill="#B168B2" />
          <path
            d="M72.7071 19.2975H76.984C78.762 19.2975 80.1876 20.7391 80.1876 22.5011H84.4645C84.4645 18.3684 81.1007 15.0046 76.968 15.0046H72.6911C68.5584 15.0046 65.1945 18.3684 65.1945 22.5011V29.4531C65.1945 33.5858 68.5584 36.9497 72.6911 36.9497H76.968C81.1007 36.9497 84.4645 33.5858 84.4645 29.4531H80.1876C80.1876 31.2311 78.746 32.6568 76.984 32.6568H72.7071C70.9291 32.6568 69.5034 31.2151 69.5034 29.4531V22.5011C69.5034 20.7391 70.9451 19.2975 72.7071 19.2975Z"
            fill="#B168B2"
          />
        </g>
        <g id="t" onClick={toggleMute}>
          <rect opacity="0" x="85" y="9" width="14" height="32" fill="#B7B7B7" />
          <path
            d="M87.508 29.4531C87.508 33.5858 90.8719 36.9497 95.0046 36.9497H96.0778V32.6728H94.9886C93.2105 32.6728 91.7849 31.2311 91.7849 29.4691V19.5538H96.0618V15.2769H91.7849V11H87.508V29.4531Z"
            fill="#B7B7B7"
          />
        </g>
        <g id="u" onClick={toggleMute}>
          <rect opacity="0" x="99" y="9" width="20" height="32" fill="#FFCC3E" />
          <path
            d="M113.922 29.4531C113.922 31.2311 112.481 32.6568 110.719 32.6568H106.442C104.664 32.6568 103.238 31.2151 103.238 29.4531V15.2769H98.9611V29.4531C98.9611 33.5858 102.325 36.9497 106.458 36.9497H110.735C114.867 36.9497 118.231 33.5858 118.231 29.4531V15.2769H113.954V29.4531H113.922Z"
            fill="#FFCC3E"
          />
        </g>
        <g id="s2" onClick={toggleMute}>
          <rect opacity="0" x="119" y="9" width="21" height="32" fill="#BDAC94" />
          <path
            d="M134.778 24.6156L126.513 23.1419C125.584 22.9817 124.911 22.1808 124.911 21.2357C124.911 20.1625 125.776 19.2975 126.849 19.2975H132.135C133.913 19.2975 135.339 20.7391 135.339 22.5011H139.616C139.616 18.3684 136.252 15.0046 132.119 15.0046H126.833C123.405 15.0046 120.618 17.7918 120.618 21.2197C120.618 24.2311 122.78 26.8101 125.744 27.3387L134.009 28.8124C134.938 28.9725 135.611 29.7735 135.611 30.7185C135.611 31.7918 134.746 32.6568 133.673 32.6568H128.387C126.609 32.6568 125.183 31.2151 125.183 29.4531H120.906C120.906 33.5858 124.27 36.9497 128.403 36.9497H133.689C137.117 36.9497 139.904 34.1625 139.904 30.7346C139.904 27.7231 137.741 25.1442 134.778 24.6156Z"
            fill="#BDAC94"
          />
        </g>
      </svg>

      <h2 tw="text-base -mt-2 text-muted">A sound and music design studio</h2>
    </StyledLogo>
  )
}

const StyledLogo = styled.div`
  ${tw``}
  opacity: 0;
  &.ready {
    opacity: 1;
  }
  g,
  path,
  rect {
    transition: all 0.1s ease-in-out;
  }
  g#x {
    transform: translateX(-20px);
    opacity: 0;
    path {
      opacity: 0.1;
    }
  }
  .is-playing g#x {
    transform: translateX(0);
    opacity: 1;
    &:hover {
      cursor: pointer;
      path {
        opacity: 0.5;
      }
    }
  }
  g:not(.letter-active):not(#x) path {
    fill: white;
  }
  g:not(#x):hover {
    cursor: pointer;
    rect {
      opacity: 0.3;
    }
  }
`
export default LogoWordmark
