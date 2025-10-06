"use client"

import { useApp } from "@/lib/context"
import { Button } from "@/components/ui/button"

export function UserTypeSelector() {
  const { state, dispatch } = useApp()

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 border">
      <div className="text-xs text-gray-500 mb-2">Modo:</div>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant={state.userType === "customer" ? "default" : "outline"}
          onClick={() => dispatch({ type: "SET_USER_TYPE", payload: "customer" })}
          className="text-xs"
        >
          Cliente
        </Button>
        <Button
          size="sm"
          variant={state.userType === "restaurant" ? "default" : "outline"}
          onClick={() => dispatch({ type: "SET_USER_TYPE", payload: "restaurant" })}
          className="text-xs"
        >
          Comercio
        </Button>
        <Button
          size="sm"
          variant={state.userType === "admin" ? "default" : "outline"}
          onClick={() => dispatch({ type: "SET_USER_TYPE", payload: "admin" })}
          className="text-xs"
        >
          Admin
        </Button>
      </div>
    </div>
  )
}
