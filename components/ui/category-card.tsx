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
        "flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 border border-gray-100 min-w-[90px]",
        className
      )}
    >
      {/* Icono con fondo circular */}
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
        bgColor
      )}>
        {typeof Icon === 'string' ? (
          <span className="text-2xl">{Icon}</span>
        ) : (
          <Icon className={cn("w-7 h-7", iconColor)} />
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-900 line-clamp-1">
          {label}
        </p>
        {count && (
          <p className="text-[10px] text-gray-500 mt-0.5">
            {count}
          </p>
        )}
      </div>
    </button>
  )
}
