import { graphql, useStaticQuery } from "gatsby"
import { FluidObject } from "gatsby-image"

interface ContentShape {
  owner: string
  author: string
  title: string
  description: string
  ogImage: FluidObject
  musicLibrarySeoDescription: string
  about: {
    heading: string
    body: string
  }
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
              openGraphImage {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 2000) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              musicLibrarySeoDescription
            }
          }
        }
        about: allContentfulAboutContent {
          edges {
            node {
              heading
              body {
                raw
              }
            }
          }
        }
      }
    `
  )

  const metaData = query.metaData.edges[0].node
  const about = query.about.edges[0].node
  return {
    musicLibrarySeoDescription: metaData.musicLibrarySeoDescription,
    owner: "Sono Sanctus",
    author: "Ryan James",
    title: metaData.siteSeoTitle,
    description: metaData.siteSeoDescription,
    ogImage: metaData.openGraphImage.localFile.publicURL,
    about: {
      heading: about.heading,
      body: about.body.raw,
    },
  }
}

export default siteContent
