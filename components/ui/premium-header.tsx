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
      <div className="flex items-center justify-between px-4 h-14 safe-area-top">
        {/* Botón atrás */}
        {onBack && (
          <button
            onClick={onBack}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90",
              transparent
                ? "bg-white/90 backdrop-blur-sm shadow-lg"
                : "bg-gray-100 hover:bg-gray-200"
            )}
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
        )}

        {/* Título */}
        {title && (
          <h1 className="flex-1 mx-4 text-lg font-bold text-gray-900 truncate">
            {title}
          </h1>
        )}

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {onFavorite && (
            <button
              onClick={onFavorite}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90",
                transparent
                  ? "bg-white/90 backdrop-blur-sm shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-all",
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-800"
                )}
              />
            </button>
          )}

          {onShare && (
            <button
              onClick={onShare}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90",
                transparent
                  ? "bg-white/90 backdrop-blur-sm shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              <Share className="w-5 h-5 text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
