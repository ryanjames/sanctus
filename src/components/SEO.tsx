import React from "react"
import { Helmet } from "react-helmet"
import siteContent from "../staticQueries/siteContent"

interface Props {
  title?: string
  description?: string
  owner?: string
  ogImage?: string
  meta?: []
}

const SEO: React.FC<Props> = ({ ogImage, owner, title, meta, description }) => {
  const content = siteContent()
  console.log(content.ogImage)
  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title ? title : content.title}
      titleTemplate={title ? `%s | ${content.title}` : content.title}
      meta={[
        {
          name: `description`,
          content: description ? description : content.description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description ? description : content.description,
        },
        {
          property: `og:image`,
          content: ogImage ? ogImage : content.ogImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: owner ? owner : content.owner,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description ? description : content.description,
        },
      ].concat(meta ? meta : [])}
    />
  )
}

export default SEO
