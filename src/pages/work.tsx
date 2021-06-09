import React, { useState, useEffect, SyntheticEvent } from "react"
// import PageLink from "../components/PageLink"
import styled from "@emotion/styled"
import tw from "twin.macro"
import withLocation from "../utils/withLocation"
import queryString from "query-string"
import Layout from "../components/Layout"
import caseStudies from "../staticQueries/caseStudies"
import { CaseStudyShape } from "../models/case-study"
import { Col } from "../components/Container"
import PageLink from "../components/PageLink"
import { motion } from "framer-motion"

type Props = {
  navigate: Function
  location: {
    origin: string
    search: string
  }
}

type Category = {
  title: string
  slug: string
}

type CaseStudy = {
  caseStudy: CaseStudyShape
}

const itemsAnimation = {
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
  duration: 0.3,
  type: "tween",
  ease: "easeInOut",
}

const workItem = {
  container: {
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
}

interface priorityShape {
  [key: string]: string
}

const CaseStudy: React.FC<CaseStudy> = ({ caseStudy }) => {
  const priorityClasses: priorityShape = {
    "No Priority": "",
    "High Priority": "prioritized",
    Feature: "feature",
  }
  const priorityClass = priorityClasses[caseStudy.priority]
  return (
    <motion.div variants={workItem.container}>
      <PageLink className={`case-study-row ${priorityClass}`} to={`/work/${caseStudy.slug}`}>
        <h2>{caseStudy.title}</h2>
        <div className="image" style={caseStudy.image ? { backgroundImage: `url(${caseStudy.image.src})` } : {}} />
      </PageLink>
    </motion.div>
  )
}

const WorkPage: React.FC<Props> = ({ navigate, location }) => {
  const caseStudiesData = caseStudies().sort((a: CaseStudyShape, b: CaseStudyShape) => (a.feature > b.feature ? 1 : -1))
  const [category, setCategory] = useState("nothing")
  const [visibility, setVisibility] = useState("visible")

  const changeCategory = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement
    setVisibility("hidden")
    setCategory(target.id)
    setTimeout(() => {
      if (target.id == "all") {
        navigate(`${location.origin}/work`)
      } else {
        navigate(`${location.origin}/work/?category=${target.id}`)
      }
      setVisibility("visible")
    }, 600)
  }

  useEffect(() => {
    const queryParam = queryString.parse(location.search).category as string
    const queryCategory = queryParam ? queryParam : "all"
    setCategory(queryCategory)
    //Preload Images
    caseStudiesData.map((caseStudy: CaseStudyShape) => {
      const img = new Image()
      img.src = caseStudy.image ? caseStudy.image.src : ""
    })
  }, [])

  const categories: Category[] = []
  caseStudiesData.filter((item: CaseStudyShape) => {
    const i = categories.findIndex(x => x.title == item.category.title)
    if (i <= -1) {
      categories.push({ title: item.category.title, slug: item.category.slug })
    }
    return null
  })

  return (
    <StyledLayout title="Work" page="features">
      <Col>
        <div className="features-menu">
          <span className={category == "all" ? "-selected" : ""} id="all" onClick={changeCategory}>
            All Work
          </span>
          {categories.map(item => (
            <span
              className={category == item.slug ? "-selected" : ""}
              id={item.slug}
              onClick={changeCategory}
              key={item.slug}
            >
              {item.title}
            </span>
          ))}
        </div>
        <motion.div className="caseStudies" initial="hidden" animate={visibility} variants={itemsAnimation}>
          {caseStudiesData
            .filter((caseStudy: CaseStudyShape) => {
              return category == "all" ? caseStudy.title != "" : caseStudy.category.slug === category
            })
            .filter((caseStudy: CaseStudyShape) => {
              return caseStudy.priority == "Feature"
            })
            .map((caseStudy: CaseStudyShape) => (
              <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          {caseStudiesData
            .filter((caseStudy: CaseStudyShape) => {
              return category == "all" ? caseStudy.title != "" : caseStudy.category.slug === category
            })
            .filter((caseStudy: CaseStudyShape) => {
              return caseStudy.priority == "High Priority"
            })
            .map((caseStudy: CaseStudyShape) => (
              <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          {caseStudiesData
            .filter((caseStudy: CaseStudyShape) => {
              return category == "all" ? caseStudy.title != "" : caseStudy.category.slug === category
            })
            .filter((caseStudy: CaseStudyShape) => {
              return !caseStudy.priority || caseStudy.priority == "No Priority"
            })
            .map((caseStudy: CaseStudyShape) => (
              <CaseStudy key={caseStudy.id} caseStudy={caseStudy} />
            ))}
        </motion.div>
      </Col>
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  ${tw``}
  .features-menu {
    ${tw`text-xs py-9 uppercase tracking-widest mb-4`}
    span {
      transition: all 0.2s ease-in-out;
      ${tw`inline-block pb-6`}
      margin-right: 32px;
      color: rgba(255, 255, 255, 0.5);
      &:hover {
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
      }
      &.-selected {
        color: white;
        font-weight: bold;
      }
    }
  }
  .case-study-row {
    ${tw`relative block h-24 md:h-32 mb-8`}
    &.feature {
      ${tw`h-64 md:h-96`}
    }
    &.prioritized {
      ${tw`h-40 md:h-64`}
    }
    h2 {
      ${tw`text-lg pt-6`}
      position: relative;
      z-index: 2;
    }
    .image {
      opacity: 0.3;
      transition: 0.2s ease-in-out;
      ${tw`absolute top-0 left-6 md:left-16 right-0 bottom-0`}
      background-position: center;
      background-size: cover;
      z-index: 1;
    }
    &:hover {
      .image {
        opacity: 0.8 !important;
      }
    }
  }
`
export default withLocation(WorkPage)
