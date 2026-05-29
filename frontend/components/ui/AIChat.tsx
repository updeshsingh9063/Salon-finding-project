'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your GlowCity AI beauty consultant. How can I help you find the perfect salon in Mumbai?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Listen for open event from other components
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-ai-chat', handleOpen)
    return () => window.removeEventListener('open-ai-chat', handleOpen)
  }, [])

  // Listen for prefill+send event from AIConsultant chips
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const text = (e as CustomEvent<string>).detail
      if (!text) return
      setIsOpen(true)
      // Small delay so the panel animates open before sending
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() },
        ])
        setIsLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com'
        fetch(`${apiUrl}/api/ai/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        })
          .then(r => r.json())
          .then(data => {
            setMessages(prev => [
              ...prev,
              { id: (Date.now() + 1).toString(), text: data.reply || 'Let me help you find the perfect salon!', sender: 'ai', timestamp: new Date() },
            ])
          })
          .catch(() => {
            setMessages(prev => [
              ...prev,
              { id: (Date.now() + 1).toString(), text: "I'm having trouble connecting. Ask me about salons in Mumbai!", sender: 'ai', timestamp: new Date() },
            ])
          })
          .finally(() => setIsLoading(false))
      }, 400)
    }
    window.addEventListener('prefill-ai-chat', handlePrefill)
    return () => window.removeEventListener('prefill-ai-chat', handlePrefill)
  }, [])

  const quickReplies = [
    'Bridal makeup in Bandra',
    'Best nail salon near me',
    'Hair spa under ₹1000',
    'Makeup studio in Juhu',
  ]

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const text = inputText
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com'
      const response = await fetch(`${apiUrl}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.reply || "I'm here to help! Ask me about salons, services, or areas in Mumbai.",
          sender: 'ai',
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble connecting right now. Try asking about bridal makeup, hair, nails, or facials in Mumbai!",
          sender: 'ai',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-rose-gold to-blush rounded-full shadow-xl flex items-center justify-center"
        aria-label="Open AI chat"
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-cream" />
        <div className="absolute inset-0 rounded-full border-2 border-rose-gold/30 animate-pulse-ring" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 p-0 sm:p-4 md:p-6 flex items-end sm:items-center justify-center sm:justify-end"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'bg-cream shadow-2xl overflow-hidden flex flex-col w-full',
                'h-[min(100dvh,640px)] sm:h-[480px] sm:max-w-[350px]',
                'rounded-t-2xl sm:rounded-2xl',
                'sm:absolute sm:bottom-6 sm:right-6'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-rose-gold to-blush p-4 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Sparkles className="h-5 w-5 text-cream shrink-0" />
                    <h3 className="font-playfair text-lg sm:text-xl font-bold text-cream truncate">
                      GlowCity AI
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-cream hover:text-cream/80 p-1 shrink-0"
                    aria-label="Close chat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-cream/90 text-sm mt-1">Your personal beauty consultant</p>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn('flex', message.sender === 'user' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[85%] sm:max-w-[80%] rounded-2xl p-3',
                          message.sender === 'user'
                            ? 'bg-rose-gold text-warm-black rounded-br-none'
                            : 'bg-espresso/5 text-warm-black rounded-bl-none'
                        )}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-espresso/5 text-warm-black rounded-2xl rounded-bl-none p-3">
                        <div className="flex gap-1 items-center">
                          <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="mt-4 pt-4">
                  <p className="text-warm-black/60 text-xs sm:text-sm mb-2">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        type="button"
                        onClick={() => setInputText(reply)}
                        className="px-3 py-2 bg-espresso/5 text-warm-black text-xs sm:text-sm rounded-lg hover:bg-espresso/10 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-espresso/10 p-3 sm:p-4 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    placeholder={isLoading ? 'GlowCity AI is thinking...' : 'Ask about salons...'}
                    disabled={isLoading}
                    className="flex-1 min-w-0 bg-espresso/5 border border-espresso/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-warm-black placeholder-warm-black/40 focus:outline-none focus:ring-2 focus:ring-rose-gold disabled:opacity-60"
                  />
                  <motion.button
                    type="button"
                    whileTap={isLoading ? {} : { scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputText.trim()}
                    className="bg-rose-gold text-warm-black rounded-lg p-2.5 sm:p-3 hover:bg-rose-gold/90 transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChat
