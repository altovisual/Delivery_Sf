"use client"

import HomePagePremium from "@/components/pages/home-page-premium"
import HomeDesktopPremium from "@/components/pages/home-desktop-premium"

export default function ResponsiveHome() {
  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden">
        <HomePagePremium />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <HomeDesktopPremium />
      </div>
    </>
  )
}
