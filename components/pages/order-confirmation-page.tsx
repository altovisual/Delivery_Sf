"use client"

import { CheckCircle, Home, Phone, Share2, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/lib/app-context"

export default function OrderConfirmationPage() {
  const { state, dispatch } = useApp()
  
  // Obtener el último pedido
  const lastOrder = state.orders[state.orders.length - 1]

  if (!lastOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No se encontró el pedido</h2>
          <Button onClick={() => dispatch({ type: "NAVIGATE", payload: "home" })}>
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  const shareOrder = () => {
    const message = `¡Pedido confirmado! 🎉\n\nNúmero de orden: ${lastOrder.id}\nTotal: $${lastOrder.total.toFixed(2)}\nTiempo estimado: 25-35 min`
    
    if (navigator.share) {
      navigator.share({
        title: 'Mi Pedido',
        text: message,
      })
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(message)
      dispatch({ type: "ADD_NOTIFICATION", payload: { type: "success", message: "¡Copiado al portapapeles!" } })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Animación de éxito */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 mb-6 animate-bounce">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Pedido Confirmado!
        </h1>
        <p className="text-gray-600 mb-6">
          Tu pedido ha sido recibido y está siendo preparado
        </p>

        {/* Número de orden destacado */}
        <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Número de orden</p>
          <p className="text-5xl font-bold text-red-600 tracking-wider">
            {lastOrder.id}
          </p>
        </div>
      </div>

      {/* Información del pedido */}
      <div className="px-4 pb-6 space-y-4">
        {/* Tiempo estimado */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Tiempo estimado</p>
                <p className="text-xl font-bold text-green-700">25-35 minutos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dirección de entrega */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">Entregar en:</p>
                <p className="text-sm text-gray-600">{lastOrder.deliveryAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen del pedido */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-900 mb-3">Resumen del pedido</h3>
            <div className="space-y-2 mb-4">
              {lastOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${lastOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span>{lastOrder.deliveryFee === 0 ? 'Gratis' : `$${lastOrder.deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span className="text-green-600">${lastOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Método de pago */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Método de pago</p>
                <p className="font-medium text-gray-900">{lastOrder.paymentMethod}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botones de acción */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
        <Button
          onClick={shareOrder}
          variant="outline"
          className="w-full border-2 border-gray-300 hover:bg-gray-50"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Compartir pedido
        </Button>
        
        <Button
          onClick={() => dispatch({ type: "NAVIGATE", payload: "orders" })}
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
        >
          Ver mis pedidos
        </Button>
        
        <Button
          onClick={() => dispatch({ type: "NAVIGATE", payload: "home" })}
          variant="ghost"
          className="w-full"
        >
          <Home className="w-5 h-5 mr-2" />
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}
