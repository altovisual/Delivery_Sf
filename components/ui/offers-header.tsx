"use client"

import { Button } from "@/components/ui/button"

interface OffersHeaderProps {
  onViewMore?: () => void
}

export default function OffersHeader({ onViewMore }: OffersHeaderProps) {
  return (
    <div className="flex items-center justify-between my-6 relative">
      {/* Decorative confetti */}
      <div className="absolute -top-2 left-20 w-2 h-2 bg-yellow-400 rounded-full"></div>
      <div className="absolute -top-1 left-32 w-1 h-1 bg-blue-400 rounded-full"></div>
      <div className="absolute top-1 right-20 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
      <div className="absolute -top-3 right-32 w-1 h-1 bg-green-400 rounded-full"></div>

      {/* Speech bubble */}
      <div className="relative">
        <div className="bg-blue-500 text-yellow-400 font-bold text-sm px-4 py-2 rounded-2xl rounded-bl-none">
          OFERTAS DEL DÍA
        </div>
        <div className="absolute -bottom-1 left-0 w-0 h-0 border-l-8 border-l-blue-500 border-t-4 border-t-transparent"></div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="bg-gray-100 border-gray-200 text-gray-700 rounded-full px-4"
        onClick={onViewMore}
      >
        Ver más
      </Button>
    </div>
  )
}
