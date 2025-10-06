"use client"

import type React from "react"

import { useApp } from "@/lib/app-context"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { state } = useApp()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (state.isTransitioning) {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [state.isTransitioning])

  // Ensure scroll to top when page changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [state.currentPage])

  return (
    <div
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: 'opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  )
}
