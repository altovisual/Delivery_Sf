"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { mockOffers } from "@/lib/mock-data"
import { useApp } from "@/lib/app-context"

export default function DesktopOffersSection() {
  const { dispatch } = useApp()

  const handleOfferClick = (offer: any) => {
    dispatch({ type: "SET_PRODUCT", payload: offer })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🔥 Ofertas del Día</h2>
          <p className="text-gray-600">Descuentos increíbles por tiempo limitado</p>
        </div>
        <Button
          variant="outline"
          onClick={() => dispatch({ type: "NAVIGATE", payload: "ofertas" })}
          className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
        >
          Ver todas las ofertas →
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOffers.map((offer) => (
          <Card
            key={offer.id}
            className="group cursor-pointer hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            onClick={() => handleOfferClick(offer)}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-red-500 text-white font-bold text-lg px-3 py-2">
                  -{offer.discount}%
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">{offer.name}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-green-600">${offer.price}</span>
                    {offer.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${offer.originalPrice}</span>
                    )}
                  </div>
                  <Button className="bg-red-500 hover:bg-red-600">Ordenar Ahora</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
