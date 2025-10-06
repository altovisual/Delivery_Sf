"use client"

import { ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/app-context"
import { mockOffers } from "@/lib/mock-data"

export default function OffersPage() {
  const { dispatch } = useApp()

  const handleBack = () => {
    dispatch({ type: "NAVIGATE", payload: "home" })
  }

  const handleOfferClick = (offer: any) => {
    dispatch({ type: "SET_PRODUCT", payload: offer })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Offers Grid */}
      <div className="px-4 py-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">🔥 Ofertas del Día</h2>
          <p className="text-gray-600">Los mejores descuentos solo por hoy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockOffers.map((offer) => (
            <Card
              key={offer.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleOfferClick(offer)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={offer.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=150&fit=crop"}
                    alt={offer.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white font-bold text-sm px-3 py-1">
                    -{offer.discount}%
                  </Badge>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-green-600">${offer.price}</span>
                      {offer.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${offer.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600">
                      Ordenar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ofertas por Categoría</h2>
          <div className="grid grid-cols-2 gap-4">
            {["Comida Rápida", "Pizzas", "Farmacia", "Súper"].map((category) => (
              <Card
                key={category}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => dispatch({ type: "SET_CATEGORY", payload: category })}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">
                    {category === "Comida Rápida" && "🍔"}
                    {category === "Pizzas" && "🍕"}
                    {category === "Farmacia" && "💊"}
                    {category === "Súper" && "🛒"}
                  </div>
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                  <p className="text-xs text-gray-600 mt-1">Ver ofertas</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
