"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CategoryGridProps {
  onCategoryClick?: (category: string) => void
}

export default function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  const categories = [
    {
      id: "restaurantes",
      title: "Restaurantes",
      subtitle: "Comida deliciosa a domicilio",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      textColor: "text-orange-700",
      icon: "🍔",
      iconBg: "bg-orange-100",
    },
    {
      id: "turbo-market",
      title: "Turbo Market",
      subtitle: "Súper rápido en 10 min",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      textColor: "text-emerald-700",
      icon: "🛒",
      iconBg: "bg-emerald-100",
      badge: "10 min",
      badgeColor: "success",
    },
    {
      id: "super",
      title: "Súper",
      subtitle: "Todo para tu hogar",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      textColor: "text-blue-700",
      icon: "🛍️",
      iconBg: "bg-blue-100",
    },
    {
      id: "farmacia",
      title: "Farmacia",
      subtitle: "Medicamentos y salud",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      textColor: "text-purple-700",
      icon: "💊",
      iconBg: "bg-purple-100",
    },
    {
      id: "mandados",
      title: "Mandados",
      subtitle: "Te ayudamos con todo",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      textColor: "text-amber-700",
      icon: "📦",
      iconBg: "bg-amber-100",
    },
    {
      id: "licores",
      title: "Licores",
      subtitle: "Para tus celebraciones",
      bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
      textColor: "text-yellow-700",
      icon: "🍾",
      iconBg: "bg-yellow-100",
    },
  ]

  return (
    <div className="space-y-3">
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground mb-1">¿Qué necesitas hoy?</h2>
        <p className="text-sm text-muted-foreground">Explora nuestras categorías</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`${category.bgColor} border-0 shadow-sm hover:shadow-md smooth-transition cursor-pointer active-press overflow-hidden relative`}
            onClick={() => onCategoryClick?.(category.id)}
          >
            <CardContent className="p-4 relative">
              {/* Badge if exists */}
              {category.badge && (
                <div className="absolute top-2 right-2">
                  <Badge variant={category.badgeColor as any} className="text-xs font-bold shadow-sm">
                    {category.badge}
                  </Badge>
                </div>
              )}
              
              {/* Icon */}
              <div className={`w-12 h-12 ${category.iconBg} rounded-2xl flex items-center justify-center mb-3 shadow-sm`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              
              {/* Text */}
              <div>
                <h3 className={`font-bold text-base ${category.textColor} mb-0.5`}>
                  {category.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {category.subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
