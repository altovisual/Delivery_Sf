"use client"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"
import { useApp } from "@/lib/app-context"

export default function NotificationToast() {
  const { state, dispatch } = useApp()

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  if (state.notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {state.notifications.slice(-3).map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg max-w-sm animate-in slide-in-from-right-full ${getBackgroundColor(
            notification.type,
          )}`}
        >
          {getIcon(notification.type)}
          <p className="flex-1 text-sm font-medium text-gray-900">{notification.message}</p>
          <button
            onClick={() => dispatch({ type: "REMOVE_NOTIFICATION", payload: notification.id })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
