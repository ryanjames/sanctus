import { graphql, useStaticQuery } from "gatsby"

type PageShape = {
  node: {
    page: string
    heading: string
    body: {
      raw: string
    }
    seoDescription: string
  }
}

type PagesShape = {
  [key: string]: {
    heading: string
    body: string
    description: string
  }
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
          edges {
            node {
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
        }
        pages: allContentfulPageContent {
          edges {
            node {
              page
              heading
              body {
                raw
              }
              seoDescription
            }
          }
        }
      }
    `
  )

  const metaData = query.metaData.edges[0].node
  const pages: PagesShape = {}
  query.pages.edges.forEach((page: PageShape) => {
    pages[page.node.page] = {
      heading: page.node.heading,
      body: page.node.body.raw,
      description: page.node.seoDescription,
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
