"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Package, Bike, MapPin } from "lucide-react"

interface OrderTrackingProps {
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivering" | "delivered"
  estimatedTime?: string
  driverName?: string
  driverPhone?: string
}

const statusConfig = {
  pending: { label: "Pendiente", icon: Clock, color: "warning" },
  confirmed: { label: "Confirmado", icon: Check, color: "success" },
  preparing: { label: "Preparando", icon: Package, color: "info" },
  ready: { label: "Listo", icon: Check, color: "success" },
  delivering: { label: "En camino", icon: Bike, color: "secondary" },
  delivered: { label: "Entregado", icon: MapPin, color: "success" },
}

export default function OrderTracking({
  status,
  estimatedTime,
  driverName,
  driverPhone
}: OrderTrackingProps) {
  const steps = ["confirmed", "preparing", "ready", "delivering", "delivered"]
  const currentStepIndex = steps.indexOf(status)
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full bg-${config.color}/10`}>
              <Icon className={`w-6 h-6 text-${config.color}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{config.label}</h3>
              {estimatedTime && (
                <p className="text-sm text-muted-foreground">Tiempo estimado: {estimatedTime}</p>
              )}
            </div>
          </div>
          <Badge variant={config.color as any} className="text-xs">
            {config.label}
          </Badge>
        </div>

        {/* Progress Steps */}
        <div className="relative">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => {
              const stepConfig = statusConfig[step as keyof typeof statusConfig]
              const StepIcon = stepConfig.icon
              const isCompleted = index <= currentStepIndex
              const isCurrent = index === currentStepIndex

              return (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center smooth-transition ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    } ${isCurrent ? "ring-4 ring-primary/20 scale-110" : ""}`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs mt-2 text-center ${isCompleted ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                    {stepConfig.label}
                  </span>
                </div>
              )
            })}
          </div>
          
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
            <div
              className="h-full bg-primary smooth-transition"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Driver Info */}
        {driverName && status === "delivering" && (
          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Tu repartidor</p>
                <p className="text-base font-bold">{driverName}</p>
                {driverPhone && (
                  <p className="text-sm text-muted-foreground">{driverPhone}</p>
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bike className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
