'use client'

import { cn } from '@/lib/utils'

interface ServiceBadgeProps {
  service: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  className?: string
}

const ServiceBadge = ({
  service,
  size = 'md',
  variant = 'default',
  className,
}: ServiceBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  const variantClasses = {
    default: 'bg-rose-gold/10 text-rose-gold',
    outline: 'bg-transparent border border-rose-gold/30 text-rose-gold',
    ghost: 'bg-cream text-warm-black',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {service}
    </span>
  )
}

export default ServiceBadge