"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardSidebar from "./dashboard-sidebar"
import DashboardHeader from "./dashboard-header"
import PageTransition from "@/components/ui/page-transition"
import { Toaster } from "@/components/ui/toaster"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) setSidebarOpen(false)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />

      <div
        className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ${sidebarOpen && !isMobile ? "ml-56" : "ml-0"}`}
      >
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-y-auto bg-gray-50 dashboard-main-content" data-scroll-container>
          <PageTransition>
            <div className="p-4 max-w-7xl mx-auto">{children}</div>
          </PageTransition>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
