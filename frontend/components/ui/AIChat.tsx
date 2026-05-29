'use client'

import { useState } from 'react'
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

  const quickReplies = [
    'Bridal makeup in Bandra',
    'Best nail salon near me',
    'Hair spa under ₹1000',
    'Makeup studio in Juhu',
  ]

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const text = inputText
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')

    setTimeout(() => {
      let aiResponse = ''

      if (text.toLowerCase().includes('bridal')) {
        aiResponse =
          'For bridal makeup in Bandra, I recommend Lavelle Beauty Mumbai (4.9★) and Aurora Beauty Lounge (4.8★). Both specialize in Indian bridal looks and offer trial sessions.'
      } else if (text.toLowerCase().includes('hair')) {
        aiResponse =
          'For hair services, check out Blush Studio Mumbai (4.7★, ₹₹) for great value or Velvet Touch Salon (4.6★, ₹₹) for experienced stylists.'
      } else if (text.toLowerCase().includes('nail')) {
        aiResponse =
          'For nail art, Radiance Beauty Bar (4.8★, ₹₹₹) is trending with amazing designs. They also offer lash extensions and makeup services.'
      } else {
        aiResponse =
          "Tell me your area and what you're looking for! I can recommend the perfect salons based on your occasion, budget, and preferences."
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
        },
      ])
    }, 1000)
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
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about salons..."
                    className="flex-1 min-w-0 bg-espresso/5 border border-espresso/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-warm-black placeholder-warm-black/40 focus:outline-none focus:ring-2 focus:ring-rose-gold"
                  />
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="bg-rose-gold text-warm-black rounded-lg p-2.5 sm:p-3 hover:bg-rose-gold/90 transition-colors shrink-0"
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
