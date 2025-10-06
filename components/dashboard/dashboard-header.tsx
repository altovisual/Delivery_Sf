"use client"

import { Menu, Search, Bell, User, Settings, RefreshCw, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useApp } from "@/lib/app-context"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { state } = useApp()

  const getPageTitle = () => {
    const page = state.currentPage.replace("dashboard-", "")
    switch (page) {
      case "overview":
        return "Dashboard"
      case "orders":
        return "Pedidos"
      case "products":
        return "Productos"
      case "customers":
        return "Clientes"
      case "restaurants":
        return "Restaurantes"
      case "drivers":
        return "Repartidores"
      case "analytics":
        return "Analytics"
      case "finance":
        return "Finanzas"
      case "notifications":
        return "Notificaciones"
      case "settings":
        return "Configuración"
      case "help":
        return "Ayuda"
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left Section - More compact */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden h-8 w-8">
            <Menu className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
            <p className="text-xs text-gray-600">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Center Section - Search - More compact */}
        <div className="hidden md:flex flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Buscar..." className="pl-10 bg-gray-50 border-gray-200 rounded-full h-8 text-sm" />
          </div>
        </div>

        {/* Right Section - More compact */}
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <Button variant="ghost" size="icon" className="hidden sm:flex h-8 w-8">
            <RefreshCw className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  5
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel className="text-sm">Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-48 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-sm">Nuevo pedido #1234</span>
                    <span className="text-xs text-gray-500 ml-auto">2 min</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">McDonald's - $25.50</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-sm">Pedido cancelado</span>
                    <span className="text-xs text-gray-500 ml-auto">5 min</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Pizza Hut - #1233</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer">
                Ver todas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu - More compact */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 h-8">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-red-500 text-white text-xs font-bold">
                    {state.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">{state.user.name}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-sm">Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 text-sm">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
