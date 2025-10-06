"use client"

import { Zap, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TurboSectionHeaderProps {
  onBackToTop?: () => void
}

export default function TurboSectionHeader({ onBackToTop }: TurboSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between my-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-lg text-gray-900">Turbo</span>
          <span className="text-lg text-gray-900">Restaurantes</span>
        </div>
        <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          <Zap className="w-3 h-3 mr-1" />
          En 10 min
        </Badge>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="bg-gray-800 text-white border-gray-800 hover:bg-gray-700 rounded-full px-3 py-1 text-xs"
        onClick={onBackToTop}
      >
        <ArrowUp className="w-3 h-3 mr-1" />
        Volver arriba
      </Button>
    </div>
  )
}
