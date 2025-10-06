"use client"

import type React from "react"

import { ArrowLeft, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/lib/app-context"
import { mockRestaurants } from "@/lib/mock-data"

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
          <div className="space-y-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {favoriteRestaurants.length} Restaurante{favoriteRestaurants.length !== 1 ? "s" : ""} Favorito
                {favoriteRestaurants.length !== 1 ? "s" : ""}
              </h2>
            </div>

            {favoriteRestaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative">
                      <img
                        src={restaurant.image || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&h=120&fit=crop"}
                        alt={restaurant.name}
                        className="w-30 h-30 object-cover rounded-l-lg"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={(e) => toggleFavorite(restaurant.id, e)}
                      >
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      </Button>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{restaurant.category}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>⚡ {restaurant.deliveryTime}</span>
                        <span>💰 {restaurant.deliveryFee}</span>
                        <span>📍 {restaurant.distance}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
