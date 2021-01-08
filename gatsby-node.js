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
      vibes: allAirtable(filter: { table: { eq: "Vibes" } }) {
        edges {
          node {
            id
            data {
              Vibe_Name
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
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const playlists = result.data.playlists.edges
    playlists.forEach(playlist => {
      const id = playlist.node.id
      const slug = slugify(playlist.node.data.Playlist_Name, { lower: true })
      createPage({
        path: "/library/" + slug,
        component: path.resolve(`src/templates/library-playlist.tsx`),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    const genres = result.data.genres.edges
    genres.forEach(genre => {
      const id = genre.node.id
      const slug = slugify(genre.node.data.Genre_Name, { lower: true })
      createPage({
        path: "/library/genre/" + slug,
        component: path.resolve(`src/templates/library-genre.tsx`),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    const vibes = result.data.vibes.edges
    vibes.forEach(vibe => {
      const id = vibe.node.id
      const slug = slugify(vibe.node.data.Vibe_Name, { lower: true })
      createPage({
        path: "/library/vibe/" + slug,
        component: path.resolve(`src/templates/library-vibe.tsx`),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    const energies = result.data.energies.edges
    energies.forEach(energy => {
      const id = energy.node.id
      const slug = slugify(energy.node.data.Energy_Name, { lower: true })
      createPage({
        path: "/library/energy/" + slug,
        component: path.resolve(`src/templates/library-energy.tsx`),
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
    fs: "empty",
  }
}
