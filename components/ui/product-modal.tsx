"use client"

import { useState } from "react"
import { X, Minus, Plus } from "lucide-react"
import { useApp } from "@/lib/app-context"

interface ProductModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { dispatch } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [selectedBase, setSelectedBase] = useState("Pan de Ajo")
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])

  // Opciones de base
  const baseOptions = [
    { id: "ajo", name: "Pan de Ajo", price: 0 },
    { id: "oregano", name: "Pan de Orégano Parmesano", price: 0 },
    { id: "blanco", name: "Pan Blanco", price: 0 },
    { id: "integral", name: "Pan Integral", price: 0 },
  ]

  // Opciones de extras
  const extraOptions = [
    { id: "queso", name: "Queso extra", price: 2.5 },
    { id: "aguacate", name: "Aguacate", price: 3.0 },
    { id: "tocineta", name: "Tocineta", price: 2.0 },
    { id: "cebolla", name: "Cebolla caramelizada", price: 1.5 },
    { id: "jalapeño", name: "Jalapeños", price: 1.0 },
    { id: "pepinillos", name: "Pepinillos", price: 1.0 },
  ]

  // Calcular precio total
  const extrasPrice = selectedExtras.reduce((sum, extraId) => {
    const extra = extraOptions.find(e => e.id === extraId)
    return sum + (extra?.price || 0)
  }, 0)

  const totalPrice = (product.price + extrasPrice) * quantity

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    )
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: {
          ...product,
          customization: {
            base: selectedBase,
            extras: selectedExtras,
          },
        },
        quantity,
      },
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Imagen del producto */}
          <div className="relative h-64 bg-gray-100">
            <img
              src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Título y precio */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-lg font-bold text-gray-900 mb-3">
                $ {product.price.toFixed(3)}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Elige tu Base */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Elige tu Base</h3>
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Obligatorio
                </span>
              </div>

              <div className="space-y-3">
                {baseOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                    style={{
                      borderColor: selectedBase === option.name ? "#FF6B35" : "#E5E7EB",
                      backgroundColor: selectedBase === option.name ? "#FFF7F5" : "white",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="base"
                        checked={selectedBase === option.name}
                        onChange={() => setSelectedBase(option.name)}
                        className="w-5 h-5 text-orange-500 accent-orange-500"
                      />
                      <span className="font-medium text-gray-900">{option.name}</span>
                    </div>
                    {option.price > 0 && (
                      <span className="text-sm font-semibold text-gray-600">
                        +${option.price.toFixed(2)}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Extras opcionales */}
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Extras</h3>
                <p className="text-sm text-gray-600">Selecciona los que desees</p>
              </div>

              <div className="space-y-3">
                {extraOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                    style={{
                      borderColor: selectedExtras.includes(option.id) ? "#FF6B35" : "#E5E7EB",
                      backgroundColor: selectedExtras.includes(option.id) ? "#FFF7F5" : "white",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedExtras.includes(option.id)}
                        onChange={() => toggleExtra(option.id)}
                        className="w-5 h-5 text-orange-500 rounded accent-orange-500"
                      />
                      <span className="font-medium text-gray-900">{option.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      +${option.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo */}
        <div className="border-t border-gray-200 bg-white p-4 space-y-3">
          {/* Control de cantidad */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Cantidad</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-orange-500 border-2 border-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Agregar y seguir comprando
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
            >
              Agregar e ir a pagar $ {totalPrice.toFixed(3)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
