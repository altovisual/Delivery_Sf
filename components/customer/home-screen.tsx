"use client"

import { useState } from "react"
import { Search, MapPin, Filter, Star, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { restaurants } from "@/lib/data"
import { useApp } from "@/lib/context"

const categories = ["Comida Rápida", "Farmacia", "Bodegón", "Pizzería", "Panadería", "Licorería"]

interface HomeScreenProps {
  onRestaurantSelect: (restaurantId: number) => void
  onNavigate: (page: string) => void
}

export default function HomeScreen({ onRestaurantSelect, onNavigate }: HomeScreenProps) {
  const { state } = useApp()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory =
      !selectedCategory || restaurant.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesSearch =
      !searchQuery ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Hola, {state.currentUser}</h1>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              San Felipe, YRY
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Busca restaurantes o productos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 border-0 rounded-full"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="whitespace-nowrap rounded-full"
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className="whitespace-nowrap rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Promoted Banner */}
      <div className="px-4 mb-4">
        <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">¡Envío Gratis!</h3>
                <p className="text-sm opacity-90">En pedidos mayores a $10</p>
              </div>
              <div className="text-3xl">🚚</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restaurant List */}
      <div className="px-4 pb-20">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          {selectedCategory ? `${selectedCategory}` : "Comercios Disponibles"}
        </h2>

        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onRestaurantSelect(restaurant.id)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={400}
                    height={120}
                    className="w-full h-32 object-cover"
                  />
                  {restaurant.isPromoted && <Badge className="absolute top-2 left-2 bg-red-500">Promocionado</Badge>}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600">{restaurant.category}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {restaurant.rating}
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {restaurant.deliveryTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron comercios</p>
            <p className="text-sm text-gray-400 mt-1">Intenta con otra búsqueda</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex-col h-auto py-2" onClick={() => onNavigate("home")}>
            <div className="w-6 h-6 bg-orange-500 rounded mb-1"></div>
            <span className="text-xs">Inicio</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2">
            <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
            <span className="text-xs">Buscar</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2" onClick={() => onNavigate("orders")}>
            <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
            <span className="text-xs">Pedidos</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2 relative" onClick={() => onNavigate("cart")}>
            <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
            <span className="text-xs">Carrito</span>
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
