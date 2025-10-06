"use client"

import { useState } from "react"
import { Star, Plus } from "lucide-react"
import { useApp } from "@/lib/app-context"
import PremiumHeader from "@/components/ui/premium-header"
import PremiumButton from "@/components/ui/premium-button"
import ProductModal from "@/components/ui/product-modal"

export default function RestaurantPage() {
  const { state, dispatch } = useApp()
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBack = () => {
    dispatch({ type: "NAVIGATE", payload: "home" })
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const toggleFavorite = () => {
    if (state.selectedRestaurant) {
      dispatch({ type: "TOGGLE_FAVORITE", payload: state.selectedRestaurant.id })
    }
  }

  const addToCart = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  if (!state.selectedRestaurant) {
    return <div>Restaurante no encontrado</div>
  }

  const restaurant = state.selectedRestaurant
  const isFavorite = state.favorites.includes(restaurant.id)

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header Premium */}
      <PremiumHeader
        transparent
        onBack={handleBack}
        onFavorite={toggleFavorite}
        onShare={() => {}}
        isFavorite={isFavorite}
        className="absolute top-0 left-0 right-0 z-20"
      />

      {/* Hero Image Grande */}
      <div className="relative h-64">
        <img
          src={restaurant.image || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Info sobre la imagen */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-white text-3xl font-bold drop-shadow-2xl">{restaurant.name}</h1>
            {restaurant.isPromoted && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">
                Destacado
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-white text-sm drop-shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-white" />
              <span className="font-bold">{restaurant.rating}</span>
            </div>
            <span>•</span>
            <span className="font-medium">{restaurant.deliveryTime}</span>
            <span>•</span>
            <span className="font-medium">{restaurant.deliveryFee}</span>
            <span>•</span>
            <span className="font-medium">{restaurant.distance}</span>
          </div>
        </div>
      </div>

      {/* Banner promocional naranja */}
      {restaurant.isPromoted && (
        <div className="bg-orange-500 text-white px-4 py-3.5 flex items-center gap-2">
          <span className="text-base font-semibold">⚡ Restaurante destacado - Envío gratis en tu primera orden</span>
        </div>
      )}

      {/* Menú */}
      <div className="px-4 py-6 bg-white">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">The Kings</h2>
          <p className="text-sm text-gray-600">Los más populares de {restaurant.name}</p>
        </div>

        {/* Grid de productos estilo Rappi */}
        <div className="grid grid-cols-1 gap-4">
          {restaurant.products.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300 cursor-pointer active:scale-[0.98]"
              onClick={() => handleProductClick(product)}
            >
              {/* Contenido izquierdo */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Precio */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    $ {product.price.toFixed(3)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                      {product.discount && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Imagen derecha */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <img
                  src={product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                    -{product.discount}%
                  </div>
                )}
                {product.rating && (
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-md">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">{product.rating}</span>
                  </div>
                )}
                
                {/* Botón agregar sobre la imagen */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                  }}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 active:scale-90 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {state.cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 px-4">
          <PremiumButton
            size="lg"
            fullWidth
            onClick={() => dispatch({ type: "NAVIGATE", payload: "cart" })}
          >
            🛒 Ver Carrito ({state.cart.reduce((sum, item) => sum + item.quantity, 0)}) - $
            {state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
          </PremiumButton>
        </div>
      )}

      {/* Modal de producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </div>
  )
}
