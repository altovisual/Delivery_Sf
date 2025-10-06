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
      {/* Header con botón de volver */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Mis Pedidos</h1>
            <p className="text-xs text-gray-600">{state.orders.length} {state.orders.length === 1 ? 'pedido' : 'pedidos'}</p>
          </div>
          <Badge variant="secondary" className="font-bold">
            {state.orders.length}
          </Badge>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pedidos activos</h2>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">#{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.restaurantName}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Nuevo</span>
                        <span>Aceptado</span>
                        <span>Preparando</span>
                        <span>Listo</span>
                        <span>En camino</span>
                        <span>Entregado</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(getOrderProgress(order.status) / 6) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} productos
                      </span>
                      <span className="font-semibold text-green-600">${order.total.toFixed(2)}</span>
                    </div>

                    {order.estimatedDelivery && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>
                          Entrega estimada:{" "}
                          {order.estimatedDelivery.toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}

                    {order.driverInfo && order.status === "en-camino" && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
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

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
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
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                          <MessageCircle className="w-4 h-4 mr-1" />
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pedidos anteriores</h2>
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">#{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.restaurantName}</p>
                        <p className="text-xs text-gray-500">
                          {order.createdAt.toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} productos
                      </span>
                      <span className="font-semibold text-green-600">${order.total.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
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
                          variant="outline"
                          onClick={() => reorderItems(order.id)}
                          className="text-green-600 border-green-300"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Reordenar
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
