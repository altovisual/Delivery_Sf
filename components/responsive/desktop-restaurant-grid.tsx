"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, DollarSign, MapPin } from "lucide-react"
import Image from "next/image"
import { mockRestaurants } from "@/lib/mock-data"

interface DesktopRestaurantGridProps {
  onRestaurantClick?: (restaurantId: string) => void
}

export default function DesktopRestaurantGrid({ onRestaurantClick }: DesktopRestaurantGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurantes Populares</h2>
          <p className="text-gray-600">Los favoritos de San Felipe</p>
        </div>
        <button className="text-red-500 hover:text-red-600 font-medium">Ver todos →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRestaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            className="group cursor-pointer hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            onClick={() => onRestaurantClick?.(restaurant.id)}
          >
            <CardContent className="p-0">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {restaurant.isTurbo && <Badge className="absolute top-3 left-3 bg-green-500 text-white">Turbo</Badge>}
                {restaurant.discount && (
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center py-2 font-medium text-sm">
                    {restaurant.discount}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 flex-1 mr-2">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{restaurant.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{restaurant.category}</p>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{restaurant.deliveryFee}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
