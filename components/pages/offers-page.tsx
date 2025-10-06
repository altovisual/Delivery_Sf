"use client"

import { ArrowLeft, Tag, Clock, Flame, TrendingDown, Sparkles, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/app-context"
import { mockOffers } from "@/lib/mock-data"
import Image from "next/image"

export default function OffersPage() {
  const { dispatch } = useApp()

  const handleBack = () => {
    dispatch({ type: "NAVIGATE", payload: "home" })
  }

  const handleOfferClick = (offer: any) => {
    dispatch({ type: "SET_PRODUCT", payload: offer })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header destacado */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 px-4 pt-6 pb-8 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Ofertas del Día</h1>
            <p className="text-white/90 text-sm">Los mejores descuentos solo por hoy</p>
          </div>
        </div>
        
        {/* Contador de tiempo */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-white" />
          <div className="flex-1">
            <p className="text-white text-xs font-medium">Termina en</p>
            <p className="text-white text-sm font-bold">23:45:12</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs">{mockOffers.length} ofertas</p>
            <p className="text-white text-sm font-bold">disponibles</p>
          </div>
        </div>
      </div>

      {/* Offers Grid mejorado */}
      <div className="px-4">
        <div className="grid grid-cols-1 gap-4 mb-6">
          {mockOffers.map((offer, index) => (
            <div
              key={offer.id}
              onClick={() => handleOfferClick(offer)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer group"
            >
              <div className="flex gap-3 p-3">
                {/* Imagen mejorada */}
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={offer.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"}
                      alt={offer.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {/* Badge de descuento mejorado */}
                  <div className="absolute -top-1 -left-1 bg-gradient-to-br from-red-500 to-pink-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -{offer.discount}%
                  </div>
                </div>

                {/* Información */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  {/* Descripción */}
                  <div>
                    <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">
                      {offer.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Válido hoy</span>
                    </div>
                  </div>

                  {/* Precio y botón */}
                  <div className="flex items-end justify-between gap-2 mt-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-green-600">${offer.price}</span>
                        {offer.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">${offer.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-green-600 font-medium">
                        Ahorras ${(offer.originalPrice - offer.price).toFixed(2)}
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-95">
                      <ShoppingCart className="w-4 h-4" />
                      Ordenar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Section mejorada */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Ofertas por Categoría</h2>
            <button className="text-xs text-red-600 font-semibold">Ver todas →</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Comida Rápida", emoji: "🍔", color: "from-orange-100 to-orange-50", textColor: "text-orange-600" },
              { name: "Pizzas", emoji: "🍕", color: "from-red-100 to-red-50", textColor: "text-red-600" },
              { name: "Farmacia", emoji: "💊", color: "from-blue-100 to-blue-50", textColor: "text-blue-600" },
              { name: "Súper", emoji: "🛒", color: "from-green-100 to-green-50", textColor: "text-green-600" }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => dispatch({ type: "SET_CATEGORY", payload: category.name })}
                className="group bg-white rounded-xl p-4 hover:shadow-md transition-all active:scale-95"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{category.emoji}</span>
                </div>
                <h3 className={`font-bold text-sm ${category.textColor} mb-1`}>{category.name}</h3>
                <p className="text-xs text-gray-500">Ver ofertas</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
