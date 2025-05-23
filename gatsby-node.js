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