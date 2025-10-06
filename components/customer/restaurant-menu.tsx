"use client"

import { useState } from "react"
import { ArrowLeft, Star, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { restaurants } from "@/lib/data"
import { useApp } from "@/lib/context"

interface RestaurantMenuProps {
  restaurantId: number
  onBack: () => void
  onNavigate: (page: string) => void
}

export default function RestaurantMenu({ restaurantId, onBack, onNavigate }: RestaurantMenuProps) {
  const { state, dispatch } = useApp()
  const restaurant = restaurants.find((r) => r.id === restaurantId)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  if (!restaurant) {
    return <div>Restaurante no encontrado</div>
  }

  const categories = [...new Set(restaurant.products.map((p) => p.category))]
  const filteredProducts = selectedCategory
    ? restaurant.products.filter((p) => p.category === selectedCategory)
    : restaurant.products

  const cartTotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product: any) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity: 1 } })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Restaurant Info */}
      <div className="relative">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              {restaurant.rating}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {restaurant.deliveryTime}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={selectedCategory === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("")}
            className="whitespace-nowrap"
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products List */}
      <div className="px-4 py-4 pb-32">
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full shadow-lg"
            onClick={() => onNavigate("cart")}
          >
            Ver Carrito ({cartItemsCount} items) - ${cartTotal.toFixed(2)}
          </Button>
        </div>
      )}
    </div>
  )
}
