"use client"

import { useState } from "react"
import { Star, Plus, Play } from "lucide-react"
import { useApp } from "@/lib/app-context"
import PremiumHeader from "@/components/ui/premium-header"
import PremiumButton from "@/components/ui/premium-button"
import ProductModal from "@/components/ui/product-modal"
import StoryViewer from "@/components/ui/story-viewer"
import Image from "next/image"

export default function RestaurantPage() {
  const { state, dispatch } = useApp()
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showStories, setShowStories] = useState(false)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)

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
      {/* Hero Image Grande */}
      <div className="relative h-64">
        {/* Botones sobre la imagen - Mobile y Desktop */}
        <div className="absolute top-4 left-0 right-0 z-20 px-4 flex items-center justify-between">
          {/* Botón de volver */}
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botón de favorito */}
          <button
            onClick={toggleFavorite}
            className={`w-10 h-10 rounded-full backdrop-blur-md shadow-lg hover:shadow-xl border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
              isFavorite 
                ? 'bg-red-500' 
                : 'bg-white/95'
            }`}
          >
            <svg 
              className={`w-5 h-5 transition-all ${isFavorite ? 'fill-white text-white' : 'fill-none text-gray-900'}`} 
              fill={isFavorite ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
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

      {/* Historias del Restaurante */}
      {restaurant.stories && restaurant.stories.length > 0 && (
        <div className="bg-gradient-to-b from-orange-50 to-white border-b border-gray-100 py-5">
          <div className="px-4 mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                🎬 Historias de {restaurant.name}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">Mira la calidad de nuestros productos en vivo</p>
            </div>
            <button
              onClick={() => {
                setSelectedStoryIndex(0)
                setShowStories(true)
              }}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 whitespace-nowrap"
            >
              Ver todas →
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide px-4">
            <div className="flex gap-3 pb-2">
              {restaurant.stories.map((story, index) => (
                <button
                  key={story.id}
                  onClick={() => {
                    setSelectedStoryIndex(index)
                    setShowStories(true)
                  }}
                  className="flex-shrink-0 group relative"
                >
                  {/* Anillo de gradiente */}
                  <div className="p-[2px] bg-gradient-to-tr from-orange-500 via-red-500 to-pink-500 rounded-xl group-hover:scale-105 transition-transform">
                    <div className="bg-white p-[2px] rounded-xl">
                      <div className="relative w-24 h-36 rounded-xl overflow-hidden">
                        {story.type === "video" ? (
                          <>
                            <Image
                              src={story.thumbnail || story.url}
                              alt={`Historia ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                                <Play className="w-6 h-6 text-orange-500 fill-orange-500 ml-0.5" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <Image
                              src={story.url}
                              alt={`Historia ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          </>
                        )}
                        {/* Badge de tipo mejorado */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1.5 rounded-lg text-center shadow-lg">
                            {story.type === "video" ? "📹 VIDEO" : "📸 FOTO"}
                          </div>
                        </div>
                        {/* Indicador de nuevo */}
                        {new Date().getTime() - new Date(story.createdAt).getTime() < 2 * 60 * 60 * 1000 && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg animate-pulse">
                            NUEVO
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* CTA destacado */}
          <div className="px-4 mt-4">
            <button
              onClick={() => {
                setSelectedStoryIndex(0)
                setShowStories(true)
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              Ver todas las historias ({restaurant.stories.length})
            </button>
          </div>
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

      {/* Cart Summary - Responsive */}
      {state.cart.length > 0 && (
        <>
          {/* Mobile: Botón ancho en la parte inferior */}
          <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
            <button
              onClick={() => dispatch({ type: "NAVIGATE", payload: "cart" })}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-between transition-all active:scale-95"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{state.cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <span>Ver Carrito</span>
              </div>
              <span className="font-bold text-lg">
                ${state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
              </span>
            </button>
          </div>

          {/* Desktop: Botón flotante compacto en la esquina inferior derecha */}
          <div className="hidden md:block fixed bottom-6 right-6 z-50">
            <button
              onClick={() => dispatch({ type: "NAVIGATE", payload: "cart" })}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full shadow-2xl shadow-orange-500/40 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group"
            >
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-white text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                  {state.cart.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs opacity-90">Ver Carrito</span>
                <span className="text-lg font-bold leading-none">
                  ${state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
            </button>
          </div>
        </>
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

      {/* Visor de Historias */}
      {showStories && restaurant.stories && (
        <StoryViewer
          restaurant={restaurant}
          initialStoryIndex={selectedStoryIndex}
          onClose={() => setShowStories(false)}
        />
      )}
    </div>
  )
}
