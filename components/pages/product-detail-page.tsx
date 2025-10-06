"use client"

import { useState } from "react"
import { ArrowLeft, Star, Heart, Share, Plus, Minus, TrendingDown, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/app-context"
import Image from "next/image"

export default function ProductDetailPage() {
  const { state, dispatch } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])

  const handleBack = () => {
    if (state.selectedRestaurant) {
      dispatch({ type: "NAVIGATE", payload: "restaurant" })
    } else {
      dispatch({ type: "NAVIGATE", payload: "home" })
    }
  }

  const toggleFavorite = () => {
    if (state.selectedProduct) {
      dispatch({ type: "TOGGLE_FAVORITE", payload: state.selectedProduct.id })
    }
  }

  const addToCart = () => {
    if (state.selectedProduct) {
      const productWithCustomizations = {
        ...state.selectedProduct,
        customizations: {
          size: selectedSize,
          extras: selectedExtras,
        },
        price: calculateTotalPrice(),
      }
      dispatch({ type: "ADD_TO_CART", payload: { product: productWithCustomizations, quantity } })

      // Show success message or navigate to cart
      dispatch({ type: "NAVIGATE", payload: "cart" })
    }
  }

  const calculateTotalPrice = () => {
    if (!state.selectedProduct) return 0

    let basePrice = state.selectedProduct.price

    // Size adjustments
    if (selectedSize === "large") basePrice += 2
    if (selectedSize === "small") basePrice -= 1

    // Extras
    const extrasPrice = selectedExtras.length * 1.5

    return basePrice + extrasPrice
  }

  if (!state.selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Producto no encontrado</h2>
          <Button onClick={() => dispatch({ type: "NAVIGATE", payload: "home" })}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  const product = state.selectedProduct
  const isFavorite = state.favorites.includes(product.id)
  const totalPrice = calculateTotalPrice()

  const sizes = [
    { id: "small", name: "Pequeño", price: -1 },
    { id: "medium", name: "Mediano", price: 0 },
    { id: "large", name: "Grande", price: 2 },
  ]

  const extras = [
    { id: "extra-cheese", name: "Queso extra", price: 1.5 },
    { id: "bacon", name: "Bacon", price: 1.5 },
    { id: "avocado", name: "Aguacate", price: 1.5 },
    { id: "extra-sauce", name: "Salsa extra", price: 1.5 },
  ]

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) => (prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]))
  }

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Product Image - Full width sin espacio */}
      <div className="relative bg-gray-100">
        <Image
          src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"}
          alt={product.name}
          width={800}
          height={600}
          className="w-full h-80 object-cover"
          priority
        />
        
        {/* Botones flotantes sobre la imagen */}
        <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
          <button 
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={toggleFavorite}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"}`} />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-95 transition-transform">
              <Share className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Badge de descuento mejorado */}
        {product.discount && (
          <div className="absolute top-16 left-3 bg-gradient-to-br from-red-500 to-pink-600 text-white font-bold text-sm px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4" />
            -{product.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Info - Compacto estilo Rappi */}
      <div className="px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="font-semibold text-sm">{product.rating}</span>
            <span className="text-xs text-gray-500">(124 reseñas)</span>
          </div>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{product.category}</span>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-sm text-green-600 font-medium">
              Ahorras ${(product.originalPrice - totalPrice).toFixed(2)} ({product.discount}%)
            </p>
          )}
        </div>

        <Separator />

        {/* Tamaño */}
        <div className="mt-6">
          <h3 className="font-bold text-base mb-3 flex items-center gap-2">
            Tamaño
            <span className="text-xs font-normal text-gray-500">(Requerido)</span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`relative py-3 px-2 rounded-xl border-2 text-center transition-all ${
                  selectedSize === size.id
                    ? "border-red-500 bg-red-50 text-red-600 shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {selectedSize === size.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="font-semibold text-sm">{size.name}</div>
                <div className="text-xs mt-0.5">
                  {size.price === 0 ? "Incluido" : `${size.price > 0 ? "+" : ""}$${Math.abs(size.price)}`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="mt-6">
          <h3 className="font-bold text-base mb-3 flex items-center gap-2">
            Extras
            <span className="text-xs font-normal text-gray-500">(Opcional)</span>
          </h3>
          <div className="space-y-2">
            {extras.map((extra) => (
              <label 
                key={extra.id} 
                className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedExtras.includes(extra.id)
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    selectedExtras.includes(extra.id)
                      ? "border-red-500 bg-red-500"
                      : "border-gray-300"
                  }`}>
                    {selectedExtras.includes(extra.id) && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm">{extra.name}</span>
                </div>
                <span className="text-green-600 font-semibold text-sm">+${extra.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Controles de cantidad en la página */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Cantidad</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-bold w-10 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-full border-2 border-red-500 bg-red-500 text-white flex items-center justify-center active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Botón flotante compacto - Estilo Rappi */}
      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
        <button
          onClick={addToCart}
          className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white pl-5 pr-6 py-3.5 rounded-full font-bold text-base shadow-2xl hover:shadow-3xl active:scale-95 transition-all flex items-center gap-3"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {quantity > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-white text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                {quantity}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs opacity-90 leading-none">Ver Carrito</span>
            <span className="text-lg font-bold leading-tight">${(totalPrice * quantity).toFixed(2)}</span>
          </div>
        </button>
      </div>
    </div>
  )
}
