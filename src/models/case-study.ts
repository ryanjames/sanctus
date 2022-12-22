import { FluidObject } from "gatsby-image"

type relatedStudy = {
  slug: string
  title: string
  image: any
}

export interface CaseStudyShape {
  id: string
  order: number
  title: string
  slug: string
  color: string
  image: FluidObject
  video: string
  body: string
  client: string
  role: string
  credit: string
  creditLabel: string
  credit2: string
  credit2Label: string
  feature: boolean
  priority: string
  category: {
    slug: string
    categoryName: string
  }
  relatedStudies: relatedStudy[]
  section1Media?: FluidObject
  section1Body?: string
  section2Media?: FluidObject
  section2Body?: string
  section3Media?: FluidObject
  section3Body?: string
  section4Media?: FluidObject
  section4Body?: string
  section5Media?: FluidObject
  section5Body?: string
  section6Media?: FluidObject
  section6Body?: string
  section7Media?: FluidObject
  section7Body?: string
  section8Media?: FluidObject
  section8Body?: string
  section9Media?: FluidObject
  section9Body?: string
  section10Media?: FluidObject
  section10Body?: string
  map: Function
  sort: Function
  filter: Function
}

export const getCaseStudy = (query: any): CaseStudyShape => {
  const node = query.node
  return {
    id: node.id,
    order: 0,
    title: node.title,
    slug: node.slug,
    color: node.overlayColor,
    image: node.image.localFile.childImageSharp.fluid,
    video: node.videoUrl,
    body: node.body.raw,
    client: node.client,
    role: node.role,
    credit: node.credit,
    creditLabel: node.creditLabel,
    credit2: node.credit2,
    credit2Label: node.credit2Label,
    category: {
      slug: "",
      categoryName: "",
    },
    relatedStudies: node.relatedStudies ? node.relatedStudies.map((study: relatedStudy ) => {
      return {
        title: study.title,
        slug: study.slug,
        image: study.image.localFile.childImageSharp.fluid,
    }}): null,
    feature: node.feature,
    priority: node.priority,
    section1Media: node.section1Media?.localFile.childImageSharp.fluid,
    section1Body: node.section1Body?.raw,
    section2Media: node.section2Media?.localFile.childImageSharp.fluid,
    section2Body: node.section2Body?.raw,
    section3Media: node.section3Media?.localFile.childImageSharp.fluid,
    section3Body: node.section3Body?.raw,
    section4Media: node.section4Media?.localFile.childImageSharp.fluid,
    section4Body: node.section4Body?.raw,
    section5Media: node.section5Media?.localFile.childImageSharp.fluid,
    section5Body: node.section5Body?.raw,
    section6Media: node.section6Media?.localFile.childImageSharp.fluid,
    section6Body: node.section6Body?.raw,
    section7Media: node.section7Media?.localFile.childImageSharp.fluid,
    section7Body: node.section7Body?.raw,
    section8Media: node.section8Media?.localFile.childImageSharp.fluid,
    section8Body: node.section8Body?.raw,
    section9Media: node.section9Media?.localFile.childImageSharp.fluid,
    section9Body: node.section9Body?.raw,
    section10Media: node.section10Media?.localFile.childImageSharp.fluid,
    section10Body: node.section10Body?.raw,
    map: Function,
    sort: Function,
    filter: Function,
  }
}
