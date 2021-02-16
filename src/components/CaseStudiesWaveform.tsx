import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import caseStudies from "../staticQueries/caseStudies"
import { CaseStudyShape } from "../models/case-study"
import PageLink from "./PageLink"

type Props = {
  className?: string
}

const CaseStudiesWaveform: React.FC<Props> = ({ className }) => {
  const featuredCaseStudies = caseStudies()
    .filter((obj: CaseStudyShape) => obj.feature == true)
    .sort((a: CaseStudyShape, b: CaseStudyShape) => (a.title > b.title ? 1 : -1))

  const waveforms = [
    [40, 50, 100, 40, 50, 40],
    [40, 60, 40, 100, 50, 60],
    [36, 60, 80, 100, 36, 60],
  ]

  const waveform = waveforms[Math.floor(Math.random() * waveforms.length)]

  return (
    <StyledCaseStudiesWaveform className={className}>
      {featuredCaseStudies.map((caseStudy: CaseStudyShape, index: number) => (
        <PageLink className="case-study-card" key={caseStudy.id} to={`/work/${caseStudy.slug}`}>
          <div className="content-container">
            <div className="content">
              <small>{caseStudy.category.title}</small>
              <h2 tw="pl-1/3 text-xl">{caseStudy.title}</h2>
            </div>
          </div>
          <div className="image-container">
            <div
              className="image"
              style={{
                backgroundImage: `url(${caseStudy.image.src})`,
                height: `${waveform[index]}%`,
              }}
            ></div>
          </div>
        </PageLink>
      ))}
    </StyledCaseStudiesWaveform>
  )
}

const StyledCaseStudiesWaveform = styled.div`
  ${tw`flex w-full mt-8 mx-auto`}
  height: calc(100vh - 180px);
  width: calc((100vh - 180px) * 2);
  .case-study-card {
    ${tw`relative`}
    width: 16.66666%;
    .content-container {
      ${tw`flex h-full items-center relative`}
      z-index: 2;
      .content {
        ${tw`relative text-muted`}
        width: 100%;
        height: 33.3333%;
        h2 {
          transition: 0.3s ease-in-out;
        }
        small {
          position: absolute;
          bottom: -22px;
          width: 100%;
          height: 16px;
          text-align: right;
          left: 19%;
          transform: rotate(-90deg);
          transform-origin: top left;
        }
      }
    }
    .image-container {
      z-index: 1;
      position: absolute;
      ${tw`flex items-center h-full`};
      top: 0;
      width: 42%;
      left: 29%;
      .image {
        transition: 0.3s ease-in-out;
        ${tw`w-full opacity-30`};
        width: 100%;
        background-position: center;
        background-size: cover;
      }
    }
    &:hover {
      .image {
        opacity: 0.8;
      }
      h2 {
        color: #fff;
      }
    }
  }
`
export default CaseStudiesWaveform
