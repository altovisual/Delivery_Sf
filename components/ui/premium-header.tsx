"use client"

import { ArrowLeft, Heart, Share } from "lucide-react"
import { cn } from "@/lib/utils"

interface PremiumHeaderProps {
  title?: string
  onBack?: () => void
  onFavorite?: () => void
  onShare?: () => void
  isFavorite?: boolean
  transparent?: boolean
  className?: string
}

export default function PremiumHeader({
  title,
  onBack,
  onFavorite,
  onShare,
  isFavorite,
  transparent,
  className,
}: PremiumHeaderProps) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 safe-area-top">
        {/* Botón atrás mejorado */}
        {onBack && (
          <button
            onClick={onBack}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 group",
              transparent
                ? "bg-white/95 backdrop-blur-md shadow-xl hover:shadow-2xl border border-white/20"
                : "bg-gray-100 hover:bg-gray-200 hover:shadow-md"
            )}
          >
            <ArrowLeft className={cn(
              "w-5 h-5 transition-transform group-hover:-translate-x-0.5",
              transparent ? "text-gray-900" : "text-gray-800"
            )} />
          </button>
        )}

        {/* Título */}
        {title && (
          <h1 className="flex-1 mx-4 text-lg font-bold text-gray-900 truncate">
            {title}
          </h1>
        )}

        {/* Acciones mejoradas */}
        <div className="flex items-center gap-2">
          {onFavorite && (
            <button
              onClick={onFavorite}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 group relative overflow-hidden",
                transparent
                  ? "bg-white/95 backdrop-blur-md shadow-xl hover:shadow-2xl border border-white/20"
                  : "bg-gray-100 hover:bg-gray-200 hover:shadow-md",
                isFavorite && "bg-red-50 hover:bg-red-100"
              )}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isFavorite
                    ? "fill-red-500 text-red-500 scale-110"
                    : transparent 
                      ? "text-gray-900 group-hover:text-red-500 group-hover:scale-110" 
                      : "text-gray-800 group-hover:text-red-500 group-hover:scale-110"
                )}
              />
              {/* Efecto de pulso al estar en favoritos */}
              {isFavorite && (
                <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
              )}
            </button>
          )}

          {onShare && (
            <button
              onClick={onShare}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 group",
                transparent
                  ? "bg-white/95 backdrop-blur-md shadow-xl hover:shadow-2xl border border-white/20"
                  : "bg-gray-100 hover:bg-gray-200 hover:shadow-md"
              )}
            >
              <Share className={cn(
                "w-5 h-5 transition-all group-hover:scale-110 group-hover:rotate-12",
                transparent ? "text-gray-900" : "text-gray-800"
              )} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
