"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Check for scroll position in different containers
      const scrollContainers = [
        document.querySelector(".mobile-main-content"),
        document.querySelector(".desktop-main-content"),
        document.querySelector(".dashboard-main-content"),
        document.querySelector("[data-scroll-container]"),
      ]

      let shouldShow = false

      // Check window scroll first
      if (window.scrollY > 300) {
        shouldShow = true
      }

      // Check container scrolls
      scrollContainers.forEach((container) => {
        if (container && container.scrollTop > 300) {
          shouldShow = true
        }
      })

      setIsVisible(shouldShow)
    }

    // Add listeners to window and all scroll containers
    window.addEventListener("scroll", toggleVisibility)

    const scrollContainers = [
      document.querySelector(".mobile-main-content"),
      document.querySelector(".desktop-main-content"),
      document.querySelector(".dashboard-main-content"),
      document.querySelector("[data-scroll-container]"),
    ]

    scrollContainers.forEach((container) => {
      if (container) {
        container.addEventListener("scroll", toggleVisibility)
      }
    })

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      scrollContainers.forEach((container) => {
        if (container) {
          container.removeEventListener("scroll", toggleVisibility)
        }
      })
    }
  }, [])

  const scrollToTop = () => {
    // Force scroll to top on all possible containers
    window.scrollTo({ top: 0, behavior: "smooth" })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const scrollContainers = [
      document.querySelector(".mobile-main-content"),
      document.querySelector(".desktop-main-content"),
      document.querySelector(".dashboard-main-content"),
      document.querySelector("[data-scroll-container]"),
    ]

    scrollContainers.forEach((container) => {
      if (container) {
        container.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      className="fixed bottom-24 right-4 z-50 rounded-full w-12 h-12 shadow-lg md:bottom-8 bg-blue-600 hover:bg-blue-700"
      onClick={scrollToTop}
      size="icon"
      variant="default"
    >
      <ChevronUp className="h-4 w-4 text-white" />
    </Button>
  )
}
