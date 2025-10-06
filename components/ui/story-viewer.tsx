"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, ShoppingCart, Pause, Play } from "lucide-react"
import { Story, Restaurant, Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"
import Image from "next/image"

interface StoryViewerProps {
  restaurant: Restaurant
  initialStoryIndex?: number
  onClose: () => void
  onNavigateRestaurant?: (direction: "prev" | "next") => void
}

export default function StoryViewer({
  restaurant,
  initialStoryIndex = 0,
  onClose,
  onNavigateRestaurant,
}: StoryViewerProps) {
  const { dispatch } = useApp()
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const stories = restaurant.stories || []
  const currentStory = stories[currentIndex]
  const duration = currentStory?.duration || 5 // 5 segundos por defecto para imágenes

  // Encontrar el producto vinculado si existe
  const linkedProduct = currentStory?.productId
    ? restaurant.products.find((p) => p.id === currentStory.productId)
    : null

  useEffect(() => {
    if (!currentStory || isPaused) return

    setProgress(0)
    
    if (currentStory.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      videoRef.current.muted = isMuted
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (duration * 10)
        const newProgress = prev + increment

        if (newProgress >= 100) {
          handleNext()
          return 0
        }
        return newProgress
      })
    }, 100)

    progressIntervalRef.current = interval

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentIndex, isPaused, currentStory])

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setProgress(0)
    } else {
      onNavigateRestaurant?.("next")
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setProgress(0)
    } else {
      onNavigateRestaurant?.("prev")
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const handleAddToCart = () => {
    if (linkedProduct) {
      dispatch({ type: "ADD_TO_CART", payload: { product: linkedProduct, quantity: 1 } })
      // Mostrar feedback visual
      const button = document.getElementById("add-to-cart-story")
      if (button) {
        button.classList.add("scale-95")
        setTimeout(() => button.classList.remove("scale-95"), 200)
      }
    }
  }

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width

    if (x < width / 3) {
      handlePrev()
    } else if (x > (2 * width) / 3) {
      handleNext()
    } else {
      togglePause()
    }
  }

  if (!currentStory) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-4 left-0 right-0 z-10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <Image
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{restaurant.name}</h3>
            <p className="text-white/80 text-xs">Hace {Math.floor(Math.random() * 5) + 1}h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {currentStory.type === "video" && (
            <>
              <button
                onClick={togglePause}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                {isPaused ? <Play className="w-4 h-4 text-white" /> : <Pause className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Story content */}
      <div className="relative w-full h-full max-w-md mx-auto" onClick={handleTap}>
        {currentStory.type === "image" ? (
          <Image
            src={currentStory.url}
            alt="Story"
            fill
            className="object-contain"
            priority
          />
        ) : (
          <video
            ref={videoRef}
            src={currentStory.url}
            className="w-full h-full object-contain"
            loop={false}
            playsInline
            onEnded={handleNext}
          />
        )}
      </div>

      {/* Product info overlay */}
      {linkedProduct && (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={linkedProduct.image || "/placeholder.svg"}
                    alt={linkedProduct.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">{linkedProduct.name}</h4>
                  <p className="text-white/80 text-xs line-clamp-2">{linkedProduct.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white font-bold text-lg">${linkedProduct.price.toFixed(2)}</span>
                    {linkedProduct.originalPrice && (
                      <span className="text-white/60 text-sm line-through">
                        ${linkedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  id="add-to-cart-story"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart()
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 p-0 flex-shrink-0 transition-transform"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation arrows (desktop) */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrev()
        }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
