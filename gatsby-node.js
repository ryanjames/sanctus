const path = require("path")
const slugify = require("slugify")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      playlists: allAirtable(filter: { table: { eq: "Playlists" } }) {
        edges {
          node {
            id
            data {
              Playlist_Name
            }
          }
        }
      }
      moods: allAirtable(filter: { table: { eq: "Moods" } }) {
        edges {
          node {
            id
            data {
              Mood_Name
            }
          }
        }
      }
      energies: allAirtable(filter: { table: { eq: "Energies" } }) {
        edges {
          node {
            id
            data {
              Energy_Name
            }
          }
        }
      }
      caseStudies: allContentfulCaseStudy {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const caseStudies = result.data.caseStudies.edges
    caseStudies.forEach(caseStudy => {
      const id = caseStudy.node.id
      const slug = slugify(caseStudy.node.slug)
      createPage({
        path: "/work/" + slug,
        component: path.resolve(`src/templates/case-study.tsx`),
        context: {
          id,
        },
      })
    })
  })
}

exports.onCreateWebpackConfig = ({ getConfig }) => {
  // Hack due to Tailwind ^1.1.0 using `reduce-css-calc` which assumes node
  // https://github.com/bradlc/babel-plugin-tailwind-components/issues/39#issuecomment-526892633
  const config = getConfig()
  config.node = {
    fs: "empty",
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ContentfulCaseStudy implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
      contentful_id: String!
      node_locale: String!
      title: String
      feature: Boolean
      slug: String
      overlayColor: String
      role: String
      body: ContentfulCaseStudyBody
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
      section1Body: ContentfulCaseStudySection1Body
      section2Body: ContentfulCaseStudySection2Body
      section3Body: ContentfulCaseStudySection3Body
      section4Body: ContentfulCaseStudySection4Body
      section5Body: ContentfulCaseStudySection5Body
      section6Body: ContentfulCaseStudySection6Body
      section7Body: ContentfulCaseStudySection7Body
      section8Body: ContentfulCaseStudySection8Body
      section9Body: ContentfulCaseStudySection9Body
      section10Body: ContentfulCaseStudySection10Body
      relatedStudies: [ContentfulCaseStudy] @link(by: "id", from: "relatedStudies___NODE")
      section1Media: ContentfulAsset @link(by: "id", from: "section1Media___NODE")
      section2Media: ContentfulAsset @link(by: "id", from: "section3Media___NODE")
      section3Media: ContentfulAsset @link(by: "id", from: "section3Media___NODE")
      section4Media: ContentfulAsset @link(by: "id", from: "section4Media___NODE")
      section5Media: ContentfulAsset @link(by: "id", from: "section5Media___NODE")
      section6Media: ContentfulAsset @link(by: "id", from: "section6Media___NODE")
      section7Media: ContentfulAsset @link(by: "id", from: "section7Media___NODE")
      section8Media: ContentfulAsset @link(by: "id", from: "section8Media___NODE")
      section9Media: ContentfulAsset @link(by: "id", from: "section9Media___NODE")
      section10Media: ContentfulAsset @link(by: "id", from: "section10Media___NODE")
      case_study_category: [ContentfulCaseStudyCategory] @link(by: "id", from: "case study category___NODE") @proxy(from: "case study category___NODE")
      spaceId: String
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulCaseStudySys
      priority: String
      videoUrl: String
      client: String
      credit: String
      creditLabel: String
      case_study: [ContentfulCaseStudy] @link(by: "id", from: "case study___NODE") @proxy(from: "case study___NODE")
      credit2: String
      credit2Label: String
    }
    type ContentfulCaseStudySys @derivedTypes {
      type: String
      revision: Int
      contentType: ContentfulCaseStudySysContentType
    }
    
    type ContentfulCaseStudySysContentType @derivedTypes {
      sys: ContentfulCaseStudySysContentTypeSys
    }
    
    type ContentfulCaseStudySysContentTypeSys {
      type: String
      linkType: String
      id: String
    }
    interface ContentfulReference {
      contentful_id: String!
      id: ID!
    }
    interface ContentfulEntry @nodeInterface {
      contentful_id: String!
      id: ID!
      node_locale: String!
    }
    type ContentfulCaseStudyBody {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    type ContentfulCaseStudySection1Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection2Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection3Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection4Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection5Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection6Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection7Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection8Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection9Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulCaseStudySection10Body {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    type ContentfulCaseStudyCategory implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
      contentful_id: String!
      node_locale: String!
      categoryName: String
      slug: String
      caseStudies: [ContentfulCaseStudy] @link(by: "id", from: "caseStudies___NODE")
      spaceId: String
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulCaseStudyCategorySys
    }
    
    type ContentfulCaseStudyCategorySys @derivedTypes {
      type: String
      revision: Int
      contentType: ContentfulCaseStudyCategorySysContentType
    }
    
    type ContentfulCaseStudyCategorySysContentType @derivedTypes {
      sys: ContentfulCaseStudyCategorySysContentTypeSys
    }
    
    type ContentfulCaseStudyCategorySysContentTypeSys {
      type: String
      linkType: String
      id: String
    }
    type ContentfulAsset implements ContentfulReference & Node @derivedTypes @dontInfer {
      contentful_id: String!
      spaceId: String
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      file: ContentfulAssetFile
      title: String
      description: String
      node_locale: String
      sys: ContentfulAssetSys
      localFile: File @link(by: "id", from: "localFile___NODE")
    }
    type ContentfulAssetFile @derivedTypes {
      url: String
      details: ContentfulAssetFileDetails
      fileName: String
      contentType: String
    }
    
    type ContentfulAssetFileDetails @derivedTypes {
      size: Int
      image: ContentfulAssetFileDetailsImage
    }
    
    type ContentfulAssetFileDetailsImage {
      width: Int
      height: Int
    }
    type ContentfulAssetSys {
      type: String
      revision: Int
    }
    `
  createTypes(typeDefs)
}