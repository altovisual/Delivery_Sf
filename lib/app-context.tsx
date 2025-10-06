"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Restaurant, Product, CartItem, Order, User, Location } from "./types"

interface AppState {
  user: User
  location: Location
  currentPage: string
  selectedCategory: string | null
  selectedRestaurant: Restaurant | null
  selectedProduct: Product | null
  cart: CartItem[]
  favorites: string[]
  orders: Order[]
  searchQuery: string
  isLoading: boolean
  notifications: Array<{
    id: string
    type: "success" | "error" | "info"
    message: string
    timestamp: Date
  }>
  isTransitioning: boolean
  previousPage: string | null
}

type AppAction =
  | { type: "NAVIGATE"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_RESTAURANT"; payload: Restaurant }
  | { type: "SET_PRODUCT"; payload: Product }
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_NOTIFICATION"; payload: { type: "success" | "error" | "info"; message: string } }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "PLACE_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { orderId: string; status: string } }
  | { type: "SET_LOCATION"; payload: Location }
  | { type: "SET_TRANSITIONING"; payload: boolean }

const initialState = {
  user: {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "+58 412-123-4567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
  },
  location: {
    address: "Av. Principal, Edificio Torre",
    city: "San Felipe, Yaracuy",
    coordinates: { lat: 10.3394, lng: -68.7424 },
  },
  currentPage: "home",
  selectedCategory: null,
  selectedRestaurant: null,
  selectedProduct: null,
  cart: [],
  favorites: ["1", "3", "7"],
  orders: [
    {
      id: "ORD-001",
      restaurantId: "1",
      restaurantName: "Burger Palace",
      items: [
        {
          product: {
            id: "1",
            name: "Hamburguesa Clásica",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
            price: 12.99,
            originalPrice: 15.99,
            discount: 19,
            category: "hamburguesas",
            restaurantId: "1",
            description: "Deliciosa hamburguesa con carne, lechuga, tomate y queso",
            rating: 4.5,
          },
          quantity: 2,
        },
      ],
      subtotal: 23.98,
      deliveryFee: 2.00,
      total: 25.98,
      customerName: "Juan Pérez",
      customerAddress: "Av. Principal, Edificio Torre",
      customerReference: "Edificio azul, piso 3",
      paymentMethod: "pago-movil" as const,
      status: "entregado" as const,
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "ORD-002",
      restaurantId: "2",
      restaurantName: "Pizza Corner",
      items: [
        {
          product: {
            id: "2",
            name: "Pizza Margherita",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop",
            price: 18.5,
            category: "pizzas",
            restaurantId: "2",
            description: "Pizza clásica con tomate, mozzarella y albahaca",
            rating: 4.3,
          },
          quantity: 1,
        },
      ],
      subtotal: 16.50,
      deliveryFee: 2.00,
      total: 18.5,
      customerName: "Juan Pérez",
      customerAddress: "Av. Principal, Edificio Torre",
      customerReference: "Edificio azul, piso 3",
      paymentMethod: "zelle-efectivo" as const,
      status: "en-preparacion" as const,
      timestamp: new Date(Date.now() - 1800000),
    },
  ],
  searchQuery: "",
  isLoading: false,
  notifications: [],
  isTransitioning: false,
  previousPage: null,
} satisfies AppState

// Utility function to scroll to top
const scrollToTop = () => {
  if (typeof window !== "undefined") {
    // Force immediate scroll to top
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Also try to scroll any main containers
    const containers = [
      document.querySelector("main"),
      document.querySelector("[data-scroll-container]"),
      document.querySelector(".mobile-main-content"),
      document.querySelector(".desktop-main-content"),
      document.querySelector(".dashboard-main-content"),
    ]

    containers.forEach((container) => {
      if (container) {
        container.scrollTop = 0
      }
    })
  }
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "NAVIGATE":
      // Immediate scroll to top
      scrollToTop()

      return {
        ...state,
        previousPage: state.currentPage,
        currentPage: action.payload,
        isTransitioning: true,
        ...(action.payload === "home" && {
          selectedCategory: null,
          selectedRestaurant: null,
          selectedProduct: null,
        }),
        ...(action.payload === "search" && {
          searchQuery: "",
        }),
      }

    case "SET_TRANSITIONING":
      return {
        ...state,
        isTransitioning: action.payload,
      }

    case "SET_CATEGORY":
      scrollToTop()
      return {
        ...state,
        selectedCategory: action.payload,
        currentPage: "category",
        selectedRestaurant: null,
        selectedProduct: null,
        isTransitioning: true,
      }

    case "SET_RESTAURANT":
      scrollToTop()
      return {
        ...state,
        selectedRestaurant: action.payload,
        currentPage: "restaurant",
        selectedProduct: null,
        isTransitioning: true,
      }

    case "SET_PRODUCT":
      scrollToTop()
      return {
        ...state,
        selectedProduct: action.payload,
        currentPage: "product",
        isTransitioning: true,
      }

    case "ADD_TO_CART":
      const existingItem = state.cart.find((item) => item.product.id === action.payload.product.id)
      let newCart: CartItem[]

      if (existingItem) {
        newCart = state.cart.map((item) =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        )
      } else {
        newCart = [...state.cart, action.payload]
      }

      return {
        ...state,
        cart: newCart,
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: "success",
            message: `${action.payload.product.name} agregado al carrito`,
            timestamp: new Date(),
          },
        ],
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: "info",
            message: "Producto eliminado del carrito",
            timestamp: new Date(),
          },
        ],
      }

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.product.id === action.payload.productId
              ? { ...item, quantity: Math.max(0, action.payload.quantity) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: "info",
            message: "Carrito vaciado",
            timestamp: new Date(),
          },
        ],
      }

    case "TOGGLE_FAVORITE":
      const isFavorite = state.favorites.includes(action.payload)
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: "success",
            message: isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos",
            timestamp: new Date(),
          },
        ],
      }

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: action.payload.type,
            message: action.payload.message,
            timestamp: new Date(),
          },
        ],
      }

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.payload),
      }

    case "PLACE_ORDER":
      scrollToTop()
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cart: [],
        currentPage: "orders",
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: "success",
            message: `Pedido #${action.payload.id} realizado con éxito`,
            timestamp: new Date(),
          },
        ],
        isTransitioning: true,
      }

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId ? { ...order, status: action.payload.status as Order["status"] } : order,
        ),
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: "info",
            message: `Pedido #${action.payload.orderId} actualizado: ${action.payload.status}`,
            timestamp: new Date(),
          },
        ],
      }

    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
      }

    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Handle transition completion
  useEffect(() => {
    if (state.isTransitioning) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_TRANSITIONING", payload: false })
      }, 150)

      return () => clearTimeout(timer)
    }
  }, [state.isTransitioning])

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    const timers = state.notifications.map((notification) => {
      return setTimeout(() => {
        dispatch({ type: "REMOVE_NOTIFICATION", payload: notification.id })
      }, 5000)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [state.notifications])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
