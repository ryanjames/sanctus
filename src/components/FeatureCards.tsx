import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import FeatureCard from "../components/FeatureCard"
import { FeatureShape } from "../models/feature"

interface Props {
  features: FeatureShape[]
}

const FeatureCards: React.FC<Props> = ({ features }) => {
  let layout = {}
  switch (features.length) {
    case 2:
      layout = ["1/2", "1/2"]
      break
    case 3:
      layout = ["1/3", "1/3", "1/3"]
      break
    case 4:
      layout = ["1/2", "1/2", "1/2", "1/2"]
      break
    case 5:
      layout = ["1/2", "1/2", "1/3", "1/3", "1/3"]
      break
    case 6:
      layout = ["1/3", "1/3", "1/3", "1/3", "1/3", "1/3"]
      break
    case 7:
      layout = ["1/2", "1/2", "1/2", "1/2", "1/3", "1/3", "1/3"]
      break
    case 8:
      layout = ["1/2", "1/2", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3"]
      break
    case 9:
      layout = ["1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3"]
      break
    case 10:
      layout = ["1/2", "1/2", "1/2", "1/2", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3"]
      break
    case 11:
      layout = ["1/2", "1/2", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3"]
      break
    default:
      layout = ["1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3", "1/3"]
      break
  }
  return (
    <StyledFeatureCards>
      {features.map((feature: FeatureShape) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </StyledFeatureCards>
  )
}

const StyledFeatureCards = styled.div`
  ${tw``}
`
export default FeatureCards
