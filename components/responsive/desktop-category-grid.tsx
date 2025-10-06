"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DesktopCategoryGridProps {
  onCategoryClick?: (category: string) => void
}

export default function DesktopCategoryGrid({ onCategoryClick }: DesktopCategoryGridProps) {
  const categories = [
    {
      id: "restaurantes",
      title: "Restaurantes",
      subtitle: "Comida deliciosa a domicilio",
      icon: "🍔",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      textColor: "text-orange-700",
      iconBg: "bg-orange-100",
    },
    {
      id: "turbo-market",
      title: "Turbo Market",
      subtitle: "Súper rápido en 10 min",
      icon: "🛒",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      textColor: "text-emerald-700",
      iconBg: "bg-emerald-100",
      badge: "10 min",
      badgeColor: "success",
    },
    {
      id: "super",
      title: "Súper",
      subtitle: "Todo para tu hogar",
      icon: "🛍️",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      textColor: "text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      id: "farmacia",
      title: "Farmacia",
      subtitle: "Medicamentos y salud",
      icon: "💊",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      textColor: "text-purple-700",
      iconBg: "bg-purple-100",
    },
    {
      id: "mandados",
      title: "Mandados",
      subtitle: "Te ayudamos con todo",
      icon: "📦",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      textColor: "text-amber-700",
      iconBg: "bg-amber-100",
    },
    {
      id: "licores",
      title: "Licores",
      subtitle: "Para tus celebraciones",
      icon: "🍾",
      bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
      textColor: "text-yellow-700",
      iconBg: "bg-yellow-100",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">¿Qué necesitas hoy?</h2>
        <p className="text-muted-foreground text-lg">Explora nuestras categorías</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          return (
            <Card
              key={category.id}
              className={`${category.bgColor} border-0 shadow-sm hover:shadow-lg smooth-transition cursor-pointer hover-lift active-press overflow-hidden relative`}
              onClick={() => onCategoryClick?.(category.id)}
            >
              <CardContent className="p-6 relative">
                {category.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge variant={category.badgeColor as any} className="text-xs font-bold shadow-sm">
                      {category.badge}
                    </Badge>
                  </div>
                )}
                
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 ${category.iconBg} rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-xl ${category.textColor} mb-1`}>
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.subtitle}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
