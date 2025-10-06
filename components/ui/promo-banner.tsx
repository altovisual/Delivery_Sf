"use client"

import { cn } from "@/lib/utils"

interface PromoBannerProps {
  title: string
  subtitle: string
  code?: string
  gradient?: string
  image?: string
  onClick?: () => void
  className?: string
}

export default function PromoBanner({
  title,
  subtitle,
  code,
  gradient = "from-purple-500 to-pink-500",
  image,
  onClick,
  className,
}: PromoBannerProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-3xl cursor-pointer group",
        `bg-gradient-to-r ${gradient}`,
        className
      )}
    >
      <div className="relative z-10 p-6 flex items-center justify-between">
        {/* Contenido */}
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">
            {title}
          </h3>
          <p className="text-white/90 text-sm mb-3 drop-shadow-md">
            {subtitle}
          </p>
          {code && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <span className="text-white text-xs font-semibold">
                Código: {code}
              </span>
            </div>
          )}
        </div>

        {/* Imagen decorativa */}
        {image && (
          <div className="w-24 h-24 relative">
            <img
              src={image}
              alt="Promo"
              className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
      </div>

      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  )
}
