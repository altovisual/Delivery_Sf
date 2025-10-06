"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PromotionalBannerProps {
  tagText?: string
  headline?: string
  subheadline?: string
  onClick?: () => void
}

export default function PromotionalBanner({
  tagText = "Finde de helado",
  headline = "Los mejores descuentos",
  subheadline = "para el antojo",
  onClick,
}: PromotionalBannerProps) {
  return (
    <Card
      className="bg-gradient-to-r from-primary to-accent border-0 shadow-lg cursor-pointer hover:shadow-xl active-press my-6 overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-6 text-white relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16" />
        <div className="relative z-10">
          <Badge className="bg-white/25 backdrop-blur-sm text-white mb-3 rounded-lg px-3 py-1 border border-white/30 font-bold">{tagText}</Badge>
          <h2 className="text-2xl font-bold mb-1 leading-tight">{headline}</h2>
          <p className="text-base opacity-90">{subheadline}</p>
        </div>
      </CardContent>
    </Card>
  )
}
