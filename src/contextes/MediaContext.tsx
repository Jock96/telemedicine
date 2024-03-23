import React, { createContext, useContext } from 'react'
import { useMediaQuery } from '../hooks'

export interface IMediaContext {
  isMobile: boolean
  isTablet: boolean
  isNarrow: boolean
  isDesktop: boolean
  isWide: boolean
  isUltraWide: boolean
}

const MediaContext = createContext<IMediaContext>({
  isMobile: false,
  isTablet: false,
  isNarrow: false,
  isDesktop: true,
  isWide: true,
  isUltraWide: false,
})

const MediaContextProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isNarrow = useMediaQuery('(max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const isWide = useMediaQuery('(min-width: 1200px)')
  const isUltraWide = useMediaQuery('(min-width: 1400px)')
  return (
    <MediaContext.Provider
      value={{ isMobile, isTablet, isNarrow, isDesktop, isWide, isUltraWide }}
      children={children}
    />
  )
}

const useMediaContext = () => useContext(MediaContext)

export { MediaContextProvider, useMediaContext }
