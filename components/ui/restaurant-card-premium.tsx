"use client"

import { Star, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface RestaurantCardPremiumProps {
  id: string
  name: string
  category: string
  rating: number
  deliveryTime: string
  deliveryFee?: string
  distance?: string
  image: string
  isPromoted?: boolean
  discount?: string
  onClick?: () => void
  className?: string
}

export default function RestaurantCardPremium({
  name,
  category,
  rating,
  deliveryTime,
  deliveryFee,
  distance,
  image,
  isPromoted,
  discount,
  onClick,
  className,
}: RestaurantCardPremiumProps) {
  return (
    <div
      className={cn(
        "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100",
        className
      )}
      onClick={onClick}
    >
      {/* Imagen */}
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge Destacado */}
        {isPromoted && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            ⭐ Destacado
          </div>
        )}
        
        {/* Descuento */}
        {discount && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            {discount}
          </div>
        )}

        {/* Rating flotante */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{category}</p>

        {/* Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-medium">{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-semibold">{deliveryFee}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span className="font-medium">{distance}</span>
          </div>
        </div>
      </div>

      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </div>
  )
}
