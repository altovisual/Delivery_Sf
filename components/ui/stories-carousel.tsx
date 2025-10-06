"use client"

import { useState } from "react"
import { Restaurant } from "@/lib/types"
import Image from "next/image"
import StoryViewer from "./story-viewer"
import { Play, Sparkles } from "lucide-react"

interface StoriesCarouselProps {
  restaurants: Restaurant[]
}

export default function StoriesCarousel({ restaurants }: StoriesCarouselProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0)

  // Filtrar solo restaurantes con historias activas
  const restaurantsWithStories = restaurants.filter(
    (r) => r.stories && r.stories.length > 0 && r.hasActiveStories
  )

  if (restaurantsWithStories.length === 0) return null

  const handleStoryClick = (restaurant: Restaurant, index: number) => {
    setSelectedRestaurant(restaurant)
    setCurrentRestaurantIndex(index)
  }

  const handleNavigateRestaurant = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentRestaurantIndex + 1) % restaurantsWithStories.length
        : (currentRestaurantIndex - 1 + restaurantsWithStories.length) % restaurantsWithStories.length

    setCurrentRestaurantIndex(newIndex)
    setSelectedRestaurant(restaurantsWithStories[newIndex])
  }

  return (
    <>
      <div className="mb-6 bg-white">
        {/* Header mejorado */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Historias</h2>
              <p className="text-xs text-gray-500">{restaurantsWithStories.length} disponibles</p>
            </div>
          </div>
        </div>

        {/* Carrusel horizontal de historias */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-4 pb-4 pt-2">
            {restaurantsWithStories.map((restaurant, index) => (
              <button
                key={restaurant.id}
                onClick={() => handleStoryClick(restaurant, index)}
                className="flex-shrink-0 group relative"
              >
                {/* Contenedor principal con padding para badges */}
                <div className="flex flex-col items-center gap-2 pt-1 pb-1">
                  {/* Avatar con anillo de gradiente */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-500 p-[2.5px] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <div className="w-full h-full rounded-full bg-white p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Badge de video - Más discreto */}
                    {restaurant.stories?.some((s) => s.type === "video") && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
                      </div>
                    )}

                    {/* Badge NUEVO - Más elegante */}
                    {restaurant.stories?.some(
                      (s) => new Date().getTime() - new Date(s.createdAt).getTime() < 2 * 60 * 60 * 1000
                    ) && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md">
                        <div className="w-full h-full rounded-full bg-green-500 animate-ping opacity-75"></div>
                      </div>
                    )}
                  </div>

                  {/* Nombre del restaurante - Más limpio */}
                  <div className="text-center">
                    <p className="text-xs text-gray-900 font-medium max-w-[64px] truncate leading-tight">
                      {restaurant.name}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {restaurant.stories?.length} {restaurant.stories?.length === 1 ? 'historia' : 'historias'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visor de historias */}
      {selectedRestaurant && (
        <StoryViewer
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onNavigateRestaurant={handleNavigateRestaurant}
        />
      )}
    </>
  )
}
