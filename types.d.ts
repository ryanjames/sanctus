declare module "hex2rgba"
declare module "stringquery"

interface Window {
  player: {
    destroy: Function
    init: Function
    load: Function
    on: Function
    play: Function
    pause: Function
    getDuration: Function
    id?: string
  }
}

declare module "*.svg" {
  const content: any
  export default content
}