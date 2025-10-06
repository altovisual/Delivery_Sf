"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  image: string
  originalPrice: number
  discountedPrice: number
  discount: number
}

interface ProductGridProps {
  products?: Product[]
  onProductClick?: (productId: string) => void
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Combo Burger Deluxe",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop",
    originalPrice: 22.99,
    discountedPrice: 14.99,
    discount: 35,
  },
  {
    id: "2",
    name: "Pizza Familiar 50% OFF",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
    originalPrice: 49.99,
    discountedPrice: 24.99,
    discount: 50,
  },
  {
    id: "3",
    name: "Kit Vitaminas",
    image: "https://images.unsplash.com/photo-1550572017-4a6e8c3f9a0d?w=300&h=200&fit=crop",
    originalPrice: 19.99,
    discountedPrice: 12.99,
    discount: 35,
  },
  {
    id: "4",
    name: "Sushi Box Premium",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
    originalPrice: 44.99,
    discountedPrice: 29.99,
    discount: 33,
  },
]

export default function ProductGrid({ products = defaultProducts, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onProductClick?.(product.id)}
        >
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <Badge className="absolute top-2 left-2 bg-destructive text-white font-bold rounded-full px-3 py-1 shadow-md">
                -{product.discount}%
              </Badge>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">${product.discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
