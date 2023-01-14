import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

type Props = {
  className?: string,
  heading: string,
  body: string,
}

const DetailedCredits: React.FC<Props> = ({ className, heading, body }) => {
  const content = JSON.parse(body)
  return (
    <StyledDetailedCredits className={className}>
      <h4>{heading}</h4><br />
      {documentToReactComponents(content)}
    </StyledDetailedCredits>
  )
}

const StyledDetailedCredits = styled.section`
  ${tw``}
  h4 {
    font-weight: 700;
    font-size: 1.2em;
    margin-bottom: 0;
  }
  padding-bottom: 32px;
  ul {
    list-style-type: none;
    margin: 0 40px 0 0;
    li {
      margin: 0;
    }
  }
`
export default DetailedCredits
