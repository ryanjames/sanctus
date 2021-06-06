declare module "hex2rgba"
declare module "stringquery"
declare module "gatsby-plugin-transition-link"

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
  logoAudioContext: AudioContext
  logoAudio: { [key: string]: any } = {}
  logoAudioReady: boolean
  muteAll: Function
  webkitAudioContext: typeof AudioContext
}

declare module "*.svg" {
  const content: any
  export default content
}
