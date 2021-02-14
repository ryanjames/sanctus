import { FluidObject } from "gatsby-image"

export interface CaseStudyShape {
  id: string
  title: string
  slug: string
  color: string
  image: FluidObject
  video: string
  body: string
  map: Function
}

export const getCaseStudy = (query: any): CaseStudyShape => {
  const node = query.node

  return {
    id: node.id,
    title: node.title,
    color: node.overlayColor,
    image: node.image.localFile.childImageSharp.fluid,
    video: node.videoUrl,
    body: node.body.raw,
    slug: node.slug,
    map: Function,
  }
}