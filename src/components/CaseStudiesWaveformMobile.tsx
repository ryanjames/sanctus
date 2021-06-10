import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { Col } from "./Container"
import caseStudyCategories, { CaseStudyCategoryShape } from "../staticQueries/caseStudyCategories"
import { CaseStudyShape } from "../models/case-study"
import { motion } from "framer-motion"
import PageLink from "./PageLink"

type Props = {
  className?: string
}

const CaseStudiesWaveformMobile: React.FC<Props> = ({ className = "" }) => {
  const waveforms = [
    [40, 50, 90, 40, 50, 40],
    [60, 70, 40, 80, 36, 70],
    [36, 60, 80, 90, 50, 60],
  ]

  const [waveformIndex, setWaveformIndex] = useState(0)

  const caseStudies: CaseStudyShape[] = []
  caseStudyCategories().forEach((category: CaseStudyCategoryShape) => {
    caseStudies.push(...category.caseStudies)
  })
  caseStudies.sort((a: CaseStudyShape, b: CaseStudyShape) => (a.order > b.order ? 1 : -1))

  const featuredCaseStudies = caseStudies
    .filter((obj: CaseStudyShape) => obj.feature == true)
    .sort((a: CaseStudyShape, b: CaseStudyShape) => (a.title > b.title ? 1 : -1))

  const waveformStyle = () => {
    useEffect(() => {
      const newIndex = Math.floor(Math.random() * 2) + 1
      setWaveformIndex(newIndex)

      //Preload Images
      featuredCaseStudies.map((caseStudy: CaseStudyShape) => {
        const img = new Image()
        img.src = caseStudy.image.src
      })
    }, [])
  }

  const waveAnimation = {
    visible: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    hidden: {
      transition: {
        when: "afterChildren",
      },
    },
  }

  const baseTransition = {
    duration: 0.5,
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
        opacity: 1,
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

  return (
    <StyledCaseStudiesWaveform
      className={`${className} ${waveformStyle()}`}
      initial="hidden"
      animate="visible"
      variants={waveAnimation}
    >
      <Col>
        {featuredCaseStudies.map((caseStudy: CaseStudyShape, index: number) => (
          <PageLink className="case-study-card" key={caseStudy.id} to={`/work?category=${caseStudy.category.slug}`}>
            <div className="content-container">
              <div className="content">
                <motion.h2 variants={waveItem.title} tw="text-lg">
                  <span>{caseStudy.category.categoryName}</span>
                </motion.h2>
              </div>
            </div>
            <div className="wave-container">
              <motion.div
                className="image-container"
                variants={{
                  hidden: { width: "10%", opacity: 0 },
                  visible: {
                    width: "100%",
                    opacity: 1,
                    transition: { ease: "easeInOut", duration: 0.5, type: "tween" },
                  },
                }}
              >
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${caseStudy.image.src})`,
                    width: waveforms[waveformIndex][index] + "%",
                  }}
                ></div>
              </motion.div>
            </div>
          </PageLink>
        ))}
      </Col>
    </StyledCaseStudiesWaveform>
  )
}

const StyledCaseStudiesWaveform = styled(motion.div)`
  ${tw`w-full`}
  .case-study-card {
    margin-bottom: 18px;
    display: block;
  }
  .wave-container {
    height: 8vh;
  }
  .image-container {
    height: 100%;
    .image {
      height: 100%;
      margin-left: 24px;
      opacity: 0.5;
    }
  }
  .content-container {
    position: absolute;
    z-index: 30;
  }
`
export default CaseStudiesWaveformMobile
