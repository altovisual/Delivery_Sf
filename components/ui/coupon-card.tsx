"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface CouponCardProps {
  code: string
  discount: string
  description: string
  expiryDate?: string
  minOrder?: string
  variant?: "default" | "premium"
}

export default function CouponCard({
  code,
  discount,
  description,
  expiryDate,
  minOrder,
  variant = "default"
}: CouponCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className={`overflow-hidden ${variant === "premium" ? "border-premium/30 bg-gradient-to-br from-premium/5 to-transparent" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={variant === "premium" ? "premium" : "discount"} className="text-xs">
                {discount}
              </Badge>
              {expiryDate && (
                <span className="text-xs text-muted-foreground">Válido hasta {expiryDate}</span>
              )}
            </div>
            <h3 className="font-bold text-base mb-1">{description}</h3>
            {minOrder && (
              <p className="text-sm text-muted-foreground">Pedido mínimo: {minOrder}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="bg-muted px-3 py-1.5 rounded-lg border-2 border-dashed border-border">
              <code className="text-sm font-bold text-foreground">{code}</code>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="w-full"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copiar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
