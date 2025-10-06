"use client"

import { Home, Tag, Heart, User, Search, MapPin, Settings, HelpCircle, ShoppingBag, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useApp } from "@/lib/app-context"

export default function DesktopSidebar() {
  const { state, dispatch } = useApp()

  const mainNavItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "search", label: "Buscar", icon: Search },
    { id: "ofertas", label: "Ofertas", icon: Tag },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "orders", label: "Mis Pedidos", icon: Receipt },
  ]

  const secondaryNavItems = [
    { id: "cuenta", label: "Mi Cuenta", icon: User },
    { id: "settings", label: "Configuración", icon: Settings },
    { id: "help", label: "Ayuda", icon: HelpCircle },
  ]

  const handleNavigation = (pageId: string) => {
    dispatch({ type: "NAVIGATE", payload: pageId === "home" ? "home" : pageId })
  }

  const currentPage = state.currentPage === "home" ? "home" : state.currentPage

  return (
    <div className="w-72 bg-white border-r border-border/50 flex flex-col h-full shadow-sm">
      {/* Logo - Fixed */}
      <div className="p-6 border-b border-border/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">🍔</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-foreground">San Felipe</h1>
            <p className="text-sm text-muted-foreground font-medium">Express Delivery</p>
          </div>
        </div>
      </div>

      {/* User Info - Fixed */}
      <div className="p-4 border-b border-border/50 flex-shrink-0">
        <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-border/50 hover-lift cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
                  {state.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-foreground truncate">{state.user.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate">{state.location.city}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Navigation - Scrollable if needed */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <nav className="space-y-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.id === "favoritos" && state.favorites.length > 0 && (
                  <span className="ml-auto bg-white text-orange-600 text-xs px-2 py-1 rounded-full font-bold">
                    {state.favorites.length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Cart Summary */}
        {state.cart.length > 0 && (
          <Card 
            className="mt-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-md cursor-pointer hover-lift"
            onClick={() => dispatch({ type: "NAVIGATE", payload: "cart" })}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-foreground">🛒 Tu Carrito</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-bold">
                  {state.cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
              <div className="text-2xl font-bold text-primary mb-4">
                ${state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
              </div>
              <Button 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 shadow-sm font-bold"
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch({ type: "NAVIGATE", payload: "cart" })
                }}
              >
                Ver Carrito →
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Secondary Navigation - Fixed at bottom */}
      <div className="p-4 border-t border-border/50 flex-shrink-0 bg-muted/30">
        <nav className="space-y-1">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-start gap-3 smooth-transition ${
                  isActive ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
