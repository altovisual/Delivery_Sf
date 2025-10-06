"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import ResponsiveLayout from "@/components/layout/responsive-layout"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import NotificationToast from "@/components/ui/notification-toast"
import ScrollToTopButton from "@/components/ui/scroll-to-top-button"
import ResponsiveHome from "@/components/responsive/responsive-home"

// Import dashboard components
import OverviewDashboard from "@/components/dashboard/overview-dashboard"
import OrdersDashboard from "@/components/dashboard/orders-dashboard"

// Import customer pages
import OffersPage from "@/components/pages/offers-page"
import FavoritesPage from "@/components/pages/favorites-page"
import AccountPage from "@/components/pages/account-page"
import CategoryPage from "@/components/pages/category-page"
import RestaurantPage from "@/components/pages/restaurant-page"
import SearchPage from "@/components/pages/search-page"
import ProductDetailPage from "@/components/pages/product-detail-page"
import CartPage from "@/components/pages/cart-page"
import CheckoutPage from "@/components/pages/checkout-page"
import OrdersPage from "@/components/pages/orders-page"

function AppContent() {
  const { state, dispatch } = useApp()

  // Check if we're in dashboard mode
  const isDashboard = state.currentPage.startsWith("dashboard-")

  const renderDashboardPage = () => {
    const page = state.currentPage.replace("dashboard-", "")
    switch (page) {
      case "overview":
        return <OverviewDashboard />
      case "orders":
        return <OrdersDashboard />
      case "products":
        return <div className="p-8 text-center">Gestión de Productos - En desarrollo</div>
      case "customers":
        return <div className="p-8 text-center">Gestión de Clientes - En desarrollo</div>
      case "restaurants":
        return <div className="p-8 text-center">Gestión de Restaurantes - En desarrollo</div>
      case "drivers":
        return <div className="p-8 text-center">Gestión de Repartidores - En desarrollo</div>
      case "analytics":
        return <div className="p-8 text-center">Analytics y Reportes - En desarrollo</div>
      case "finance":
        return <div className="p-8 text-center">Gestión Financiera - En desarrollo</div>
      case "notifications":
        return <div className="p-8 text-center">Centro de Notificaciones - En desarrollo</div>
      case "settings":
        return <div className="p-8 text-center">Configuración del Sistema - En desarrollo</div>
      case "help":
        return <div className="p-8 text-center">Centro de Ayuda - En desarrollo</div>
      default:
        return <OverviewDashboard />
    }
  }

  const renderCustomerPage = () => {
    switch (state.currentPage) {
      case "home":
        return <ResponsiveHome />
      case "ofertas":
        return <OffersPage />
      case "favoritos":
        return <FavoritesPage />
      case "cuenta":
        return <AccountPage />
      case "category":
        return <CategoryPage />
      case "restaurant":
        return <RestaurantPage />
      case "product":
        return <ProductDetailPage />
      case "search":
        return <SearchPage />
      case "cart":
        return <CartPage />
      case "checkout":
        return <CheckoutPage />
      case "orders":
        return <OrdersPage />
      default:
        return <ResponsiveHome />
    }
  }

  return (
    <>
      {isDashboard ? (
        <DashboardLayout>{renderDashboardPage()}</DashboardLayout>
      ) : (
        <ResponsiveLayout>{renderCustomerPage()}</ResponsiveLayout>
      )}
      <NotificationToast />
      <ScrollToTopButton />
    </>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
