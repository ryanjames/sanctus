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
        body {
          width: 100%;
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
        ${typography()}
      `}
    />
  </>
)

export default GlobalCss
