import { FluidObject } from "gatsby-image"

export type SectionMedia = {
  type: string
  src: FluidObject | string,
}

export interface SectionShape {
    body?: string,
    media?: SectionMedia,
    link?: string,
    button?: string,
    orientation: string,
}[]

const getMedia = (media: any) => {
  if (media?.file?.contentType) {
    const type = media.file.contentType as string
    const fluidMatch = ["png", "jpg", "jpeg"]
    if(fluidMatch.some((obj: any)=> type.includes(obj))) {
      return {
        type: "fluid",
        src: media.localFile.childImageSharp.fluid
      }
    } else if(type.includes("gif")) {
      return {
        type: "static",
        src: "https:" + media.file.url
      }
    } else if(type.includes("video")) {
      return {
        type: "static-video",
        src: "https:" + media.file.url
      }
    } else if(type.includes("html")) {
      return {
        type: "video",
        src: "https://vimeo.com/" + media.file.fileName
      }
    } else {
      return {
        type: media.file.contentType,
        src: "https:" + media.file.url
      }
    }
  } else {
    return
  }
}

export const getSections = (node: any) => {
  let orientation: string
  let floatedOrientation: string
  const sectionNodes = [...Array(10)].map((x, i) => {
    const num = i + 1;
    let body = node['section' + num + 'Body' as keyof SectionShape]
    body = body?.raw ? body.raw as string : undefined
    const media = getMedia(node['section' + num + 'Media' as keyof SectionShape]) as SectionMedia
    const button = node['section' + num + 'Button' as keyof SectionShape] as string
    const link = node['section' + num + 'Link' as keyof SectionShape] as string
    const stacked = node['section' + num + 'Stacked' as keyof SectionShape]
    if(stacked || body && !media || media && !body) {
      orientation = 'stacked'
    } else {
      floatedOrientation = floatedOrientation == 'left' ? 'right' : 'left'
      orientation = floatedOrientation
    }

    if(body || media) {
      return  {
        body: body,
        media: media,
        link: link,
        button: button,
        orientation: orientation
      }
    } else {
      return
    }
  })
  return sectionNodes.filter(section => {
    return section !== undefined;
  }) as SectionShape[]
}