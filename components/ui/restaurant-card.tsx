"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, DollarSign, MapPin } from "lucide-react"

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: string
  deliveryFee?: string
  distance?: string
  discount?: string
  isTurbo?: boolean
  onClick?: (id: string) => void
}

export default function RestaurantCard({
  id,
  name,
  image,
  rating,
  deliveryTime,
  deliveryFee,
  distance,
  discount = "Hasta 60% Off",
  isTurbo = true,
  onClick,
}: RestaurantCardProps) {
  return (
    <Card
      className="w-80 flex-shrink-0 border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick?.(id)}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative h-32">
          <img
            src={image || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=320&h=128&fit=crop"}
            alt={name}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {isTurbo && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg">Turbo</Badge>
          )}
        </div>

        {/* Discount Banner */}
        <div className="bg-blue-500 text-white text-center py-2 font-medium text-sm">{discount}</div>

        {/* Content Section */}
        <div className="p-4 bg-white">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-900 flex-1 mr-2">{name}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-green-500" />
              <span>{deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{deliveryFee}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{distance}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
