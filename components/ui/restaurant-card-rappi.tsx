"use client"

import { Star, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface RestaurantCardRappiProps {
  id: string
  name: string
  category: string
  rating: number
  deliveryTime: string
  deliveryFee?: string
  image: string
  isPromoted?: boolean
  discount?: string
  onClick?: () => void
  className?: string
}

export default function RestaurantCardRappi({
  name,
  category,
  rating,
  deliveryTime,
  deliveryFee,
  image,
  isPromoted,
  discount,
  onClick,
  className,
}: RestaurantCardRappiProps) {
  return (
    <div
      className={cn(
        "group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      {/* Imagen grande */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge Envío Gratis */}
        {isPromoted && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-xs font-bold text-gray-900">Envío Gratis</span>
          </div>
        )}
        
        {/* Badge Descuento */}
        {discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            {discount}
          </div>
        )}
        
        {/* Rating flotante */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{category}</p>

        {/* Info inferior */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime}</span>
          </div>
          {deliveryFee && (
            <span className="font-semibold text-gray-900">{deliveryFee}</span>
          )}
        </div>
      </div>
    </div>
  )
}
