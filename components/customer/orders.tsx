"use client"

import { ArrowLeft, Clock, CheckCircle, Truck, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/context"

interface OrdersProps {
  onBack: () => void
}

export default function Orders({ onBack }: OrdersProps) {
  const { state } = useApp()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "nuevo":
      case "aceptado":
        return <Clock className="w-4 h-4" />
      case "en-preparacion":
        return <Package className="w-4 h-4" />
      case "listo":
      case "en-camino":
        return <Truck className="w-4 h-4" />
      case "entregado":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuevo":
        return "bg-blue-500"
      case "aceptado":
      case "en-preparacion":
        return "bg-yellow-500"
      case "listo":
      case "en-camino":
        return "bg-orange-500"
      case "entregado":
        return "bg-green-500"
      case "rechazado":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "nuevo":
        return "Nuevo"
      case "aceptado":
        return "Aceptado"
      case "en-preparacion":
        return "En Preparación"
      case "listo":
        return "Listo"
      case "en-camino":
        return "En Camino"
      case "entregado":
        return "Entregado"
      case "rechazado":
        return "Rechazado"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Mis Pedidos</h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-4">
        {state.orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No tienes pedidos</h2>
            <p className="text-gray-600">Cuando hagas un pedido, aparecerá aquí</p>
          </div>
        ) : (
          <div className="space-y-4">
            {state.orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">#{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.restaurantName}</p>
                      <p className="text-xs text-gray-500">
                        {order.timestamp.toLocaleDateString()} {order.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </div>
                    </Badge>
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {item.product.name}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                    {order.assignedDriver && (
                      <span className="text-sm text-gray-600">Repartidor: {order.assignedDriver}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
