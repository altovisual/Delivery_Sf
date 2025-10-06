"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useApp } from "@/lib/context"
import { restaurants } from "@/data/restaurants" // Declare the restaurants variable

interface CheckoutProps {
  onBack: () => void
  onNavigate: (page: string) => void
}

export default function Checkout({ onBack, onNavigate }: CheckoutProps) {
  const { state, dispatch } = useApp()
  const [step, setStep] = useState<"checkout" | "status">("checkout")
  const [orderId, setOrderId] = useState<string>("")

  const [formData, setFormData] = useState({
    address: "",
    reference: "",
    paymentMethod: "pago-movil" as "pago-movil" | "zelle-efectivo",
    paymentReference: "",
  })

  const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const deliveryFee = subtotal > 10 ? 0 : 2.5
  const total = subtotal + deliveryFee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.address || !formData.reference) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    const restaurantId = state.cart[0]?.product.restaurantId
    const restaurantName = state.cart[0]
      ? restaurants.find((r) => r.id === restaurantId)?.name || "Restaurante"
      : "Restaurante"

    dispatch({
      type: "CREATE_ORDER",
      payload: {
        restaurantId: restaurantId || 1,
        restaurantName,
        items: state.cart,
        subtotal,
        deliveryFee,
        total,
        customerName: state.currentUser,
        customerAddress: formData.address,
        customerReference: formData.reference,
        paymentMethod: formData.paymentMethod,
        paymentReference: formData.paymentReference,
      },
    })

    const newOrderId = `ORD-${Date.now()}`
    setOrderId(newOrderId)
    dispatch({ type: "CLEAR_CART" })
    setStep("status")
  }

  if (step === "status") {
    return <OrderStatus orderId={orderId} onNavigate={onNavigate} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Checkout</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-6 pb-32">
        {/* Delivery Address */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Dirección de Entrega</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Dirección Completa *</Label>
                <Textarea
                  id="address"
                  placeholder="Ej: Calle 5 con Carrera 10, Casa #25"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reference">Punto de Referencia *</Label>
                <Input
                  id="reference"
                  placeholder="Ej: Frente al supermercado"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Método de Pago</h3>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value: "pago-movil" | "zelle-efectivo") =>
                setFormData({ ...formData, paymentMethod: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pago-movil" id="pago-movil" />
                <Label htmlFor="pago-movil">Pago Móvil (Bs.)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="zelle-efectivo" id="zelle-efectivo" />
                <Label htmlFor="zelle-efectivo">Zelle / Efectivo ($)</Label>
              </div>
            </RadioGroup>

            {formData.paymentMethod === "pago-movil" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Datos para Pago Móvil:</h4>
                <p className="text-sm text-gray-600">CI: 12.345.678</p>
                <p className="text-sm text-gray-600">Teléfono: 0424-1234567</p>
                <p className="text-sm text-gray-600">Banco: Banesco</p>
                <div className="mt-3">
                  <Label htmlFor="reference">Número de Referencia</Label>
                  <Input
                    id="paymentReference"
                    placeholder="Ingresa el número de referencia"
                    value={formData.paymentReference}
                    onChange={(e) => setFormData({ ...formData, paymentReference: e.target.value })}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Resumen del Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Costo de Envío</span>
                <span>{deliveryFee === 0 ? "Gratis" : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Confirm Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full"
          onClick={handleSubmit}
        >
          Confirmar Pedido
        </Button>
      </div>
    </div>
  )
}

function OrderStatus({ orderId, onNavigate }: { orderId: string; onNavigate: (page: string) => void }) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { label: "Pedido Recibido", icon: "📝" },
    { label: "En Preparación", icon: "👨‍🍳" },
    { label: "En Camino", icon: "🚚" },
    { label: "Entregado", icon: "✅" },
  ]

  // Simulate order progress
  useState(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 3000)
    return () => clearInterval(interval)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Gracias por tu pedido!</h1>
          <p className="text-gray-600">ID: #{orderId}</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-6 text-center">Estado del Pedido</h3>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      index <= currentStep ? "bg-green-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {index <= currentStep ? "✓" : step.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${index <= currentStep ? "text-green-600" : "text-gray-500"}`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button onClick={() => onNavigate("home")} className="bg-orange-500 hover:bg-orange-600">
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
