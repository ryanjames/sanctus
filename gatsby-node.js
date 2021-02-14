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
              Moods_Name
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
      const slug = slugify(playlist.node.data.Playlist_Name, { lower: true, strict: true })
      createPage({
        path: "/library/" + slug,
        component: path.resolve(`src/templates/library-playlist.tsx`),
        context: {
          id,
        },
      })
    })

    const genres = result.data.genres.edges
    genres.forEach(genre => {
      const id = genre.node.id
      const slug = slugify(genre.node.data.Genre_Name, { lower: true, strict: true })
      createPage({
        path: "/library/genre/" + slug,
        component: path.resolve(`src/templates/library-genre.tsx`),
        context: {
          id,
        },
      })
    })

    const vibes = result.data.vibes.edges
    vibes.forEach(vibe => {
      const id = vibe.node.id
      const slug = slugify(vibe.node.data.Vibe_Name, { lower: true, strict: true })
      createPage({
        path: "/library/vibe/" + slug,
        component: path.resolve(`src/templates/library-vibe.tsx`),
        context: {
          id,
        },
      })
    })

    const energies = result.data.energies.edges
    energies.forEach(energy => {
      const id = energy.node.id
      const slug = slugify(energy.node.data.Energy_Name, { lower: true, strict: true })
      createPage({
        path: "/library/energy/" + slug,
        component: path.resolve(`src/templates/library-energy.tsx`),
        context: {
          id,
        },
      })
    })

    const features = result.data.features.edges
    features.forEach(feature => {
      const id = feature.node.id
      const slug = slugify(feature.node.data.Feature_Name, { lower: true, strict: true })
      createPage({
        path: "/features/" + slug,
        component: path.resolve(`src/templates/feature.tsx`),
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
