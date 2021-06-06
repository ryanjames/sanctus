// Settings Context - src/context/Settings
import * as React from "react"

export const LogoAudioContext = React.createContext(null)

const LogoAudioProvider: React.FC = ({ children }) => {
  const [logoAudio] = React.useState(new (window.AudioContext || window.webkitAudioContext)())

  return <LogoAudioContext.Provider value={{ logoAudio }}>{children}</LogoAudioContext.Provider>
}

export default LogoAudioProvider
