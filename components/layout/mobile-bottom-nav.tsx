"use client"

import { Home, Tag, Heart, User, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/app-context"

export default function MobileBottomNav() {
  const { state, dispatch } = useApp()

  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "ofertas", label: "Ofertas", icon: Tag },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "orders", label: "Pedidos", icon: ShoppingBag },
    { id: "cuenta", label: "Cuenta", icon: User },
  ]

  const handleNavigation = (pageId: string) => {
    dispatch({ type: "NAVIGATE", payload: pageId })
  }

  const getItemCount = (itemId: string) => {
    switch (itemId) {
      case "favoritos":
        return state.favorites.length
      case "orders":
        return state.orders.filter((order) => !["delivered", "cancelled"].includes(order.status)).length
      default:
        return 0
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border/50 px-2 md:px-4 py-2 md:py-3 z-50 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around max-w-md md:max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = state.currentPage === item.id
          const count = getItemCount(item.id)

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex flex-col items-center gap-1 md:gap-1.5 py-2 md:py-3 px-3 md:px-5 rounded-xl smooth-transition active-press ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <div className={`p-1.5 md:p-2 rounded-xl smooth-transition ${isActive ? "bg-primary/10" : ""}`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 smooth-transition ${isActive ? "scale-105" : ""}`} />
                </div>
                {count > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 md:h-6 min-w-5 md:min-w-6 px-1 md:px-1.5 flex items-center justify-center text-xs md:text-sm font-bold shadow-sm"
                  >
                    {count > 99 ? "99+" : count}
                  </Badge>
                )}
              </div>
              <span className={`text-xs md:text-sm font-semibold smooth-transition ${isActive ? "opacity-100" : "opacity-60"}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
