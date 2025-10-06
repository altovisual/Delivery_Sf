"use client"

import { Home, Tag, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomNavigationProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export default function BottomNavigation({ activeTab = "inicio", onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "ofertas", label: "Ofertas", icon: Tag },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "cuenta", label: "Cuenta", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              className="flex-col h-auto py-2 px-3"
              onClick={() => onTabChange?.(tab.id)}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-red-500" : "text-gray-400"}`} />
              <span className={`text-xs ${isActive ? "text-red-500 font-medium" : "text-gray-600"}`}>{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
