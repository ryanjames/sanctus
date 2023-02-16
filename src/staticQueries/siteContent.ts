import { graphql, useStaticQuery } from "gatsby"

type PageShape = {
  page: string
  heading: string
  subheading: {
    raw: string
  }
  body?: {
    raw: string
  }
  seoDescription: string
}

type PagesShape = {
  [key: string]: PageShape
}

interface ContentShape {
  owner: string
  author: string
  title: string
  description: string
  licensingIntro: string
  downloadSampleIntro: string
  ogImage: string
  musicLibrarySeoDescription: string
  pages: PagesShape
}

const siteContent = (): ContentShape => {
  const query = useStaticQuery(
    graphql`
      query ContentQuery {
        metaData: allContentfulSiteMetadata {
          nodes {
            siteSeoTitle
            siteSeoDescription
            downloadSampleIntro
            licensingIntro
            openGraphImage {
              localFile {
                publicURL
              }
            }
            musicLibrarySeoDescription
          }
        }
        pages: allContentfulPageContent {
          nodes {
            page
            heading
            subheading {
              raw 
            }
            body {
              raw
            }
            seoDescription
          }
        }
      }
    `
  )

  const metaData = query.metaData.nodes[0]
  const pages: PagesShape = {}
  query.pages.nodes.forEach((page: PageShape) => {
    pages[page.page] = {
      page: page.page,
      heading: page.heading,
      subheading: page.subheading,
      body: page.body ? page.body : undefined,
      seoDescription: page.seoDescription,
    }
  })
  return {
    musicLibrarySeoDescription: metaData.musicLibrarySeoDescription,
    owner: "Sono Sanctus",
    author: "Ryan James",
    title: metaData.siteSeoTitle,
    downloadSampleIntro: metaData.downloadSampleIntro,
    licensingIntro: metaData.licensingIntro,
    description: metaData.siteSeoDescription,
    ogImage: metaData.openGraphImage.localFile.publicURL,
    pages: pages,
  }
}

export default siteContent
