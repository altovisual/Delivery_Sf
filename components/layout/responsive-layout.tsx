"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import DesktopSidebar from "./desktop-sidebar"
import MobileBottomNav from "./mobile-bottom-nav"
import DesktopHeader from "./desktop-header"
import MobileHeader from "./mobile-header"
import PageTransition from "@/components/ui/page-transition"

interface ResponsiveLayoutProps {
  children: React.ReactNode
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(true) // Default to mobile for SSR
  const { state } = useApp()

  useEffect(() => {
    const checkDevice = () => {
      // iPads and tablets use mobile layout with tablet optimizations
      // Support all iPad dimensions including landscape orientation
      const width = window.innerWidth
      const shouldBeMobile = width < 1400 // Increased to support iPad Pro landscape (1366px)
      setIsMobile(shouldBeMobile)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    window.addEventListener("orientationchange", checkDevice)
    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
    }
  }, [])

  if (isMobile) {
    // Ajustar padding según la página - responsive para tablets
    const getPaddingTop = () => {
      if (state.currentPage === "home") return "pt-0"
      if (state.currentPage === "category") return "pt-[120px] md:pt-[140px]" // Header + chips (más alto en tablets)
      return "pt-[60px] md:pt-[72px]" // Solo header simple (más alto en tablets)
    }
    
    return (
      <div className="min-h-screen bg-muted/30 overflow-hidden">
        <MobileHeader />
        <div className={`h-screen ${getPaddingTop()} pb-24 md:pb-28 overflow-y-auto mobile-main-content scrollbar-hide`} data-scroll-container>
          <PageTransition>{children}</PageTransition>
        </div>
        <MobileBottomNav />
      </div>
    )
  }

  return (
    <div className="h-screen bg-muted/30 flex overflow-hidden">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <DesktopHeader />
        <div className="flex-1 overflow-y-auto bg-muted/30 desktop-main-content scrollbar-hide" data-scroll-container>
          <PageTransition>{children}</PageTransition>
        </div>
      </div>
    </div>
  )
}
