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

export interface Story {
  id: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  duration?: number // en segundos
  createdAt: Date
  productId?: string // opcional, para vincular con un producto
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
  stories?: Story[]
  hasActiveStories?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  restaurantId: string
  restaurantName: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  customerName: string
  customerAddress: string
  customerReference: string
  paymentMethod: string
  paymentReference?: string
  status: "nuevo" | "aceptado" | "en-preparacion" | "listo" | "en-camino" | "entregado" | "rechazado"
  timestamp: Date
  createdAt: Date
  estimatedDelivery?: Date
  deliveryAddress: string
  assignedDriver?: string
  customerInfo?: {
    name: string
    phone: string
    instructions: string
  }
  paymentDetails?: {
    reference: string
    amount: string
    phone?: string
  }
  driverInfo?: {
    name: string
    vehicle: string
    rating: number
  }
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
