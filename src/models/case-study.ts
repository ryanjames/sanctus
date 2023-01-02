import { getSections, SectionShape } from "./sections"
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
  sections: SectionShape[]
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
    sections: getSections(node),
    map: Function,
    sort: Function,
    filter: Function,
  }
}
