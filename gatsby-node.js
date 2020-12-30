const path = require('path')
const slugify = require('slugify')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      genres: allAirtable(filter: { table: { eq: "Genres" } }) {
        edges {
          node {
            id
            data {
              Genre_Name
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const genres = result.data.genres.edges

    genres.forEach(genre => {
      const id = genre.node.id
      const slug = slugify(genre.node.data.Genre_Name, { lower: true })
      createPage({
        path: "/library/" + slug,
        component: path.resolve(`src/templates/library-genre.tsx`),
        // additional data can be passed via context
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
    fs: 'empty',
  }
}