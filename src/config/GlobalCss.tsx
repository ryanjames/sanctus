import React from "react"
import { Global, css } from "@emotion/react"
import colors from "../config/colors"
import { rhythm } from "./typographyBase"
import typography from "./typography"
import tw from "twin.macro"

const GlobalCss: React.FC = () => (
  <>
    <Global
      styles={css`
        ${tw``}
        html {
          min-height: 100vh;
        }
        body {
          width: 100%;
          min-height: 100vh;
          background-color: ${colors["near-black"]};
        }
        figcaption {
          margin-top: -${rhythm(1)};
          font-style: italic;
          font-size: 0.85rem;
        }
        figure img {
          width: 100%;
        }
        .inline-video {
          padding-top: 56.25%;
          position: relative;
          margin: 40px 0 !important;
          > div {
            ${tw`absolute inset-0`}
            width: 100% !important;
            height: 100% !important;
          }
        }
        .inline-image {
          ${tw`my-12`}
        }
        ${typography()}
      `}
    />
  </>
)

export default GlobalCss
