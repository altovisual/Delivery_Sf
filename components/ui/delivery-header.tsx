"use client"

import { MapPin, ChevronDown } from "lucide-react"

interface DeliveryHeaderProps {
  address?: string
  city?: string
  onLocationClick?: () => void
}

export default function DeliveryHeader({
  address = "Av. La Patria 123",
  city = "San Felipe",
  onLocationClick,
}: DeliveryHeaderProps) {
  return (
    <div className="flex items-center gap-3 cursor-pointer" onClick={onLocationClick}>
      <MapPin className="w-5 h-5 text-red-500 flex-shrink-0" />
      <div className="flex-1">
        <div className="font-bold text-gray-900 text-sm leading-tight">{address}</div>
        <div className="text-xs text-gray-600">{city}</div>
      </div>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>
  )
}
