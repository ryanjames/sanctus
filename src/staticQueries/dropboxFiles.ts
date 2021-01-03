import { graphql, useStaticQuery } from "gatsby"

interface DropboxShape {
  name: string
  url: string
}

const dropboxFiles = (): DropboxShape => {
  const query = useStaticQuery(
    graphql`
      query DropboxQuery {
        query: allDropboxNode {
          edges {
            node {
              url
              name
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: DropboxData },
  } = query

  interface QueryShape {
    node: {
      url: string
      name: string
    }
  }

  const dropboxFilesModel = DropboxData.map((file: QueryShape) => ({
    name: file.node.name,
    url: file.node.url,
  }))

  return dropboxFilesModel
}

export default dropboxFiles
