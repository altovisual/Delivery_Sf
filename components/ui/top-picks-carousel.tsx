"use client"

import { useApp } from "@/lib/app-context"
import { mock50Restaurants } from "@/lib/mock-data-50-restaurants"

export default function TopPicksCarousel() {
  const { dispatch } = useApp()
  
  const topPicks = mock50Restaurants.slice(0, 10)

  const handleRestaurantClick = (restaurant: any) => {
    dispatch({ type: "SET_RESTAURANT", payload: restaurant })
  }

  return (
    <section className="bg-white py-6">
      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">¡Los 10 más elegidos!</h2>
        
        {/* Carrusel horizontal */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {topPicks.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => handleRestaurantClick(restaurant)}
              className="flex-shrink-0 flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              {/* Logo circular */}
              <div className="w-20 h-20 rounded-full bg-white shadow-md border border-gray-100 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Nombre */}
              <div className="w-24 text-center">
                <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                  {restaurant.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
