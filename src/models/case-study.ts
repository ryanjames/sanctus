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
  priority: string
  category?: {
    slug: string
    categoryName: string
  }
  relatedStudies?: relatedStudy[]
  sections: SectionShape[]
  detailedCredits1Title?: string
  detailedCredits1Body?: string,
  detailedCredits2Title?: string,
  detailedCredits2Body?: string,
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
    detailedCredits1Title: node.detailedCredits1Title,
    detailedCredits2Title: node.detailedCredits2Title,
    detailedCredits1Body: node.detailedCredits1Body?.raw,
    detailedCredits2Body: node.detailedCredits2Body?.raw,
    category: node.category ? {
      slug: node.category?.slug,
      categoryName: node.category?.categoryName,
    } : undefined,
    relatedStudies: node.relatedStudies ? node.relatedStudies.map((study: relatedStudy ) => {
      return {
        title: study.title,
        slug: study.slug,
        image: study.image.localFile.childImageSharp.fluid,
    }}) : null,
    priority: node.priority,
    sections: getSections(node),
    map: Function,
    sort: Function,
    filter: Function,
  }
}
