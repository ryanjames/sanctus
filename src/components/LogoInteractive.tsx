import React, { useEffect, useState, SyntheticEvent } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import PageLink from "./PageLink"

type Props = {
  className?: string
}

const setSvgStatus = () => {
  const isPlaying = document.getElementsByClassName("letter-active").length > 0 ? true : false
  const svg = document.getElementById("logo-interactive") || null
  if (svg) {
    if (isPlaying) {
      svg.setAttribute("class", "is-playing")
    } else {
      svg.setAttribute("class", "")
    }
  }
}

const muteAll = () => {
  Array.from(document.getElementsByClassName("letter-active")).forEach(element => {
    element.setAttribute("class", "")
    setSvgStatus()
    const letter = element.id
    const fade = setInterval(() => {
      if (window.logoAudio[letter].gain.value > 0) {
        window.logoAudio[letter].gain.value -= 0.05
      } else {
        clearInterval(fade)
      }
    }, 50)
  })
}

const LogoInteractive: React.FC<Props> = ({ className }) => {
  const [ready, setReady] = useState(false)
  const letters = ["s1", "a", "n", "c", "t", "u", "s2"]

  useEffect(() => {
    const context = window.logoAudioContext

    const loadedAudio = (id: string, obj: AudioBufferSourceNode, gain: AudioParam) => {
      if (!window.logoAudio[id]) {
        window.logoAudio[id] = { obj: obj, gain: gain }
      }
      if (Object.keys(window.logoAudio).length == letters.length) {
        setReady(true)
      }
    }

    for (const letter of letters) {
      const fileSrc = `/audio/${letter}.mp3`
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

    if (typeof window !== "undefined") {
      window.addEventListener('scroll', function(e) {
        if(this.scrollY > (window.innerHeight / 2) && window.muteAll) {
          window.muteAll()
        }
      })
    }
  }, [])

  const toggleMute = (event: SyntheticEvent<SVGElement, MouseEvent>) => {
    const parent = (event.target as HTMLElement).parentElement
    const target = (parent == event.target ? event.target : parent) as HTMLElement
    const letter = target.id
    if (!window.logoAudioReady) {
      window.logoAudioReady = true
      window.logoAudio["s1"].obj.start(0)
      window.logoAudio["t"].obj.start(0)
      window.logoAudio["u"].obj.start(0)
      window.logoAudio["a"].obj.start(0)
      window.logoAudio["n"].obj.start(0)
      window.logoAudio["c"].obj.start(0)
      window.logoAudio["s2"].obj.start(0)
    }
    if (target.getAttribute("class") == "letter-active") {
      target.setAttribute("class", "")
      let vol = 1
      const fade = setInterval(() => {
        if (vol > 0) {
          vol -= 0.05
          window.logoAudio[letter].gain.value = vol
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
          window.logoAudio[letter].gain.value = vol
        } else {
          clearInterval(fade)
        }
      }, 50)
    }
    setSvgStatus()
  }

  if (typeof window !== "undefined") {
    if (!window.muteAll) {
      window.muteAll = muteAll
    }
  }

  const handleMuteAll = () => {
    if (typeof window !== "undefined") {
      window.muteAll()
    }
  }

  return (
    <StyledLogoInteractive className={`logo-interactive ${className} ${ready ? "ready" : ""}`}>
      <svg
        id="logo-interactive"
        width="260"
        height="100"
        viewBox="0 0 180 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="x" onClick={handleMuteAll}>
          <rect opacity="0" x="155" y="29" width="21" height="24" fill="white" />
          <path
            d="M172.8 36.6L170.2 34L165.4 38.8L160.6 34L158 36.6L162.8 41.4L158 46.2L160.6 48.8L165.4 44L170.2 48.8L172.8 46.2L168 41.4L172.8 36.6Z"
            fill="white"
          />
        </g>
        <g id="s2" onClick={toggleMute}>
          <rect opacity="0" x="132.417" y="19.58" width="22.4325" height="33.898" fill="#BDAC94" />
          <path
            d="M149.272 36.1218L140.443 34.5607C139.45 34.391 138.731 33.5426 138.731 32.5414C138.731 31.4046 139.655 30.4883 140.802 30.4883H146.448C148.348 30.4883 149.871 32.0154 149.871 33.8819H154.439C154.439 29.5041 150.846 25.9407 146.431 25.9407H140.785C137.123 25.9407 134.146 28.8932 134.146 32.5245C134.146 35.7145 136.456 38.4464 139.621 39.0064L148.45 40.5675C149.443 40.7372 150.162 41.5856 150.162 42.5867C150.162 43.7236 149.238 44.6399 148.091 44.6399H142.445C140.545 44.6399 139.022 43.1127 139.022 41.2462H134.454C134.454 45.6241 138.047 49.1874 142.462 49.1874H148.108C151.77 49.1874 154.747 46.2349 154.747 42.6037C154.747 39.4136 152.437 36.6817 149.272 36.1218Z"
            fill="#BDAC94"
          />
        </g>
        <g id="u" onClick={toggleMute}>
          <rect opacity="0" x="111.053" y="19.58" width="21.3643" height="33.898" fill="#FFCC3E" />
          <path
            d="M126.993 41.2462C126.993 43.1297 125.453 44.6399 123.571 44.6399H119.002C117.103 44.6399 115.58 43.1127 115.58 41.2462V26.2292H111.012V41.2462C111.012 45.624 114.605 49.1874 119.02 49.1874H123.588C128.003 49.1874 131.596 45.624 131.596 41.2462V26.2292H127.027V41.2462H126.993Z"
            fill="#FFCC3E"
          />
        </g>
        <g id="t" onClick={toggleMute}>
          <rect opacity="0" x="96.0982" y="19.58" width="14.955" height="33.898" fill="#B7B7B7" />
          <path
            d="M98.7782 41.2469C98.7782 45.6248 102.371 49.1881 106.786 49.1881H107.933V44.6576H106.769C104.87 44.6576 103.347 43.1304 103.347 41.2639V30.7605H107.915V26.2299H103.347V21.6993H98.7782V41.2469Z"
            fill="#B7B7B7"
          />
        </g>
        <g id="c" onClick={toggleMute}>
          <rect opacity="0" x="73.6657" y="19.58" width="22.4325" height="33.898" fill="#B168B2" />
          <path
            d="M82.9667 30.4883H87.5354C89.4347 30.4883 90.9576 32.0154 90.9576 33.8819H95.5262C95.5262 29.5041 91.9329 25.9407 87.5182 25.9407H82.9496C78.535 25.9407 74.9417 29.5041 74.9417 33.8819V41.2462C74.9417 45.6241 78.535 49.1874 82.9496 49.1874H87.5182C91.9329 49.1874 95.5262 45.6241 95.5262 41.2462H90.9576C90.9576 43.1297 89.4176 44.6399 87.5354 44.6399H82.9667C81.0674 44.6399 79.5445 43.1127 79.5445 41.2462V33.8819C79.5445 32.0154 81.0845 30.4883 82.9667 30.4883Z"
            fill="#B168B2"
          />
        </g>
        <g id="n" onClick={toggleMute}>
          <rect opacity="0" x="50.165" y="19.58" width="23.5007" height="33.898" fill="#689CB2" />
          <path
            d="M64.3671 25.9577H59.7985C55.3838 25.9577 51.7905 29.5211 51.7905 33.8989V48.9159H56.3592V33.8819C56.3592 31.9984 57.8991 30.4883 59.7814 30.4883H64.35C66.2493 30.4883 67.7722 32.0154 67.7722 33.8819V48.899H72.3408V33.8819C72.3579 29.5041 68.7646 25.9577 64.3671 25.9577Z"
            fill="#689CB2"
          />
        </g>
        <g id="a" onClick={toggleMute}>
          <rect opacity="0" x="27.7325" y="19.58" width="22.4325" height="33.898" fill="#BDAC94" />
          <path
            d="M42.1228 25.9577H36.4762C32.0615 25.9577 28.4682 29.5211 28.4682 33.8989H33.0369C33.0369 32.0154 34.5768 30.5052 36.4591 30.5052H42.1057C43.2521 30.5052 44.1761 31.4215 44.1761 32.5584V34.2552L33.4817 36.1557C30.4189 36.6987 28.1773 39.3458 28.1773 42.434C28.1773 44.3345 28.9816 46.1501 30.4018 47.4227C31.668 48.5596 33.3106 49.1874 35.0046 49.1874C35.21 49.1874 35.3982 49.1705 35.6035 49.1535L44.1761 48.3899V48.899H48.7619V32.5414C48.7619 28.9102 45.7845 25.9577 42.1228 25.9577ZM44.1932 43.8424L35.21 44.6399C34.5768 44.6908 33.9609 44.4872 33.4989 44.063C33.0197 43.6388 32.7631 43.0449 32.7631 42.417C32.7631 41.5177 33.4133 40.7541 34.3031 40.6014L44.2103 38.8537V43.8424H44.1932Z"
            fill="#BDAC94"
          />
        </g>
        <g id="s1" onClick={toggleMute}>
          <rect opacity="0" x="5.29999" y="19.58" width="22.4325" height="33.898" fill="#FFCC3E" />
          <path
            d="M20.409 36.1218L11.5797 34.5607C10.5873 34.391 9.86862 33.5426 9.86862 32.5414C9.86862 31.4046 10.7926 30.4883 11.939 30.4883H17.5857C19.485 30.4883 21.0079 32.0154 21.0079 33.8819H25.5765C25.5765 29.5041 21.9832 25.9407 17.5686 25.9407H11.9219C8.2773 25.9577 5.29999 28.9102 5.29999 32.5414C5.29999 35.7315 7.60997 38.4634 10.7755 39.0234L19.6048 40.5845C20.5972 40.7541 21.3159 41.6026 21.3159 42.6037C21.3159 43.7406 20.3919 44.6569 19.2454 44.6569H13.5988C11.6995 44.6569 10.1766 43.1297 10.1766 41.2632H5.59087C5.59087 45.641 9.18418 49.2044 13.5988 49.2044H19.2454C22.9072 49.2044 25.8845 46.2519 25.8845 42.6207C25.8674 39.4136 23.5745 36.6817 20.409 36.1218Z"
            fill="#FFCC3E"
          />
        </g>
      </svg>
    </StyledLogoInteractive>
  )
}

const StyledLogoInteractive = styled.div`
  ${tw``}
  margin-right: -22px;
  transition: all 0.3s ease-in-out;
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
      opacity: 0.3;
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
      opacity: 0.6;
    }
  }
`
export default LogoInteractive
