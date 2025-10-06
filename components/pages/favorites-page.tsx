"use client"

import type React from "react"

import { ArrowLeft, Heart, Star, Clock, DollarSign, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/lib/app-context"
import { mockRestaurants } from "@/lib/mock-data"
import Image from "next/image"

export default function FavoritesPage() {
  const { state, dispatch } = useApp()

  const handleBack = () => {
    dispatch({ type: "NAVIGATE", payload: "home" })
  }

  const favoriteRestaurants = mockRestaurants.filter((restaurant) => state.favorites.includes(restaurant.id))

  const handleRestaurantClick = (restaurant: any) => {
    dispatch({ type: "SET_RESTAURANT", payload: restaurant })
  }

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({ type: "TOGGLE_FAVORITE", payload: id })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="px-4 py-4">
        {favoriteRestaurants.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No tienes favoritos aún</h2>
            <p className="text-gray-600 mb-6">Agrega restaurantes a tus favoritos para verlos aquí</p>
            <Button onClick={handleBack} className="bg-red-500 hover:bg-red-600">
              Explorar Restaurantes
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                <div className="flex gap-4 p-3">
                  {/* Imagen mejorada */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={restaurant.image || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop"}
                        alt={restaurant.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    {/* Botón de favorito mejorado */}
                    <button
                      onClick={(e) => toggleFavorite(restaurant.id, e)}
                      className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </button>
                    {/* Badge de promoción si aplica */}
                    {restaurant.isPromoted && (
                      <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        Destacado
                      </div>
                    )}
                  </div>

                  {/* Información del restaurante */}
                  <div className="flex-1 min-w-0">
                    {/* Header con nombre y rating */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-base text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg flex-shrink-0">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-900">{restaurant.rating}</span>
                      </div>
                    </div>

                    {/* Categoría */}
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">{restaurant.category}</p>

                    {/* Info con iconos */}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{restaurant.deliveryFee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
