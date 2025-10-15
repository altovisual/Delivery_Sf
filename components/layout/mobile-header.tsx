"use client"

import { ArrowLeft, Heart, Share, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApp } from "@/lib/app-context"
import DeliveryHeader from "@/components/ui/delivery-header"
import SearchBar from "@/components/ui/search-bar"

export default function MobileHeader() {
  const { state, dispatch } = useApp()

  // Update the handleBack function to handle all navigation flows
  const handleBack = () => {
    switch (state.currentPage) {
      case "ofertas":
      case "favoritos":
      case "cuenta":
      case "search":
      case "orders":
        dispatch({ type: "NAVIGATE", payload: "home" })
        break
      case "category":
        dispatch({ type: "NAVIGATE", payload: "home" })
        break
      case "restaurant":
        if (state.selectedCategory) {
          dispatch({ type: "NAVIGATE", payload: "category" })
        } else {
          dispatch({ type: "NAVIGATE", payload: "home" })
        }
        break
      case "product":
        if (state.selectedRestaurant) {
          dispatch({ type: "NAVIGATE", payload: "restaurant" })
        } else {
          dispatch({ type: "NAVIGATE", payload: "home" })
        }
        break
      case "cart":
        dispatch({ type: "NAVIGATE", payload: "home" })
        break
      case "checkout":
        dispatch({ type: "NAVIGATE", payload: "cart" })
        break
      default:
        dispatch({ type: "NAVIGATE", payload: "home" })
    }
  }

  const handleSearchFocus = () => {
    dispatch({ type: "NAVIGATE", payload: "search" })
  }

  const handleLocationClick = () => {
    console.log("Location picker opened")
  }

  // Home page header - No renderizar nada, HomePagePremium tiene su propia cabecera
  if (state.currentPage === "home") {
    return null
  }

  // Search page - Header con barra de búsqueda
  if (state.currentPage === "search") {
    return (
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full md:w-12 md:h-12">
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <Input
                placeholder="Buscar restaurantes, productos..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
                className="pl-10 md:pl-12 bg-gray-100 border-0 rounded-full text-base md:text-lg py-2 md:py-3"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Other pages header
  // Update the getPageTitle function to include all new pages
  const getCategoryIcon = (category: string) => {
    const cat = category?.toLowerCase() || ""
    if (cat.includes("pizza")) return "🍕"
    if (cat.includes("restaurante")) return "🍔"
    if (cat.includes("farmacia")) return "💊"
    if (cat.includes("licor")) return "🍷"
    if (cat.includes("mercado") || cat.includes("super")) return "🛒"
    if (cat.includes("café") || cat.includes("cafe")) return "☕"
    if (cat.includes("postre")) return "🍰"
    if (cat.includes("tienda")) return "🏪"
    return "🏪"
  }

  const getPageTitle = () => {
    switch (state.currentPage) {
      case "ofertas":
        return "Ofertas Especiales"
      case "favoritos":
        return "Mis Favoritos"
      case "cuenta":
        return "Mi Cuenta"
      case "search":
        return "Buscar"
      case "category":
        return state.selectedCategory || "Categoría"
      case "restaurant":
        return state.selectedRestaurant?.name || "Restaurante"
      case "product":
        return state.selectedProduct?.name || "Producto"
      case "cart":
        return "Mi Carrito"
      case "checkout":
        return "Checkout"
      case "orders":
        return "Mis Pedidos"
      default:
        return "San Felipe Express"
    }
  }

  const showBackButton = state.currentPage !== "home"

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-4">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full md:w-12 md:h-12">
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          )}
          
          {/* Título con icono para categorías */}
          {state.currentPage === "category" ? (
            <div className="flex items-center gap-2 md:gap-3 flex-1">
              <span className="text-2xl md:text-3xl">{getCategoryIcon(state.selectedCategory || "")}</span>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 capitalize">{getPageTitle()}</h1>
            </div>
          ) : (
            <h1 className="text-lg md:text-xl font-bold text-gray-900 flex-1 truncate">{getPageTitle()}</h1>
          )}

          {/* Page-specific actions */}
          {state.currentPage === "category" && (
            <Button variant="outline" size="icon" className="md:w-12 md:h-12">
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          )}
          
          {state.currentPage === "restaurant" && state.selectedRestaurant && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:w-12 md:h-12"
                onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: String(state.selectedRestaurant!.id) })}
              >
                <Heart
                  className={`w-5 h-5 md:w-6 md:h-6 ios-spring ${
                    state.favorites.includes(String(state.selectedRestaurant.id)) ? "fill-primary text-primary" : ""
                  }`}
                />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full md:w-12 md:h-12">
                <Share className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Filter Chips para categorías */}
        {state.currentPage === "category" && (
          <div className="flex gap-2 md:gap-3 overflow-x-auto mt-3 md:mt-4 scrollbar-hide">
            {["Todos", "Más Cercanos", "Mejor Calificados", "Más Rápidos", "Promociones"].map((filter) => (
              <Button key={filter} variant="outline" size="sm" className="whitespace-nowrap rounded-full md:px-5 md:py-2 md:text-base">
                {filter}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
