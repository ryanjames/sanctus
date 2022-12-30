import { FluidObject } from "gatsby-image"

export type Media = {
    object: FluidObject | string,
    type: string
}

export interface HomeShape {
  demoReel: string
  demoReelPoster: FluidObject
  feature1Media?: Media
  feature1Body?: string
  feature1ButtonLabel?: string
  feature1ButtonLink?: string
  feature2Media?: Media
  feature2Body?: string
  feature2ButtonLabel?: string
  feature2ButtonLink?: string
  feature3Media?: Media
  feature3Body?: string
  feature3ButtonLabel?: string
  feature3ButtonLink?: string
  feature4Media?: Media
  feature4Body?: string
  feature4ButtonLabel?: string
  feature4ButtonLink?: string
  agencies: string[]
  clients: string[]
  map: Function
  sort: Function
  filter: Function
}

const getMedia = (media: any) => {
  if(media.localFile.childImageSharp) {
    return {
      object: media.localFile.childImageSharp.fluid,
      type: "fluid"
    }
  } else if(media.file.url.includes("//videos")) {
    return {
      object: "https:" + media.file.url,
      type: "video"
    }
  } else {
    return {
      object: media.file.url,
      type: "static"
    }
  }
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
    feature1Media: getMedia(node.feature1Media),
    feature1Body: node.feature1Body?.raw,
    feature1ButtonLabel: node.feature1ButtonLabel,
    feature1ButtonLink: node.feature1ButtonLink,
    feature2Media: getMedia(node.feature2Media),
    feature2Body: node.feature2Body?.raw,
    feature2ButtonLabel: node.feature1ButtonLabel,
    feature2ButtonLink: node.feature2ButtonLink,
    feature3Media: getMedia(node.feature3Media),
    feature3Body: node.feature3Body?.raw,
    feature3ButtonLabel: node.feature1ButtonLabel,
    feature3ButtonLink: node.feature3ButtonLink,
    feature4Media: getMedia(node.feature4Media),
    feature4Body: node.feature4Body?.raw,
    feature4ButtonLabel: node.feature1ButtonLabel,
    feature4ButtonLink: node.feature4ButtonLink,
    map: Function,
    sort: Function,
    filter: Function,
  }
}
