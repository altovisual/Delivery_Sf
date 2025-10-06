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
  const [isMobile, setIsMobile] = useState(false)
  const { state } = useApp()

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  if (isMobile) {
    // Ajustar padding según la página
    const getPaddingTop = () => {
      if (state.currentPage === "home") return "pt-0"
      if (state.currentPage === "category") return "pt-[120px]" // Header + chips
      return "pt-[60px]" // Solo header simple
    }
    
    return (
      <div className="min-h-screen bg-muted/30 overflow-hidden">
        <MobileHeader />
        <div className={`h-screen ${getPaddingTop()} pb-24 overflow-y-auto mobile-main-content scrollbar-hide`} data-scroll-container>
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
