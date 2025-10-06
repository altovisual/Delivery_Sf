"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Truck,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const salesData = [
  { name: "Lun", ventas: 2400, pedidos: 24 },
  { name: "Mar", ventas: 1398, pedidos: 18 },
  { name: "Mié", ventas: 9800, pedidos: 45 },
  { name: "Jue", ventas: 3908, pedidos: 32 },
  { name: "Vie", ventas: 4800, pedidos: 38 },
  { name: "Sáb", ventas: 3800, pedidos: 41 },
  { name: "Dom", ventas: 4300, pedidos: 35 },
]

const categoryData = [
  { name: "Comida Rápida", value: 45, color: "#ef4444" },
  { name: "Pizzas", value: 25, color: "#f97316" },
  { name: "Farmacia", value: 15, color: "#22c55e" },
  { name: "Súper", value: 15, color: "#3b82f6" },
]

const recentOrders = [
  {
    id: "#1234",
    customer: "María González",
    restaurant: "McDonald's",
    amount: 25.5,
    status: "entregado",
    time: "5 min",
  },
  {
    id: "#1235",
    customer: "Carlos Rodríguez",
    restaurant: "Pizza Hut",
    amount: 42.0,
    status: "en-camino",
    time: "12 min",
  },
  {
    id: "#1236",
    customer: "Ana Martínez",
    restaurant: "Farmacia SF",
    amount: 15.75,
    status: "preparando",
    time: "18 min",
  },
  {
    id: "#1237",
    customer: "José Pérez",
    restaurant: "Burger King",
    amount: 18.25,
    status: "nuevo",
    time: "25 min",
  },
]

const topRestaurants = [
  { name: "McDonald's", orders: 156, revenue: 3240, rating: 4.8, growth: 12 },
  { name: "Pizza Hut", orders: 98, revenue: 2890, rating: 4.6, growth: 8 },
  { name: "KFC", orders: 87, revenue: 2156, rating: 4.7, growth: -3 },
  { name: "Burger King", orders: 76, revenue: 1987, rating: 4.5, growth: 15 },
]

export default function OverviewDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "entregado":
        return "bg-green-100 text-green-800"
      case "en-camino":
        return "bg-blue-100 text-blue-800"
      case "preparando":
        return "bg-yellow-100 text-yellow-800"
      case "nuevo":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
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
      default:
        return status
    }
  }

  return (
    <div className="space-y-4">
      {/* KPI Cards - More compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-gray-600">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-xl font-bold text-gray-900">$12,345</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5%</span>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-full -mr-8 -mt-8"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-gray-600">Pedidos Totales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-xl font-bold text-gray-900">1,247</div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+8.2%</span>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full -mr-8 -mt-8"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-gray-600">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-xl font-bold text-gray-900">892</div>
            <div className="flex items-center text-xs text-purple-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+15.3%</span>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-full -mr-8 -mt-8"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-gray-600">Repartidores</CardTitle>
            <Truck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-xl font-bold text-gray-900">24/32</div>
            <div className="flex items-center text-xs text-orange-600 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>75% activos</span>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-full -mr-8 -mt-8"></div>
        </Card>
      </div>

      {/* Charts Row - More compact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm">
              <span>Ventas de la Semana</span>
              <Button variant="outline" size="sm" className="h-7 px-2">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="ventas"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVentas)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Distribución por Categorías</CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row - More compact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm">
              <span>Pedidos Recientes</span>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                Ver todos
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-xs">{order.id}</span>
                      <Badge className={`text-xs px-1 py-0 h-4 ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 truncate">{order.customer}</p>
                    <p className="text-xs text-gray-500 truncate">{order.restaurant}</p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-semibold text-xs">${order.amount}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Restaurants */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm">
              <span>Top Restaurantes</span>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                Ver ranking
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2">
              {topRestaurants.map((restaurant, index) => (
                <div key={restaurant.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs truncate">{restaurant.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{restaurant.orders}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-semibold text-xs">${restaurant.revenue}</p>
                    <div className="flex items-center gap-1 text-xs">
                      {restaurant.growth > 0 ? (
                        <ArrowUpRight className="w-3 h-3 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-600" />
                      )}
                      <span className={restaurant.growth > 0 ? "text-green-600" : "text-red-600"}>
                        {Math.abs(restaurant.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
