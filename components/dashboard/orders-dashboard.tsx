"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Download, Eye, Clock, CheckCircle, XCircle, Truck, Package } from "lucide-react"

const mockOrders = [
  {
    id: "#1234",
    customer: "María González",
    restaurant: "McDonald's",
    items: ["Big Mac", "Papas Fritas", "Coca Cola"],
    amount: 25.5,
    status: "entregado",
    driver: "José Pérez",
    time: "2024-01-15 14:30",
    address: "Av. La Patria 123",
    phone: "+58 424-1234567",
  },
  {
    id: "#1235",
    customer: "Carlos Rodríguez",
    restaurant: "Pizza Hut",
    items: ["Pizza Pepperoni Personal", "Bebida"],
    amount: 42.0,
    status: "en-camino",
    driver: "Ana Martínez",
    time: "2024-01-15 15:15",
    address: "Calle 5 con Carrera 10",
    phone: "+58 414-9876543",
  },
  {
    id: "#1236",
    customer: "Ana Martínez",
    restaurant: "Farmacia San Felipe",
    items: ["Acetaminofén 500mg", "Vitamina C"],
    amount: 15.75,
    status: "preparando",
    driver: null,
    time: "2024-01-15 15:45",
    address: "Centro Comercial San Felipe",
    phone: "+58 426-5555555",
  },
  {
    id: "#1237",
    customer: "José Pérez",
    restaurant: "Burger King",
    items: ["Whopper", "Aros de Cebolla"],
    amount: 18.25,
    status: "nuevo",
    driver: null,
    time: "2024-01-15 16:00",
    address: "Urbanización Los Pinos",
    phone: "+58 424-7777777",
  },
  {
    id: "#1238",
    customer: "Luis Fernández",
    restaurant: "KFC",
    items: ["Combo Familiar", "Ensalada"],
    amount: 35.0,
    status: "cancelado",
    driver: null,
    time: "2024-01-15 13:20",
    address: "Sector La Esperanza",
    phone: "+58 414-3333333",
  },
]

export default function OrdersDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "entregado":
        return "bg-green-100 text-green-800 border-green-200"
      case "en-camino":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "preparando":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "nuevo":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "entregado":
        return <CheckCircle className="w-3 h-3" />
      case "en-camino":
        return <Truck className="w-3 h-3" />
      case "preparando":
        return <Package className="w-3 h-3" />
      case "nuevo":
        return <Clock className="w-3 h-3" />
      case "cancelado":
        return <XCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "entregado":
        return "Entregado"
      case "en-camino":
        return "En Camino"
      case "preparando":
        return "Preparando"
      case "nuevo":
        return "Nuevo"
      case "cancelado":
        return "Cancelado"
      default:
        return status
    }
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    todos: mockOrders.length,
    nuevo: mockOrders.filter((o) => o.status === "nuevo").length,
    preparando: mockOrders.filter((o) => o.status === "preparando").length,
    "en-camino": mockOrders.filter((o) => o.status === "en-camino").length,
    entregado: mockOrders.filter((o) => o.status === "entregado").length,
    cancelado: mockOrders.filter((o) => o.status === "cancelado").length,
  }

  return (
    <div className="space-y-4">
      {/* Status Cards - More compact */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card
            key={status}
            className={`cursor-pointer transition-all hover:shadow-md ${
              statusFilter === status ? "ring-2 ring-red-500" : ""
            }`}
            onClick={() => setStatusFilter(status)}
          >
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-gray-900">{count}</div>
              <div className="text-xs text-gray-600 capitalize">
                {status === "todos" ? "Total" : getStatusText(status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Actions - More compact */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle className="text-sm">Gestión de Pedidos</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar pedidos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-48 h-8 text-sm"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32 h-8 text-sm">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="nuevo">Nuevos</SelectItem>
                  <SelectItem value="preparando">Preparando</SelectItem>
                  <SelectItem value="en-camino">En Camino</SelectItem>
                  <SelectItem value="entregado">Entregados</SelectItem>
                  <SelectItem value="cancelado">Cancelados</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
                <Download className="w-3 h-3" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="h-10">
                  <TableHead className="text-xs">Pedido</TableHead>
                  <TableHead className="text-xs">Cliente</TableHead>
                  <TableHead className="text-xs">Restaurante</TableHead>
                  <TableHead className="text-xs">Monto</TableHead>
                  <TableHead className="text-xs">Estado</TableHead>
                  <TableHead className="text-xs">Repartidor</TableHead>
                  <TableHead className="text-xs">Hora</TableHead>
                  <TableHead className="text-right text-xs">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="h-12">
                    <TableCell className="font-medium text-sm">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{order.restaurant}</TableCell>
                    <TableCell className="font-semibold text-sm">${order.amount}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} border text-xs px-2 py-1`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {getStatusText(order.status)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.driver ? (
                        <span className="text-sm">{order.driver}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Sin asignar</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      {new Date(order.time).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="h-7 w-7 p-0"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl">
                          <DialogHeader>
                            <DialogTitle className="text-lg">Detalles del Pedido {selectedOrder?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-2 text-sm">Cliente</h3>
                                  <p className="text-sm">
                                    <strong>Nombre:</strong> {selectedOrder.customer}
                                  </p>
                                  <p className="text-sm">
                                    <strong>Teléfono:</strong> {selectedOrder.phone}
                                  </p>
                                  <p className="text-sm">
                                    <strong>Dirección:</strong> {selectedOrder.address}
                                  </p>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2 text-sm">Pedido</h3>
                                  <p className="text-sm">
                                    <strong>Restaurante:</strong> {selectedOrder.restaurant}
                                  </p>
                                  <p className="text-sm">
                                    <strong>Estado:</strong> {getStatusText(selectedOrder.status)}
                                  </p>
                                  <p className="text-sm">
                                    <strong>Repartidor:</strong> {selectedOrder.driver || "Sin asignar"}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2 text-sm">Productos</h3>
                                <ul className="space-y-1">
                                  {selectedOrder.items.map((item: string, index: number) => (
                                    <li key={index} className="text-sm">
                                      • {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex justify-between items-center pt-3 border-t">
                                <span className="text-lg font-semibold">Total: ${selectedOrder.amount}</span>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    Contactar
                                  </Button>
                                  <Button size="sm">Actualizar</Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
