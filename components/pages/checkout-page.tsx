"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, CreditCard, Smartphone, DollarSign, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/app-context"

export default function CheckoutPage() {
  const { state, dispatch } = useApp()
  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: state.user.name,
    phone: state.user.phone,
    address: state.location.address,
    city: state.location.city,
    instructions: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"pago-movil" | "zelle" | "efectivo">("pago-movil")
  const [paymentDetails, setPaymentDetails] = useState({
    reference: "",
    amount: "",
    phone: "",
  })

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      dispatch({ type: "NAVIGATE", payload: "cart" })
    }
  }

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePlaceOrder = () => {
    const subtotal = calculateSubtotal()
    const deliveryFee = subtotal >= 25 ? 0 : 3.5
    
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      userId: state.user.id,
      restaurantId: state.cart[0]?.product.restaurantId || "1",
      restaurantName: "Pedido Múltiple",
      items: state.cart,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: calculateTotal(),
      customerName: deliveryInfo.name,
      customerAddress: `${deliveryInfo.address}, ${deliveryInfo.city}`,
      customerReference: deliveryInfo.instructions,
      status: "nuevo" as const,
      timestamp: new Date(),
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      deliveryAddress: `${deliveryInfo.address}, ${deliveryInfo.city}`,
      paymentMethod: getPaymentMethodName(),
      customerInfo: {
        name: deliveryInfo.name,
        phone: deliveryInfo.phone,
        instructions: deliveryInfo.instructions,
      },
      paymentDetails: paymentMethod !== "efectivo" ? paymentDetails : undefined,
    }

    dispatch({ type: "PLACE_ORDER", payload: newOrder })
  }

  const calculateSubtotal = () => {
    return state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const deliveryFee = subtotal >= 25 ? 0 : 3.5
    const serviceFee = 1.5
    return subtotal + deliveryFee + serviceFee
  }

  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case "pago-movil":
        return "Pago Móvil"
      case "zelle":
        return "Zelle"
      case "efectivo":
        return "Efectivo"
      default:
        return "Pago Móvil"
    }
  }

  const bankInfo = {
    "pago-movil": {
      bank: "Banco de Venezuela",
      phone: "0414-123-4567",
      ci: "V-12.345.678",
      name: "San Felipe Express C.A.",
    },
    zelle: {
      email: "pagos@sanfelipeexpress.com",
      name: "San Felipe Express",
    },
  }

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay productos en el carrito</h2>
          <Button onClick={() => dispatch({ type: "NAVIGATE", payload: "home" })}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

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
            <h1 className="text-lg font-bold text-gray-900">Finalizar Pedido</h1>
            <p className="text-xs text-gray-600">
              {currentStep === 1 ? "Información de entrega" : "Método de pago"}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 mb-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? "text-red-500" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1 ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">Entrega</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 2 ? "bg-red-500" : "bg-gray-200"}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? "text-red-500" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2 ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">Pago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Step 1: Delivery Information */}
        {currentStep === 1 && (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-semibold">Información de entrega</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                    <input
                      type="text"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="+58 412-123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                    <input
                      type="text"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Av. Principal, Edificio Torre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                    <input
                      type="text"
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="San Felipe, Yaracuy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instrucciones especiales (opcional)
                    </label>
                    <textarea
                      value={deliveryInfo.instructions}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      rows={3}
                      placeholder="Ej: Apartamento 3B, tocar el timbre dos veces"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Tiempo estimado de entrega</span>
                  </div>
                  <p className="text-blue-800">25-35 minutos</p>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleNextStep}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 text-lg font-semibold"
              disabled={!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city}
            >
              Continuar al Pago
            </Button>
          </>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-semibold">Método de pago</h2>
                </div>

                <div className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="grid gap-3">
                    <button
                      onClick={() => setPaymentMethod("pago-movil")}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        paymentMethod === "pago-movil"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                        <div>
                          <h3 className="font-medium">Pago Móvil</h3>
                          <p className="text-sm text-gray-600">Transferencia desde tu banco</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("zelle")}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        paymentMethod === "zelle" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <div>
                          <h3 className="font-medium">Zelle</h3>
                          <p className="text-sm text-gray-600">Pago en dólares</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("efectivo")}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        paymentMethod === "efectivo"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-gray-600" />
                        <div>
                          <h3 className="font-medium">Efectivo</h3>
                          <p className="text-sm text-gray-600">Pagar al recibir</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Bank Information */}
                  {paymentMethod !== "efectivo" && (
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-3">Datos para transferencia:</h4>
                        {paymentMethod === "pago-movil" && (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Banco:</span>
                              <span className="font-medium">{bankInfo["pago-movil"].bank}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Teléfono:</span>
                              <span className="font-medium">{bankInfo["pago-movil"].phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cédula:</span>
                              <span className="font-medium">{bankInfo["pago-movil"].ci}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Titular:</span>
                              <span className="font-medium">{bankInfo["pago-movil"].name}</span>
                            </div>
                          </div>
                        )}
                        {paymentMethod === "zelle" && (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-medium">{bankInfo.zelle.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Titular:</span>
                              <span className="font-medium">{bankInfo.zelle.name}</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Payment Details Form */}
                  {paymentMethod !== "efectivo" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Número de referencia</label>
                        <input
                          type="text"
                          value={paymentDetails.reference}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, reference: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Ej: 123456789"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monto transferido</label>
                        <input
                          type="text"
                          value={paymentDetails.amount}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder={`${calculateTotal().toFixed(2)}`}
                        />
                      </div>

                      {paymentMethod === "pago-movil" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono desde donde transfirió
                          </label>
                          <input
                            type="tel"
                            value={paymentDetails.phone}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="0412-123-4567"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Resumen del pedido</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Costo de envío</span>
                    <span className="font-medium">{calculateSubtotal() >= 25 ? "Gratis" : "$3.50"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarifa de servicio</span>
                    <span className="font-medium">$1.50</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 text-lg font-semibold"
              disabled={
                paymentMethod !== "efectivo" &&
                (!paymentDetails.reference ||
                  !paymentDetails.amount ||
                  (paymentMethod === "pago-movil" && !paymentDetails.phone))
              }
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirmar Pedido • ${calculateTotal().toFixed(2)}
            </Button>
          </>
        )}

        {/* Bottom spacing for mobile */}
        <div className="h-20 md:hidden"></div>
      </div>
    </div>
  )
}
