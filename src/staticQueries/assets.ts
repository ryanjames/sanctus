import { graphql, useStaticQuery } from "gatsby"
import { AssetShape } from "../models/asset"

const assets = (): AssetShape => {
  const query = useStaticQuery(
    graphql`
      query {
        query: allContentfulAsset {
          edges {
            node {
              title
              contentful_id
              fixed(width: 1600) {
                src
              }
              file {
                contentType
                url
              }
            }
          }
        }
      }
    `
  )
  const {
    query: { edges: AssetsData },
  } = query

  const Assets = AssetsData.map((asset: any) => ({
    id: asset.node.contentful_id,
    title: asset.node.title,
    type: asset.node.file.contentType,
    url: asset.node.file.url,
    sizedUrl: asset.node.fixed,
  }))

  Assets.push(Assets.shift())

  return Assets
}

export default assets
