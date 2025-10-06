"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
}

export default function SearchBar({ placeholder = "¿Qué quieres hoy?", value, onChange, onFocus }: SearchBarProps) {
  return (
    <div className="my-3">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          className="pl-12 pr-4 h-12 bg-muted/50 border-2 border-transparent rounded-2xl text-base placeholder:text-muted-foreground focus:bg-background focus:border-primary ios-shadow-lg"
        />
      </div>
    </div>
  )
}
