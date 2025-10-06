"use client"

import { useState, useRef, useEffect } from "react"
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
  
  // Estados para el swipe to dismiss
  const [isDragging, setIsDragging] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [startY, setStartY] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

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

  // Handlers para swipe to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    const scrollContainer = modalRef.current?.querySelector('[data-scroll-container]')
    if (scrollContainer && scrollContainer.scrollTop > 0) return // No permitir swipe si hay scroll
    
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const currentY = e.touches[0].clientY
    const diff = currentY - startY
    
    // Solo permitir arrastrar hacia abajo
    if (diff > 0) {
      setDragY(diff)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Si se arrastró más de 150px, cerrar el modal
    if (dragY > 150) {
      onClose()
    }
    
    // Reset
    setDragY(0)
  }

  // Reset estados cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setDragY(0)
      setIsDragging(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-[32px] max-h-[92vh] overflow-hidden flex flex-col shadow-2xl transition-transform"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag indicator para móvil */}
        <div className="md:hidden flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-95"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>

          {/* Imagen del producto */}
          <div className="relative h-56 md:h-72 bg-gradient-to-br from-gray-100 to-gray-50">
            <img
              src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto" data-scroll-container>
          <div className="p-6 space-y-6">
            {/* Título y precio */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-2 mb-4">
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(3)}
                </p>
                <span className="text-sm text-gray-500">por unidad</span>
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Elige tu Base */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900">Elige tu Base</h3>
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  Obligatorio
                </span>
              </div>

              <div className="space-y-2.5">
                {baseOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all active:scale-[0.98]"
                    style={{
                      borderColor: selectedBase === option.name ? "#FF6B35" : "#E5E7EB",
                      backgroundColor: selectedBase === option.name ? "#FFF7F5" : "white",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedBase === option.name 
                          ? 'border-orange-500 bg-orange-500' 
                          : 'border-gray-300 bg-white'
                      }`}>
                        {selectedBase === option.name && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <input
                        type="radio"
                        name="base"
                        checked={selectedBase === option.name}
                        onChange={() => setSelectedBase(option.name)}
                        className="sr-only"
                      />
                      <span className="font-semibold text-gray-900">{option.name}</span>
                    </div>
                    {option.price > 0 && (
                      <span className="text-sm font-bold text-green-600">
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
        <div className="border-t border-gray-100 bg-white p-5 pb-6 md:pb-5 space-y-4 shadow-2xl">
          {/* Control de cantidad */}
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">Cantidad</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-11 h-11 rounded-full border-2 border-gray-300 flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all bg-white"
              >
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-2xl font-bold w-10 text-center text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center active:scale-95 transition-all shadow-md"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Agregar al carrito</span>
              <span className="text-lg">·</span>
              <span className="text-lg font-extrabold">${totalPrice.toFixed(3)}</span>
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]"
            >
              Agregar y seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
