export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  restaurantId: string
  rating?: number
}

export interface Restaurant {
  id: string
  name: string
  category: string
  image: string
  rating: number
  deliveryTime: string
  deliveryFee?: string
  distance?: string
  isPromoted: boolean
  products: Product[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  restaurantId: string
  restaurantName: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  customerName: string
  customerAddress: string
  customerReference: string
  paymentMethod: "pago-movil" | "zelle-efectivo"
  paymentReference?: string
  status: "nuevo" | "aceptado" | "en-preparacion" | "listo" | "en-camino" | "entregado" | "rechazado"
  timestamp: Date
  assignedDriver?: string
}

export interface Driver {
  id: string
  name: string
  status: "libre" | "ocupado"
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
}

export interface Location {
  address: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
}
