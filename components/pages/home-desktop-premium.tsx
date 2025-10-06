"use client"

import { useApp } from "@/lib/app-context"
import { mock50Restaurants } from "@/lib/mock-data-50-restaurants"
import { 
  UtensilsCrossed, 
  Pizza, 
  Coffee, 
  ShoppingBag, 
  Pill, 
  Wine,
  Store,
  IceCream,
  TrendingUp,
  Clock,
  Star
} from "lucide-react"
import CategoryCard from "@/components/ui/category-card"
import PromoBanner from "@/components/ui/promo-banner"
import RestaurantCardPremium from "@/components/ui/restaurant-card-premium"

export default function HomeDesktopPremium() {
  const { dispatch } = useApp()

  const categories = [
    { icon: UtensilsCrossed, label: "Restaurantes", count: "50+", bgColor: "bg-orange-100", iconColor: "text-orange-600" },
    { icon: Pizza, label: "Pizzas", count: "15+", bgColor: "bg-red-100", iconColor: "text-red-600" },
    { icon: Coffee, label: "Café", count: "8+", bgColor: "bg-amber-100", iconColor: "text-amber-600" },
    { icon: ShoppingBag, label: "Mercado", count: "12+", bgColor: "bg-green-100", iconColor: "text-green-600" },
    { icon: Pill, label: "Farmacia", count: "6+", bgColor: "bg-blue-100", iconColor: "text-blue-600" },
    { icon: Wine, label: "Licores", count: "10+", bgColor: "bg-purple-100", iconColor: "text-purple-600" },
    { icon: Store, label: "Tiendas", count: "20+", bgColor: "bg-pink-100", iconColor: "text-pink-600" },
    { icon: IceCream, label: "Postres", count: "5+", bgColor: "bg-cyan-100", iconColor: "text-cyan-600" },
  ]

  const handleRestaurantClick = (restaurant: any) => {
    dispatch({ type: "SET_RESTAURANT", payload: restaurant })
  }

  const handleCategoryClick = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category })
  }

  const featuredRestaurants = mock50Restaurants.filter(r => r.isPromoted).slice(0, 8)
  const trendingRestaurants = mock50Restaurants.slice(0, 8)
  const nearbyRestaurants = mock50Restaurants.slice(8, 16)

  return (
    <div className="space-y-12 pb-12 px-8">
      {/* Hero Banners */}
      <div className="grid grid-cols-2 gap-8 pt-6">
        <PromoBanner
          title="Save 30% OFF"
          subtitle="first 2 Orders"
          code="FOOD30"
          gradient="from-purple-500 via-purple-600 to-pink-500"
          onClick={() => dispatch({ type: "NAVIGATE", payload: "ofertas" })}
        />
        <PromoBanner
          title="Envío Gratis"
          subtitle="En pedidos mayores a $20"
          gradient="from-orange-500 via-orange-600 to-red-500"
          onClick={() => dispatch({ type: "NAVIGATE", payload: "ofertas" })}
        />
      </div>

      {/* Categorías */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Explora por categoría</h2>
          <p className="text-gray-600">Encuentra lo que necesitas rápidamente</p>
        </div>
        <div className="grid grid-cols-8 gap-6">
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              icon={cat.icon}
              label={cat.label}
              count={cat.count}
              bgColor={cat.bgColor}
              iconColor={cat.iconColor}
              onClick={() => handleCategoryClick(cat.label)}
            />
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center shadow-sm">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Destacados</h2>
              <p className="text-sm text-gray-600">Los mejores restaurantes de San Felipe</p>
            </div>
          </div>
          <button 
            onClick={() => dispatch({ type: "NAVIGATE", payload: "ofertas" })}
            className="px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
          >
            Ver todos →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCardPremium
              key={restaurant.id}
              {...restaurant}
              onClick={() => handleRestaurantClick(restaurant)}
            />
          ))}
        </div>
      </section>

      {/* Tendencias */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center shadow-sm">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tendencias</h2>
              <p className="text-sm text-gray-600">Lo más pedido esta semana</p>
            </div>
          </div>
          <button 
            onClick={() => dispatch({ type: "NAVIGATE", payload: "ofertas" })}
            className="px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
          >
            Ver todos →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {trendingRestaurants.map((restaurant) => (
            <RestaurantCardPremium
              key={restaurant.id}
              {...restaurant}
              onClick={() => handleRestaurantClick(restaurant)}
            />
          ))}
        </div>
      </section>

      {/* Cerca de ti */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center shadow-sm">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Cerca de ti</h2>
              <p className="text-sm text-gray-600">Entrega rápida en tu zona</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {nearbyRestaurants.map((restaurant) => (
            <RestaurantCardPremium
              key={restaurant.id}
              {...restaurant}
              onClick={() => handleRestaurantClick(restaurant)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
