"use client"

import { ArrowLeft, Filter, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/app-context"
import { mock50Restaurants } from "@/lib/mock-data-50-restaurants"

export default function CategoryPage() {
  const { state, dispatch } = useApp()

  const handleBack = () => {
    dispatch({ type: "NAVIGATE", payload: "home" })
  }

  // Mapeo de categorías del menú a categorías de restaurantes
  const categoryMap: Record<string, string> = {
    "farmacia": "Farmacia",
    "licores": "Licores",
    "super": "Supermercado",
    "turbo-market": "Supermercado",
    "restaurantes": "Hamburguesas|Pizzas|Sushi|Mexicana|Italiana|China|Pollo|Arepas|Mariscos",
    "mandados": "Comida Rápida",
  }

  const selectedCat = state.selectedCategory || ""
  const mappedCategory = categoryMap[selectedCat] || selectedCat

  const filteredRestaurants = mock50Restaurants.filter((restaurant) => {
    if (!selectedCat) return true
    
    // Si la categoría mapeada contiene "|", buscar en múltiples categorías
    if (mappedCategory.includes("|")) {
      const categories = mappedCategory.split("|")
      return categories.some(cat => restaurant.category.toLowerCase().includes(cat.toLowerCase()))
    }
    
    return restaurant.category.toLowerCase().includes(mappedCategory.toLowerCase())
  })

  const handleRestaurantClick = (restaurant: any) => {
    dispatch({ type: "SET_RESTAURANT", payload: restaurant })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "restaurantes":
        return "🍔"
      case "turbo-market":
        return "🛒"
      case "super":
        return "🏪"
      case "farmacia":
        return "💊"
      case "mandados":
        return "📦"
      case "licores":
        return "🍷"
      default:
        return "🏪"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Results */}
      <div className="px-4 py-4">
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredRestaurants.length} resultado{filteredRestaurants.length !== 1 ? "s" : ""} encontrado
            {filteredRestaurants.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
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
                    {restaurant.isPromoted && (
                      <Badge className="absolute top-2 left-2 bg-primary text-white text-xs shadow-sm">⭐ Destacado</Badge>
                    )}
                    {restaurant.deliveryTime.includes("10 min") && (
                      <Badge className="absolute bottom-2 left-2 bg-success text-white text-xs shadow-sm">
                        ⚡ Rápido
                      </Badge>
                    )}
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
      </div>
    </div>
  )
}
