"use client"

import { useState } from "react"
import { ArrowLeft, Star, Heart, Share, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/app-context"

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
      <div className="relative">
        <img
          src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"}
          alt={product.name}
          className="w-full h-80 object-cover"
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

        {/* Badge de descuento */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white font-bold text-sm px-2.5 py-1 rounded-full shadow-lg">
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

        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        <Separator />

        {/* Tamaño */}
        <div className="mt-6">
          <h3 className="font-bold text-base mb-3">Tamaño</h3>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`py-3 px-2 rounded-lg border-2 text-center transition-all ${
                  selectedSize === size.id
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
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
          <h3 className="font-bold text-base mb-3">Extras</h3>
          <div className="space-y-2">
            {extras.map((extra) => (
              <label 
                key={extra.id} 
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg active:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                    className="w-5 h-5 text-orange-500 rounded accent-orange-500"
                  />
                  <span className="font-medium text-sm">{extra.name}</span>
                </div>
                <span className="text-green-600 font-semibold text-sm">+${extra.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Fixed Bottom Bar - Estilo Rappi */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Cantidad</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-bold w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border-2 border-orange-500 bg-orange-500 text-white flex items-center justify-center active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={addToCart}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-bold text-base shadow-lg active:scale-98 transition-transform flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar ${(totalPrice * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  )
}
