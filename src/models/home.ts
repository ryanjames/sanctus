import { FluidObject } from "gatsby-image"
import { getSections, SectionShape } from "./sections"

export type Media = {
    object: FluidObject | string,
    type: string
}

export interface HomeShape {
  demoReel: string
  demoReelPoster: FluidObject
  sections: SectionShape[]
  agencies: string[]
  clients: string[]
  map: Function
  sort: Function
  filter: Function
}

const getPartners = (partners: { file: { url: string} }[] ) => {
  return partners.map(partner => {
    return "https:" + partner.file.url
  })
}

export const getHome = (query: any): HomeShape => {
  const node = query.node
  return {
    agencies: getPartners(node.agencies),
    clients: getPartners(node.clients),
    demoReel: node.demoReel,
    demoReelPoster: node.demoReelPoster?.localFile.childImageSharp.fluid,
    sections: getSections(node),
    map: Function,
    sort: Function,
    filter: Function,
  }
}
