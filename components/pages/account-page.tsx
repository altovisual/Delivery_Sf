"use client"

import { ArrowLeft, MapPin, CreditCard, Settings, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useApp } from "@/lib/app-context"

export default function AccountPage() {
  const { state, dispatch } = useApp()

  const handleBack = () => {
    dispatch({ type: "NAVIGATE", payload: "home" })
  }

  const menuItems = [
    {
      icon: MapPin,
      title: "Mis Direcciones",
      subtitle: "Gestiona tus direcciones de entrega",
      action: () => console.log("Direcciones"),
    },
    {
      icon: CreditCard,
      title: "Métodos de Pago",
      subtitle: "Tarjetas y métodos de pago",
      action: () => console.log("Métodos de pago"),
    },
    {
      icon: Settings,
      title: "Configuración",
      subtitle: "Notificaciones y preferencias",
      action: () => console.log("Configuración"),
    },
    {
      icon: HelpCircle,
      title: "Ayuda y Soporte",
      subtitle: "Preguntas frecuentes y contacto",
      action: () => console.log("Ayuda"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Section */}
      <div className="px-4 py-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-red-500 text-white text-xl font-bold">
                  {state.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{state.user.name}</h2>
                <p className="text-gray-600">{state.user.email}</p>
                <p className="text-sm text-gray-500">{state.user.phone}</p>
              </div>
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">12</div>
              <div className="text-xs text-gray-600">Pedidos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{state.favorites.length}</div>
              <div className="text-xs text-gray-600">Favoritos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">$156</div>
              <div className="text-xs text-gray-600">Ahorrado</div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={item.action}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.subtitle}</p>
                    </div>
                    <div className="text-gray-400">›</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Logout Button */}
        <Card className="mt-6 cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 text-red-500">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Cerrar Sesión</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
