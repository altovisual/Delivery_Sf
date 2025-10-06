"use client"

import { Star, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardPremiumProps {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  rating?: number
  onClick?: () => void
  onAddToCart?: () => void
  className?: string
}

export default function ProductCardPremium({
  name,
  description,
  price,
  originalPrice,
  discount,
  image,
  rating,
  onClick,
  onAddToCart,
  className,
}: ProductCardPremiumProps) {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Imagen del producto */}
      <div className="relative h-32 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge de descuento */}
        {discount && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            -{discount}%
          </div>
        )}
        
        {/* Rating */}
        {rating && (
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-gray-900">{rating}</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {name}
        </h3>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart?.()
            }}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 active:scale-90 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Efecto de brillo al hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </div>
  )
}
