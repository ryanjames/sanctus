import React from "react"
import { Helmet } from "react-helmet"
import { DefaultsShape } from "../staticQueries/siteContent"

interface Props {
  title?: string
  description?: string
  owner?: string
  defaults: DefaultsShape
  ogImage?: string
  meta?: []
}

const SEO: React.FC<Props> = ({ defaults, ogImage, owner, title, meta, description }) => {
  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title ? title : defaults.title}
      titleTemplate={title ? `%s | ${defaults.title}` : defaults.title}
      meta={[
        {
          name: `description`,
          content: description ? description : defaults.description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description ? description : defaults.description,
        },
        {
          property: `og:image`,
          content: ogImage ? ogImage : defaults.ogImage,
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
          content: owner ? owner : defaults.owner,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description ? description : defaults.description,
        },
      ].concat(meta ? meta : [])}
    />
  )
}

export default SEO
