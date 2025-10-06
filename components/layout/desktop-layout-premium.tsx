"use client"

import { useApp } from "@/lib/app-context"
import { 
  Home, 
  Tag, 
  Heart, 
  User, 
  ShoppingCart,
  Search,
  MapPin,
  ChevronDown,
  Bell,
  Menu
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DesktopLayoutPremiumProps {
  children: React.ReactNode
}

export default function DesktopLayoutPremium({ children }: DesktopLayoutPremiumProps) {
  const { state, dispatch } = useApp()

  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "ofertas", label: "Ofertas", icon: Tag },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "cuenta", label: "Cuenta", icon: User },
  ]

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-xs text-gray-500">Entregar en</p>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-gray-900">San Felipe, Yaracuy</span>
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

              {/* Menú */}
              <button className="lg:hidden w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 sticky top-20 h-[calc(100vh-5rem)] py-6">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = state.currentPage === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => dispatch({ type: "NAVIGATE", payload: item.id })}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Banner lateral */}
            <div className="mt-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">¡Envío Gratis!</h3>
              <p className="text-sm text-white/90 mb-4">
                En tu primera orden con código FOOD30
              </p>
              <button className="w-full bg-white text-purple-600 font-semibold py-2 rounded-xl hover:bg-gray-100 transition-colors">
                Usar código
              </button>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 py-6 pr-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
