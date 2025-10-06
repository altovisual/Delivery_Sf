"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  icon: LucideIcon | string
  label: string
  count?: string
  bgColor?: string
  iconColor?: string
  onClick?: () => void
  className?: string
}

export default function CategoryCard({
  icon: Icon,
  label,
  count,
  bgColor = "bg-orange-100",
  iconColor = "text-orange-600",
  onClick,
  className,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-2.5 p-3 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 active:scale-95 min-w-[72px]",
        className
      )}
    >
      {/* Icono con fondo circular mejorado */}
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110",
        bgColor
      )}>
        {typeof Icon === 'string' ? (
          <span className="text-xl">{Icon}</span>
        ) : (
          <Icon className={cn("w-6 h-6", iconColor)} />
        )}
      </div>

      {/* Label mejorado */}
      <div className="text-center w-full">
        <p className="text-[11px] font-semibold text-gray-900 line-clamp-1 leading-tight">
          {label}
        </p>
        {count && (
          <p className="text-[10px] text-gray-500 mt-0.5 font-medium">
            {count}
          </p>
        )}
      </div>

      {/* Indicador de hover sutil */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gray-200 transition-colors duration-200" />
    </button>
  )
}
