declare module "remark-parse"
declare module "remark-rehype"
declare module "rehype-stringify"
declare module "react-wavesurfer"

interface Window {
  player: {
    destroy: Function
    init: Function
    load: Function
    on: Function
    play: Function
    pause: Function
  }
}

declare module "*.svg" {
  const content: any
  export default content
}