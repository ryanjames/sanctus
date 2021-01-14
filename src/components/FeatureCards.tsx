import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import FeatureCard from "../components/FeatureCard"
import { FeatureShape } from "../models/feature"

interface Props {
  features: FeatureShape[]
}

const FeatureCards: React.FC<Props> = ({ features }) => {
  let layout: (string | undefined)[] = []
  switch (features.length) {
    case 2:
      layout = ["1-2", "1-2"]
      break
    case 3:
      layout = ["1-3", "1-3", "1-3"]
      break
    case 4:
      layout = ["1-2", "1-2", "1-2", "1-2"]
      break
    case 5:
      layout = ["1-2", "1-2", "1-3", "1-3", "1-3"]
      break
    case 6:
      layout = ["1-3", "1-3", "1-3", "1-3", "1-3", "1-3"]
      break
    case 7:
      layout = ["1-2", "1-2", "1-2", "1-2", "1-3", "1-3", "1-3"]
      break
    case 8:
      layout = ["1-2", "1-2", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3"]
      break
    case 9:
      layout = ["1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3"]
      break
    case 10:
      layout = ["1-2", "1-2", "1-2", "1-2", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3"]
      break
    case 11:
      layout = ["1-2", "1-2", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3"]
      break
    default:
      layout = ["1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3", "1-3"]
      break
  }
  return (
    <StyledFeatureCards>
      {features.map((feature: FeatureShape, index) => (
        <div key={feature.id} className={`w-${layout[index]}`}>
          <div tw="absolute inset-0 overflow-hidden">
            <FeatureCard feature={feature} />
          </div>
        </div>
      ))}
    </StyledFeatureCards>
  )
}

const StyledFeatureCards = styled.div`
  ${tw`flex flex-wrap`}
  .w-1-2 {
    ${tw`relative w-1/2`}
    padding-bottom: 33.3333%;
  }
  .w-1-3 {
    ${tw`relative w-1/3`}
    padding-bottom: 33.3333%;
  }
`
export default FeatureCards
