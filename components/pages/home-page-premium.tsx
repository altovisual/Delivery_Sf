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
  Search,
  MapPin,
  ChevronDown
} from "lucide-react"
import CategoryCard from "@/components/ui/category-card"
import PromoBanner from "@/components/ui/promo-banner"
import TopPicksCarousel from "@/components/ui/top-picks-carousel"
import RestaurantCardRappi from "@/components/ui/restaurant-card-rappi"
import StoriesCarousel from "@/components/ui/stories-carousel"

export default function HomePagePremium() {
  const { state, dispatch } = useApp()

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

  const featuredRestaurants = mock50Restaurants.filter(r => r.isPromoted).slice(0, 6)
  const allRestaurants = mock50Restaurants.slice(0, 12)

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header mejorado estilo Rappi */}
      <div className="bg-white shadow-sm sticky top-0 z-40 mb-4 md:mb-6">
        <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto pt-4 md:pt-5 pb-3 md:pb-4 space-y-3">
          {/* Ubicación principal */}
          <button className="flex items-center gap-2 md:gap-3 w-full">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-orange-500 flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-base md:text-lg font-bold text-gray-900">Av. Principal, Edificio Torre</p>
              <p className="text-sm md:text-base text-gray-600">San Felipe, Yaracuy</p>
            </div>
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
          </button>

          {/* Búsqueda principal */}
          <button
            onClick={() => dispatch({ type: "NAVIGATE", payload: "search" })}
            className="w-full flex items-center gap-3 md:gap-4 bg-gray-100 rounded-xl md:rounded-2xl px-4 md:px-6 py-3.5 md:py-4 text-left active:bg-gray-200 transition-colors"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
            <span className="text-base md:text-lg text-gray-500">¿Qué quieres hoy?</span>
          </button>
        </div>
      </div>

      {/* Historias de Restaurantes */}
      <StoriesCarousel restaurants={mock50Restaurants} />

      {/* Los 10 más elegidos - Estilo Rappi */}
      <div className="mb-6">
        <TopPicksCarousel />
      </div>

      {/* Banner Promocional */}
      <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-6 md:mb-8">
        <PromoBanner
          title="Save 30% OFF"
          subtitle="first 2 Orders"
          code="FOOD30"
          gradient="from-purple-500 via-purple-600 to-pink-500"
          onClick={() => dispatch({ type: "NAVIGATE", payload: "ofertas" })}
        />
      </div>

      {/* Categorías - Diseño mejorado */}
      <section className="mb-8 md:mb-10 bg-white">
        <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto pt-5 md:pt-6 pb-4 md:pb-6">
          <div className="mb-4 md:mb-5">
            <h2 className="text-base md:text-xl font-bold text-gray-900">Explora por categoría</h2>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">Encuentra lo que necesitas rápidamente</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
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
        </div>
      </section>

      {/* Destacados */}
      <section className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto mb-8 md:mb-10">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">⭐ Destacados</h2>
            <p className="text-sm md:text-base text-gray-600">Los mejores restaurantes de San Felipe</p>
          </div>
          <button 
            onClick={() => dispatch({ type: "NAVIGATE", payload: "ofertas" })}
            className="text-sm md:text-base font-semibold text-orange-600 hover:text-orange-700"
          >
            Ver todos →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCardRappi
              key={restaurant.id}
              {...restaurant}
              onClick={() => handleRestaurantClick(restaurant)}
            />
          ))}
        </div>
      </section>

      {/* Más restaurantes */}
      <section className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto pb-8 md:pb-10">
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">Más restaurantes</h2>
          <p className="text-sm md:text-base text-gray-600">Descubre más opciones cerca de ti</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {allRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => handleRestaurantClick(restaurant)}
              className="bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 flex gap-3 md:gap-4 p-3 md:p-4 active:scale-[0.98]"
            >
              {/* Imagen */}
              <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                {restaurant.isPromoted && (
                  <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-orange-500 text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                    ⭐
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm md:text-base text-gray-900 mb-0.5 md:mb-1 line-clamp-1">
                  {restaurant.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2">{restaurant.category}</p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                  <div className="flex items-center gap-0.5">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{restaurant.deliveryTime}</span>
                  <span>•</span>
                  <span className="text-green-600 font-semibold">{restaurant.deliveryFee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
