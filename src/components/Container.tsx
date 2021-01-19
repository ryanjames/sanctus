import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { mQw, sizes, gutters } from "../utils/mediaQueries"

export const Splash: React.FC = ({ children }) => {
  return <StyledSplash>{children}</StyledSplash>
}
const StyledSplash = styled.div`
  height: calc(100vh - 254px - 86px);
  max-width: 800px;
  margin: 0 auto;
  min-height: 380px;
  display: flex;
  align-items: center;
`

interface SharedProps {
  className?: string
}

export const Section: React.FC<SharedProps> = ({ className = "", children }) => {
  return <StyledSection className={`section ${className}`}>{children}</StyledSection>
}

const StyledSection = styled.section`
  ${tw`py-8 sm:py-12 md:py-16 xl:py-20 xxl:py-32`}
`

export const Col: React.FC<SharedProps> = ({ className = "", children }) => {
  return <StyledCol className={`col ${className}`}>{children}</StyledCol>
}

let gutterQueries = `
  padding-left: ${gutters["base"]};
  padding-right: ${gutters["base"]};
`
let i = 0
sizes.forEach((value: string) => {
  const gutterKey = Object.keys(gutters)[i]
  gutterQueries = gutterQueries.concat(
    `
    @media (min-width: ${value}) { 
      padding-left: ${(gutters as any)[gutterKey]};
      padding-right: ${(gutters as any)[gutterKey]};
    };
    `
  )
  i += 1
})

let outerQueries = `
  margin-left: -${gutters["base"]};
  margin-right: -${gutters["base"]};
`
let j = 0
sizes.forEach((value: string) => {
  const gutterKey = Object.keys(gutters)[j]
  outerQueries = outerQueries.concat(
    `
    @media (min-width: ${value}) { 
      margin-left: -${(gutters as any)[gutterKey]};
      margin-right: -${(gutters as any)[gutterKey]};
    };
    `
  )
  j += 1
})

const StyledCol = styled.div`
  ${gutterQueries}
`

let widthQueries = ""
mQw.forEach((value: string, key: string) => {
  widthQueries = widthQueries.concat(
    `
    @media (${value}) {
      max-width: ${sizes.get(key)};
    };
    `
  )
})

interface ContainerProps extends SharedProps {
  full?: boolean
  className?: string
}

export const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <StyledContainer className={`container ${className}`}>
      <div>{children}</div>
    </StyledContainer>
  )
}
const StyledContainer = styled.div`
  ${tw`m-auto`}
  max-width: 360px;
  ${widthQueries}
  ${gutterQueries}
  > div {
    ${tw`flex flex-wrap`};
    ${outerQueries}
  }
`

export default Container
