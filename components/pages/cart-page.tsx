"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Minus, Trash2, MapPin, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/app-context"

export default function CartPage() {
  const { state, dispatch } = useApp()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const handleBack = () => {
    if (state.previousPage && state.previousPage !== "cart") {
      dispatch({ type: "NAVIGATE", payload: state.previousPage })
    } else {
      dispatch({ type: "NAVIGATE", payload: "home" })
    }
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId })
    } else {
      dispatch({ type: "UPDATE_CART_QUANTITY", payload: { productId, quantity: newQuantity } })
    }
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "descuento10") {
      setAppliedPromo("DESCUENTO10")
      dispatch({ type: "ADD_NOTIFICATION", payload: { type: "success", message: "¡Código promocional aplicado!" } })
    } else if (promoCode.toLowerCase() === "enviogratis") {
      setAppliedPromo("ENVIOGRATIS")
      dispatch({ type: "ADD_NOTIFICATION", payload: { type: "success", message: "¡Envío gratis aplicado!" } })
    } else {
      dispatch({ type: "ADD_NOTIFICATION", payload: { type: "error", message: "Código promocional inválido" } })
    }
    setPromoCode("")
  }

  const proceedToCheckout = () => {
    dispatch({ type: "NAVIGATE", payload: "checkout" })
  }

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <Truck className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 text-center mb-8">Agrega algunos productos deliciosos para comenzar tu pedido</p>
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

  const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = appliedPromo === "DESCUENTO10" ? subtotal * 0.1 : 0
  const deliveryFee = appliedPromo === "ENVIOGRATIS" || subtotal >= 25 ? 0 : 3.5
  const serviceFee = 1.5
  const total = subtotal - discount + deliveryFee + serviceFee

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
        {/* Delivery Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Entregar en:</h3>
                <p className="text-gray-600 text-sm">{state.location.address}</p>
                <p className="text-gray-600 text-sm">{state.location.city}</p>
              </div>
              <Button variant="outline" size="sm">
                Cambiar
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Entrega en 25-35 min</span>
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4">Tus productos</h3>
            {state.cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-start gap-3 pb-4 mb-4 border-b border-gray-200 last:border-b-0 last:mb-0"
              >
                <img
                  src={item.product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{item.product.name}</h4>
                  <p className="text-sm text-gray-600 truncate">{item.product.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-semibold text-green-600">${item.product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2 ml-auto">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Promo Code */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4">Código promocional</h3>
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {appliedPromo}
                  </Badge>
                  <span className="text-sm text-green-700">
                    {appliedPromo === "DESCUENTO10" ? "10% de descuento" : "Envío gratis"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAppliedPromo(null)}
                  className="text-green-700 hover:text-green-800"
                >
                  Quitar
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingresa tu código"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Button
                  onClick={applyPromoCode}
                  disabled={!promoCode.trim()}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Aplicar
                </Button>
              </div>
            )}
            <div className="mt-3 text-xs text-gray-500">Códigos disponibles: DESCUENTO10, ENVIOGRATIS</div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4">Resumen del pedido</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Costo de envío</span>
                <span className={`font-medium ${deliveryFee === 0 ? "text-green-600" : ""}`}>
                  {deliveryFee === 0 ? "Gratis" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tarifa de servicio</span>
                <span className="font-medium">${serviceFee.toFixed(2)}</span>
              </div>
              {subtotal < 25 && deliveryFee > 0 && (
                <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                  💡 Agrega ${(25 - subtotal).toFixed(2)} más para envío gratis
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

          </div>

          {/* Sidebar - Summary (Desktop/Tablet) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Order Summary */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Resumen del pedido</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Descuento (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Costo de envío</span>
                      <span className={`font-medium ${deliveryFee === 0 ? "text-green-600" : ""}`}>
                        {deliveryFee === 0 ? "Gratis" : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tarifa de servicio</span>
                      <span className="font-medium">${serviceFee.toFixed(2)}</span>
                    </div>
                    {subtotal < 25 && deliveryFee > 0 && (
                      <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                        💡 Agrega ${(25 - subtotal).toFixed(2)} más para envío gratis
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Button
                onClick={proceedToCheckout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-4 text-lg font-semibold"
              >
                Proceder al Checkout • ${total.toFixed(2)}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-20 md:hidden"></div>
      </div>
    </div>
  )
}
