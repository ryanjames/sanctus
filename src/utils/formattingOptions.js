import React from "react"
import InlinePlayer from "../components/InlinePlayer"
import ReactPlayer from "react-player"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

const formattingOptions = assets => {
  return {
    renderMark: {
      [MARKS.CODE]: node => {
        return (
          <div className="inline-video">
            <ReactPlayer url={node} controls={true} />
          </div>
        )
      },
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const linkedAsset = assets.filter(obj => {
          return obj.id == node.data.target.sys.id
        })
        if (linkedAsset[0]) {
          const asset = linkedAsset[0]
          const type = asset.type
          switch (true) {
            case type.includes("image"):
              return <img className="inline-image" src={asset.sizedUrl.src} alt={asset.title} />
            case type.includes("audio"):
              return (
                <InlinePlayer
                  track={{
                    id: asset.id,
                    title: asset.title,
                    length: "",
                    url: asset.url,
                    moods: [],
                    energy: {
                      name: "",
                      id: "",
                      slug: "",
                    },
                    priority: 0,
                  }}
                />
              )
            default:
              return null
          }
        }
      },
    },
  }
}

export default formattingOptions
