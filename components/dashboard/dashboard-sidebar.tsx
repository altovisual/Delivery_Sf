"use client"

import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Store,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Package,
  Truck,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/app-context"

interface DashboardSidebarProps {
  isOpen: boolean
  onToggle: () => void
  isMobile: boolean
}

export default function DashboardSidebar({ isOpen, onToggle, isMobile }: DashboardSidebarProps) {
  const { state, dispatch } = useApp()

  const mainNavItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
    { id: "orders", label: "Pedidos", icon: ShoppingBag, badge: "12" },
    { id: "products", label: "Productos", icon: Package, badge: null },
    { id: "customers", label: "Clientes", icon: Users, badge: null },
    { id: "restaurants", label: "Restaurantes", icon: Store, badge: "3" },
    { id: "drivers", label: "Repartidores", icon: Truck, badge: null },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
    { id: "finance", label: "Finanzas", icon: DollarSign, badge: null },
  ]

  const secondaryNavItems = [
    { id: "notifications", label: "Notificaciones", icon: Bell, badge: "5" },
    { id: "settings", label: "Configuración", icon: Settings, badge: null },
    { id: "help", label: "Ayuda", icon: HelpCircle, badge: null },
  ]

  const handleNavigation = (pageId: string) => {
    dispatch({ type: "NAVIGATE", payload: `dashboard-${pageId}` })
    if (isMobile) onToggle()
  }

  const currentPage = state.currentPage.replace("dashboard-", "")

  if (!isOpen && isMobile) return null

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar - Fixed with proper height constraints */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-56 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col h-screen max-h-screen overflow-hidden`}
      >
        {/* Header - Fixed height */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 min-h-[72px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-sm text-gray-900 truncate">San Felipe</h1>
              <p className="text-xs text-gray-600">Dashboard</p>
            </div>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 flex-shrink-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* User Info - Fixed height */}
        <div className="p-3 border-b border-gray-200 flex-shrink-0 min-h-[68px]">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">{state.user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs text-gray-900 truncate">{state.user.name}</p>
              <p className="text-xs text-gray-600">Admin</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
          </div>
        </div>

        {/* Main Navigation - Scrollable area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3">
          <nav className="space-y-1">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Principal</div>
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start gap-2 h-8 text-xs ${
                    isActive ? "bg-red-500 hover:bg-red-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleNavigation(item.id)}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={isActive ? "secondary" : "default"}
                      className={`text-xs h-4 px-1 flex-shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-red-100 text-red-600"}`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </nav>

          {/* Quick Stats - Inside scrollable area */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-xs text-gray-900 mb-2">Resumen</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Hoy</span>
                <span className="font-semibold text-blue-600">47</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Ingresos</span>
                <span className="font-semibold text-green-600">$2.3K</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Activos</span>
                <span className="font-semibold text-orange-600">8/12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation - Fixed at bottom */}
        <div className="p-3 border-t border-gray-200 flex-shrink-0 bg-white">
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start gap-2 h-7 text-xs ${
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavigation(item.id)}
                >
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs h-4 px-1 bg-red-100 text-red-600 flex-shrink-0">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </nav>

          {/* Logout - Fixed at bottom */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 mt-2 h-7 text-xs text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </>
  )
}
