"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useApp } from "@/lib/context"
import type { Order } from "@/lib/types"

export default function AdminDashboard() {
  const { state, dispatch } = useApp()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedDriver, setSelectedDriver] = useState<string>("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // Orders ready to be assigned
  const readyOrders = state.orders.filter((order) => order.status === "listo")
  const availableDrivers = state.drivers.filter((driver) => driver.status === "libre")

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order)
    setSelectedDriver("")
  }

  const handleDriverSelect = (driverId: string) => {
    setSelectedDriver(driverId)
    if (selectedOrder) {
      setShowConfirmModal(true)
    }
  }

  const confirmAssignment = () => {
    if (selectedOrder && selectedDriver) {
      dispatch({
        type: "ASSIGN_DRIVER",
        payload: { orderId: selectedOrder.id, driverId: selectedDriver },
      })
      dispatch({
        type: "UPDATE_ORDER_STATUS",
        payload: { orderId: selectedOrder.id, status: "en-camino" },
      })
      setSelectedOrder(null)
      setSelectedDriver("")
      setShowConfirmModal(false)
    }
  }

  const getDriverName = (driverId: string) => {
    return state.drivers.find((d) => d.id === driverId)?.name || ""
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel de Administrador</h1>
          <p className="text-gray-600">Asigna pedidos a repartidores disponibles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Ready to Assign */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pedidos Listos para Asignar
                  {readyOrders.length > 0 && <Badge className="bg-orange-500">{readyOrders.length}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {readyOrders.map((order) => (
                    <Card
                      key={order.id}
                      className={`cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id ? "ring-2 ring-orange-500 bg-orange-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleOrderSelect(order)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">#{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.restaurantName}</p>
                          </div>
                          <Badge variant="outline">${order.total.toFixed(2)}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>📍 {order.customerAddress}</p>
                          <p>👤 {order.customerName}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {readyOrders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📦</div>
                      <p>No hay pedidos listos para asignar</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Drivers */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Repartidores Disponibles
                  {availableDrivers.length > 0 && <Badge className="bg-green-500">{availableDrivers.length}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {state.drivers.map((driver) => (
                    <Card
                      key={driver.id}
                      className={`cursor-pointer transition-colors ${
                        driver.status === "ocupado"
                          ? "opacity-50 cursor-not-allowed"
                          : selectedDriver === driver.id
                            ? "ring-2 ring-green-500 bg-green-50"
                            : "hover:bg-gray-50"
                      }`}
                      onClick={() => driver.status === "libre" && handleDriverSelect(driver.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{driver.name}</h3>
                            <p className="text-sm text-gray-600">ID: {driver.id}</p>
                          </div>
                          <Badge
                            className={driver.status === "libre" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                          >
                            {driver.status === "libre" ? "Libre" : "Ocupado"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                <strong>Instrucciones:</strong>
              </p>
              <p>
                1. Selecciona un pedido de la lista izquierda
                <br />
                2. Selecciona un repartidor disponible de la lista derecha
                <br />
                3. Confirma la asignación en el modal
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Asignación</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                ¿Asignar el pedido <strong>#{selectedOrder?.id}</strong> a{" "}
                <strong>{getDriverName(selectedDriver)}</strong>?
              </p>
              {selectedOrder && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm">
                    <strong>Restaurante:</strong> {selectedOrder.restaurantName}
                  </p>
                  <p className="text-sm">
                    <strong>Cliente:</strong> {selectedOrder.customerName}
                  </p>
                  <p className="text-sm">
                    <strong>Dirección:</strong> {selectedOrder.customerAddress}
                  </p>
                  <p className="text-sm">
                    <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmAssignment} className="bg-orange-500 hover:bg-orange-600">
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
