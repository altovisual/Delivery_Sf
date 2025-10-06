"use client"

import { Search, Bell, MapPin, ChevronDown, ShoppingCart } from "lucide-react"
import { useApp } from "@/lib/app-context"

export default function DesktopHeader() {
  const { state, dispatch } = useApp()

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">SF</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">San Felipe Express</h1>
            <p className="text-xs text-gray-500">Delivery rápido y confiable</p>
          </div>
        </div>

        {/* Ubicación */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
          <MapPin className="w-5 h-5 text-orange-500" />
          <div className="text-left">
            <p className="text-xs text-gray-500">Entregar en</p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">{state.location.city}</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </button>

        {/* Barra de búsqueda */}
        <div className="flex-1 max-w-xl">
          <button
            onClick={() => dispatch({ type: "NAVIGATE", payload: "search" })}
            className="w-full flex items-center gap-3 bg-gray-100 rounded-2xl px-5 py-3 hover:bg-gray-200 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Buscar restaurantes o productos...</span>
          </button>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {/* Notificaciones */}
          <button className="relative w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Carrito */}
          <button
            onClick={() => dispatch({ type: "NAVIGATE", payload: "cart" })}
            className="relative w-11 h-11 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center hover:from-orange-600 hover:to-red-600 transition-colors shadow-lg shadow-orange-500/30"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-orange-600 text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
