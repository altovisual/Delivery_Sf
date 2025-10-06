"use client"

import { ArrowLeft, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/lib/app-context"
import { mock50Restaurants, all50Products } from "@/lib/mock-data-50-restaurants"

export default function SearchPage() {
  const { state, dispatch } = useApp()

  const handleBack = () => {
    dispatch({ type: "NAVIGATE", payload: "home" })
  }

  const handleSearch = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query })
  }

  const allItems = [
    ...mock50Restaurants.map((r) => ({ ...r, type: "restaurant" as const })),
    ...all50Products.map((p) => ({ ...p, type: "product" as const })),
  ]

  const filteredItems = state.searchQuery
    ? allItems.filter((item) => item.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
    : []

  const recentSearches = ["Pizza", "Hamburguesa", "Farmacia", "Sushi"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-4">
        {!state.searchQuery ? (
          /* Recent Searches */
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Búsquedas Recientes</h2>
            <div className="space-y-3">
              {recentSearches.map((search, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{search}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorías Populares</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Comida Rápida", "Pizzas", "Farmacia", "Súper"].map((category) => (
                  <Card
                    key={category}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => dispatch({ type: "SET_CATEGORY", payload: category })}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">
                        {category === "Comida Rápida" && "🍔"}
                        {category === "Pizzas" && "🍕"}
                        {category === "Farmacia" && "💊"}
                        {category === "Súper" && "🛒"}
                      </div>
                      <h3 className="font-semibold text-gray-900">{category}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredItems.length} resultado{filteredItems.length !== 1 ? "s" : ""} para "{state.searchQuery}"
              </p>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No encontramos resultados</h2>
                <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      if (item.type === "restaurant") {
                        const { type, ...restaurant } = item
                        dispatch({ type: "SET_RESTAURANT", payload: restaurant as any })
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&h=120&fit=crop"}
                          alt={item.name}
                          className="w-30 h-30 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.type === "restaurant" ? (item as any).category : "Producto"}
                          </p>
                          <div className="flex items-center gap-3">
                            {item.type === "restaurant" ? (
                              <>
                                <span className="text-sm text-gray-500">⭐ {(item as any).rating}</span>
                                <span className="text-sm text-gray-500">⚡ {(item as any).deliveryTime}</span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-green-600">${(item as any).price}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
