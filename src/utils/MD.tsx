import React from "react"
import Markdown from "markdown-to-jsx"
import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"

type Props = {
  content?: string
  removeRootP?: boolean
  externalLinks?: boolean
}

const Blank: React.FC = ({ children }) => <>{children}</>
const Paragraph: React.FC = ({ children }) => <p>{children}</p>

type IExternalLinks = {
  href: string
  className: string
}
const ExternalLinks: React.FC<IExternalLinks> = ({ href, className, children }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

const MD: React.FC<Props> = ({ content = "", removeRootP = false, externalLinks = false }) => (
  <StyledMarkdown
    options={{
      overrides: {
        a: {
          component: externalLinks ? ExternalLinks : PageLink,
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
