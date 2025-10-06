"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/context"
import type { Order } from "@/lib/types"

export default function RestaurantDashboard() {
  const { state, dispatch } = useApp()
  const [playSound, setPlaySound] = useState(false)

  // Filter orders for current restaurant (simplified - in real app would be based on auth)
  const restaurantOrders = state.orders

  const newOrders = restaurantOrders.filter((order) => order.status === "nuevo")
  const preparingOrders = restaurantOrders.filter((order) => order.status === "en-preparacion")
  const readyOrders = restaurantOrders.filter((order) => order.status === "listo")

  // Play sound when new order arrives
  useEffect(() => {
    if (newOrders.length > 0 && playSound) {
      // In a real app, you'd play an actual sound file
      console.log("🔔 Nueva orden recibida!")
    }
  }, [newOrders.length, playSound])

  const acceptOrder = (orderId: string) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status: "en-preparacion" } })
  }

  const rejectOrder = (orderId: string) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status: "rechazado" } })
  }

  const markReady = (orderId: string) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status: "listo" } })
  }

  const OrderCard = ({ order, actions }: { order: Order; actions: React.ReactNode }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">#{order.id}</CardTitle>
            <p className="text-sm text-gray-600">{order.customerName}</p>
            <p className="text-xs text-gray-500">{order.timestamp.toLocaleTimeString()}</p>
          </div>
          <Badge variant="outline">${order.total.toFixed(2)}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.product.name}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-600 mb-3">
          <p>📍 {order.customerAddress}</p>
          <p>📝 {order.customerReference}</p>
        </div>
        {actions}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel del Restaurante</h1>
          <p className="text-gray-600">Gestiona tus pedidos entrantes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Orders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                NUEVOS PEDIDOS
                {newOrders.length > 0 && <Badge className="ml-2 bg-red-500">{newOrders.length}</Badge>}
              </h2>
            </div>
            <div className="space-y-4">
              {newOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actions={
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => acceptOrder(order.id)}
                      >
                        Aceptar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => rejectOrder(order.id)}
                      >
                        Rechazar
                      </Button>
                    </div>
                  }
                />
              ))}
              {newOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📭</div>
                  <p>No hay pedidos nuevos</p>
                </div>
              )}
            </div>
          </div>

          {/* Preparing Orders */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              EN PREPARACIÓN
              {preparingOrders.length > 0 && <Badge className="ml-2 bg-yellow-500">{preparingOrders.length}</Badge>}
            </h2>
            <div className="space-y-4">
              {preparingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actions={
                    <Button
                      size="sm"
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => markReady(order.id)}
                    >
                      Marcar como Listo
                    </Button>
                  }
                />
              ))}
              {preparingOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">👨‍🍳</div>
                  <p>No hay pedidos en preparación</p>
                </div>
              )}
            </div>
          </div>

          {/* Ready Orders */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              LISTOS PARA RECOGER
              {readyOrders.length > 0 && <Badge className="ml-2 bg-green-500">{readyOrders.length}</Badge>}
            </h2>
            <div className="space-y-4">
              {readyOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actions={
                    <div className="text-center">
                      <Badge className="bg-green-500 text-white">✅ Listo para Recoger</Badge>
                    </div>
                  }
                />
              ))}
              {readyOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📦</div>
                  <p>No hay pedidos listos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
