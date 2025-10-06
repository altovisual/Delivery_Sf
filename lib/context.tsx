"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { CartItem, Order, Driver } from "./types"

interface AppState {
  cart: CartItem[]
  orders: Order[]
  drivers: Driver[]
  currentUser: string
  userType: "customer" | "restaurant" | "admin"
}

type AppAction =
  | { type: "ADD_TO_CART"; payload: { product: any; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "CREATE_ORDER"; payload: Omit<Order, "id" | "timestamp" | "status"> }
  | { type: "UPDATE_ORDER_STATUS"; payload: { orderId: string; status: Order["status"] } }
  | { type: "ASSIGN_DRIVER"; payload: { orderId: string; driverId: string } }
  | { type: "SET_USER_TYPE"; payload: "customer" | "restaurant" | "admin" }

const initialState: AppState = {
  cart: [],
  orders: [],
  drivers: [
    { id: "1", name: "José Pérez", status: "libre" },
    { id: "2", name: "María González", status: "ocupado" },
    { id: "3", name: "Carlos Rodríguez", status: "libre" },
    { id: "4", name: "Ana Martínez", status: "libre" },
  ],
  currentUser: "Usuario",
  userType: "customer",
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find((item) => item.product.id === action.payload.product.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload.product, quantity: action.payload.quantity }],
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item,
          )
          .filter((item) => item.quantity > 0),
      }

    case "CLEAR_CART":
      return { ...state, cart: [] }

    case "CREATE_ORDER":
      const newOrder: Order = {
        ...action.payload,
        id: `ORD-${Date.now()}`,
        timestamp: new Date(),
        status: "nuevo",
      }
      return {
        ...state,
        orders: [...state.orders, newOrder],
      }

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId ? { ...order, status: action.payload.status } : order,
        ),
      }

    case "ASSIGN_DRIVER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, assignedDriver: state.drivers.find((d) => d.id === action.payload.driverId)?.name }
            : order,
        ),
        drivers: state.drivers.map((driver) =>
          driver.id === action.payload.driverId ? { ...driver, status: "ocupado" } : driver,
        ),
      }

    case "SET_USER_TYPE":
      return { ...state, userType: action.payload }

    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
