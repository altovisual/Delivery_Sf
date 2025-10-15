"use client"

import { useState } from "react"
import { ArrowLeft, Clock, CheckCircle, Truck, Phone, Star, RotateCcw, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { useApp } from "@/lib/app-context"

export default function OrdersPage() {
  const { state, dispatch } = useApp()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const handleBack = () => {
    dispatch({ type: "NAVIGATE", payload: "home" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuevo":
        return "bg-blue-100 text-blue-800"
      case "aceptado":
        return "bg-blue-100 text-blue-800"
      case "en-preparacion":
        return "bg-yellow-100 text-yellow-800"
      case "listo":
        return "bg-purple-100 text-purple-800"
      case "en-camino":
        return "bg-orange-100 text-orange-800"
      case "entregado":
        return "bg-green-100 text-green-800"
      case "rechazado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "nuevo":
        return "Nuevo"
      case "aceptado":
        return "Aceptado"
      case "en-preparacion":
        return "Preparando"
      case "listo":
        return "Listo"
      case "en-camino":
        return "En camino"
      case "entregado":
        return "Entregado"
      case "rechazado":
        return "Rechazado"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "nuevo":
        return <CheckCircle className="w-4 h-4" />
      case "aceptado":
        return <CheckCircle className="w-4 h-4" />
      case "en-preparacion":
        return <Clock className="w-4 h-4" />
      case "listo":
        return <CheckCircle className="w-4 h-4" />
      case "en-camino":
        return <Truck className="w-4 h-4" />
      case "entregado":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const reorderItems = (orderId: string) => {
    const order = state.orders.find((o) => o.id === orderId)
    if (order) {
      // Clear current cart and add order items
      dispatch({ type: "CLEAR_CART" })
      order.items.forEach((item) => {
        dispatch({ type: "ADD_TO_CART", payload: { product: item.product, quantity: item.quantity } })
      })
      dispatch({ type: "NAVIGATE", payload: "cart" })
    }
  }

  const getOrderProgress = (status: string) => {
    const steps = ["nuevo", "aceptado", "en-preparacion", "listo", "en-camino", "entregado"]
    const currentIndex = steps.indexOf(status)
    return Math.max(0, currentIndex + 1)
  }

  if (state.orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No tienes pedidos aún</h2>
          <p className="text-gray-600 text-center mb-8">Cuando realices tu primer pedido, aparecerá aquí</p>
          <Button
            onClick={() => dispatch({ type: "NAVIGATE", payload: "home" })}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3"
          >
            Explorar Restaurantes
          </Button>
        </div>
      </div>
    )
  }

  const activeOrders = state.orders.filter((order) => !["entregado", "rechazado"].includes(order.status))
  const pastOrders = state.orders.filter((order) => ["entregado", "rechazado"].includes(order.status))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900">Pedidos activos</h2>
                <p className="text-sm md:text-base text-gray-600 mt-1">{activeOrders.length} {activeOrders.length === 1 ? 'pedido' : 'pedidos'} en proceso</p>
              </div>
              <div className="bg-orange-100 text-orange-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-semibold">
                {activeOrders.length}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {activeOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-base md:text-lg text-gray-900">#{order.id}</h3>
                          <Badge className={`${getStatusColor(order.status)} text-xs md:text-sm`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{getStatusText(order.status)}</span>
                          </Badge>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 font-medium">{order.restaurantName}</p>
                      </div>
                    </div>

                    {/* Progress Bar Mejorado */}
                    <div className="mb-5 bg-gray-50 rounded-xl p-3 md:p-4">
                      <div className="relative">
                        {/* Línea de progreso */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                            style={{ width: `${(getOrderProgress(order.status) / 6) * 100}%` }}
                          ></div>
                        </div>
                        
                        {/* Pasos */}
                        <div className="relative flex justify-between">
                          {[
                            { label: "Nuevo", icon: "📋" },
                            { label: "Aceptado", icon: "✅" },
                            { label: "Preparando", icon: "👨‍🍳" },
                            { label: "Listo", icon: "🍽️" },
                            { label: "En camino", icon: "🛵" },
                            { label: "Entregado", icon: "🎉" }
                          ].map((step, index) => {
                            const isCompleted = getOrderProgress(order.status) > index
                            const isCurrent = getOrderProgress(order.status) === index + 1
                            
                            return (
                              <div key={index} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1 transition-all ${
                                  isCompleted 
                                    ? 'bg-gradient-to-br from-orange-500 to-red-500 scale-110 shadow-lg' 
                                    : isCurrent
                                    ? 'bg-orange-100 border-2 border-orange-500 animate-pulse'
                                    : 'bg-gray-100 border-2 border-gray-200'
                                }`}>
                                  {step.icon}
                                </div>
                                <span className={`text-[10px] text-center leading-tight ${
                                  isCompleted || isCurrent ? 'text-orange-600 font-semibold' : 'text-gray-500'
                                }`}>
                                  {step.label}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div>
                        <p className="text-xs md:text-sm text-gray-600 mb-0.5">Total del pedido</p>
                        <span className="text-sm md:text-base text-gray-700 font-medium">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} productos
                        </span>
                      </div>
                      <span className="text-xl md:text-2xl font-bold text-green-600">${order.total.toFixed(2)}</span>
                    </div>

                    {order.estimatedDelivery && (
                      <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700 mb-4 p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-600">Entrega estimada</p>
                          <span className="font-semibold">
                            {order.estimatedDelivery.toLocaleTimeString("es-ES", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    )}

                    {order.driverInfo && order.status === "en-camino" && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl mb-4 border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-blue-900">Repartidor: {order.driverInfo.name}</p>
                            <p className="text-sm text-blue-700">{order.driverInfo.vehicle}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-blue-700">{order.driverInfo.rating}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                            <Phone className="w-4 h-4 mr-1" />
                            Llamar
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 md:gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 md:py-2.5 md:text-base">
                            Ver detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Pedido #{order.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Productos:</h4>
                              <div className="space-y-2">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex items-center gap-3">
                                    <Image
                                      src={item.product.image || "/placeholder.svg"}
                                      alt={item.product.name}
                                      width={40}
                                      height={40}
                                      className="rounded object-cover"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{item.product.name}</p>
                                      <p className="text-xs text-gray-600">Cantidad: {item.quantity}</p>
                                    </div>
                                    <span className="text-sm font-medium">
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>${(order.total - 5).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Envío y tarifas:</span>
                                <span>$5.00</span>
                              </div>
                              <div className="flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Dirección de entrega:</h4>
                              <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Método de pago:</h4>
                              <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {order.status !== "rechazado" && (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 md:py-2.5 md:text-base">
                          <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                          Contactar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Past Orders */}
        {pastOrders.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900">Pedidos anteriores</h2>
                <p className="text-sm md:text-base text-gray-600 mt-1">Historial de pedidos completados</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {pastOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-base md:text-lg text-gray-900">#{order.id}</h3>
                          <Badge className={`${getStatusColor(order.status)} text-xs md:text-sm`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{getStatusText(order.status)}</span>
                          </Badge>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 font-medium mb-1">{order.restaurantName}</p>
                        <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          {order.createdAt.toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm md:text-base text-gray-700">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} productos
                      </span>
                      <span className="text-lg md:text-xl font-bold text-green-600">${order.total.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2 md:gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 md:py-2.5 md:text-base">
                            Ver detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Pedido #{order.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Productos:</h4>
                              <div className="space-y-2">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex items-center gap-3">
                                    <Image
                                      src={item.product.image || "/placeholder.svg"}
                                      alt={item.product.name}
                                      width={40}
                                      height={40}
                                      className="rounded object-cover"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{item.product.name}</p>
                                      <p className="text-xs text-gray-600">Cantidad: {item.quantity}</p>
                                    </div>
                                    <span className="text-sm font-medium">
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>${(order.total - 5).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Envío y tarifas:</span>
                                <span>$5.00</span>
                              </div>
                              <div className="flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Dirección de entrega:</h4>
                              <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Método de pago:</h4>
                              <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {order.status === "entregado" && (
                        <Button
                          size="sm"
                          onClick={() => reorderItems(order.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-md md:py-2.5 md:text-base md:px-4"
                        >
                          <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                          <span className="hidden md:inline">Volver a pedir</span>
                          <span className="md:hidden">Repetir</span>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bottom spacing for mobile */}
        <div className="h-20 md:hidden"></div>
      </div>
    </div>
  )
}
