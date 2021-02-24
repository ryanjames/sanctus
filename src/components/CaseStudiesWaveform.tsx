import React, { useState } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import caseStudies from "../staticQueries/caseStudies"
import { CaseStudyShape } from "../models/case-study"
import { motion } from "framer-motion"
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
    [60, 70, 40, 80, 36, 70],
    [36, 60, 80, 100, 50, 60],
  ]

  const [waveformIndex, setWaveformIndex] = useState(0)

  const waveAnimation = {
    visible: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.5,
      },
    },
    hidden: {
      transition: {
        when: "afterChildren",
      },
    },
  }

  const baseTransition = {
    duration: 0.25,
    type: "tween",
    ease: "easeInOut",
  }

  const waveItem = {
    title: {
      visible: {
        opacity: 1,
        marginLeft: 0,
        transition: baseTransition,
      },
      hidden: {
        opacity: 0,
        marginLeft: 50,
        transition: baseTransition,
      },
    },
    label: {
      visible: {
        opacity: 0.5,
        bottom: -22,
        transition: baseTransition,
      },
      hidden: {
        opacity: 0,
        bottom: -50,
        transition: baseTransition,
      },
    },
  }

  const shuffleWaveform = () => {
    const newIndex = waveformIndex < waveforms.length - 1 ? waveformIndex + 1 : 0
    setWaveformIndex(newIndex)
  }

  return (
    <StyledCaseStudiesWaveform className={className} initial="hidden" animate="visible" variants={waveAnimation}>
      {featuredCaseStudies.map((caseStudy: CaseStudyShape, index: number) => (
        <PageLink className="case-study-card" key={caseStudy.id} to={`/work`} onMouseEnter={shuffleWaveform}>
          <div className="content-container">
            <div className="content">
              <motion.small variants={waveItem.label}>{caseStudy.category.title}</motion.small>
              <motion.h2 variants={waveItem.title} tw="pl-1/3 text-xl">
                <span>{caseStudy.category.title}</span>
              </motion.h2>
            </div>
          </div>
          <div className="wave-container">
            <motion.div
              className="image-container"
              variants={{
                hidden: { height: "10%", opacity: 0 },
                visible: {
                  height: "100%",
                  opacity: 1,
                  transition: { ease: "easeInOut", duration: 0.5, type: "tween" },
                },
              }}
            >
              <div
                className="image"
                style={{
                  backgroundImage: `url(${caseStudy.image.src})`,
                  height: waveforms[waveformIndex][index] + "%",
                }}
              ></div>
            </motion.div>
          </div>
        </PageLink>
      ))}
    </StyledCaseStudiesWaveform>
  )
}

const StyledCaseStudiesWaveform = styled(motion.div)`
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
          span {
            display: block;
            transition: 0.3s ease-in-out;
            opacity: 0;
            transform: scale(1);
            transform-origin: left;
          }
        }
        small {
          transition: 0.3s ease-in-out;
          position: absolute;
          width: 100%;
          height: 16px;
          text-align: right;
          left: 19%;
          transform: rotate(-90deg);
          transform-origin: top left;
        }
      }
    }
    .wave-container {
      z-index: 1;
      ${tw`flex h-full items-center`}
      position: absolute;
      top: 0;
      bottom: 0;
      width: 42%;
      left: 29%;
      .image-container {
        ${tw`flex items-center h-full w-full`};
      }
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
      .content-container .content {
        h2 span {
          color: #fff;
          opacity: 1;
          transform: scale(1.3);
        }
        small {
          opacity: 0 !important;
          bottom: -50px !important;
        }
      }
    }
  }
`
export default CaseStudiesWaveform
