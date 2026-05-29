'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  className,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => {
          if (index < fullStars) {
            return (
              <Star
                key={index}
                className={cn(
                  sizeClasses[size],
                  'text-yellow-500 fill-yellow-500'
                )}
              />
            )
          } else if (index === fullStars && hasHalfStar) {
            return (
              <div key={index} className="relative">
                <Star
                  className={cn(
                    sizeClasses[size],
                    'text-gray-300'
                  )}
                />
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: '50%' }}
                >
                  <Star
                    className={cn(
                      sizeClasses[size],
                      'text-yellow-500 fill-yellow-500'
                    )}
                  />
                </div>
              </div>
            )
          } else {
            return (
              <Star
                key={index}
                className={cn(
                  sizeClasses[size],
                  'text-gray-300'
                )}
              />
            )
          }
        })}
      </div>
      {showNumber && (
        <span className="font-medium text-warm-black ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default StarRating