import React from 'react'
import { Global, css } from '@emotion/core'
import { rhythm } from './typographyBase'
import typography from './typography'
import tw from 'twin.macro'

/* ${typography} */

const GlobalCss = () => (
  <>
    <Global
      styles={css`
        ${tw``}
        body {
          width: 100%;
        }
        figcaption {
          margin-top: -${rhythm(1)};
          font-style: italic;
          font-size: 0.85rem;
        };
        figure img {
          width: 100%;
        }
        ${typography()}
      `}
    />
  </>
)

export default GlobalCss