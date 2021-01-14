import React from "react"
import Markdown from "markdown-to-jsx"
import PageLink from "../components/PageLink"

type Props = {
  content?: string
}

const MD: React.FC<Props> = ({ content = "" }) => (
  <Markdown
    options={{
      overrides: {
        a: {
          component: PageLink,
        },
      },
    }}
  >
    {content}
  </Markdown>
)

export default MD
