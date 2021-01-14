import React from "react"
import Markdown from "markdown-to-jsx"
import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"

type Props = {
  content?: string
  removeRootP?: boolean
}

const Blank: React.FC = ({ children }) => <>{children}</>
const Paragraph: React.FC = ({ children }) => <p>{children}</p>

const MD: React.FC<Props> = ({ content = "", removeRootP = false }) => (
  <StyledMarkdown
    options={{
      overrides: {
        a: {
          component: PageLink,
        },
        p: {
          component: removeRootP ? Blank : Paragraph,
        },
      },
    }}
  >
    {content}
  </StyledMarkdown>
)
const StyledMarkdown = styled(Markdown)`
  ${tw``}
`

export default MD
