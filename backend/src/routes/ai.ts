import { Router } from 'express'
import Groq from 'groq-sdk'

const router = Router()

// Initialize Groq client if API key is configured
const groqClient = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null

const SYSTEM_PROMPT = `You are GlowCity AI, a helpful and friendly beauty consultant for GlowCity — Mumbai's premium salon booking platform.

Available salons:
1. Lavelle Beauty Mumbai — Bandra West, 4.9★, ₹₹₹, Bridal/Makeup/Hair, Most Booked
2. Aurora Beauty Lounge — Juhu, 4.8★, ₹₹₹₹, Luxury Spa/Facial/Nails, New
3. Blush Studio Mumbai — Andheri West, 4.7★, ₹₹, Hair/Nails/Threading, Best Value
4. The Glow Room — Worli, 4.9★, ₹₹₹₹, Bridal/Makeup/Hair Spa, Top Rated, Private Rooms
5. Velvet Touch Salon — Colaba, 4.6★, ₹₹, Hair/Facial/Waxing
6. Radiance Beauty Bar — Powai, 4.8★, ₹₹₹, Nails/Makeup/Lashes, Trending

Service prices:
- Haircut & Styling: ₹1,200 (1 hour)
- Bridal Makeup Package: ₹15,000 (3 hours)
- Manicure & Nail Art: ₹800 (45 mins)
- Gold Facial: ₹2,500 (1.5 hours)
- Hair Spa Treatment: ₹1,800 (2 hours)
- Party Makeup: ₹3,000 (1.5 hours)

Rules:
- Keep responses concise (2-3 sentences max)
- Always recommend specific salons when relevant
- Be warm, friendly, and enthusiastic about beauty
- Use ₹ for Indian Rupee prices`

// Keyword-based fallback responses (used when Groq is unavailable or rate-limited)
function getKeywordResponse(message: string): string {
  const msg = message.toLowerCase()

  if (msg.includes('bridal') || msg.includes('wedding') || msg.includes('bride')) {
    return '👰 For bridal makeup, Lavelle Beauty Mumbai (4.9★, Bandra) and The Glow Room (4.9★, Worli) are our top picks — both offer complete bridal packages with trial sessions from ₹15,000!'
  }
  if (msg.includes('hair spa') || (msg.includes('hair') && msg.includes('spa'))) {
    return '💆 For hair spa, The Glow Room (Worli) and Blush Studio Mumbai (Andheri) are excellent choices. Hair spa treatments start from ₹1,800 including a relaxing massage!'
  }
  if (msg.includes('hair')) {
    return '✂️ For hair services, Blush Studio Mumbai (4.7★, ₹₹, Andheri) offers great value, and Velvet Touch Salon (4.6★, ₹₹, Colaba) has experienced stylists. Haircuts from ₹1,200!'
  }
  if (msg.includes('nail')) {
    return '💅 For nail art, Radiance Beauty Bar (4.8★, ₹₹₹, Powai) is our trending salon with stunning designs and lash extensions. Manicure & nail art starts from ₹800!'
  }
  if (msg.includes('facial') || msg.includes('skin') || msg.includes('glow')) {
    return '✨ For facials, Aurora Beauty Lounge (4.8★, ₹₹₹₹, Juhu) is a serene luxury retreat. Our Gold Facial treatment is ₹2,500 for 1.5 hours of pure indulgence!'
  }
  if (msg.includes('spa') || msg.includes('relax') || msg.includes('massage')) {
    return '🧖 For spa & relaxation, Aurora Beauty Lounge (4.8★, Juhu) is perfect — valet parking, refreshments, and a tranquil ambiance that melts your stress away!'
  }
  if (msg.includes('lash') || msg.includes('eyelash')) {
    return '👁️ For eyelash extensions, Radiance Beauty Bar (4.8★, Powai) specializes in lashes, nail art, and makeup — a one-stop beauty destination!'
  }
  if (msg.includes('makeup') || msg.includes('party') || msg.includes('event')) {
    return '💄 For party makeup, Radiance Beauty Bar (Powai) and Lavelle Beauty Mumbai (Bandra) are top choices. Party makeup with HD finish starts from ₹3,000!'
  }
  if (msg.includes('waxing') || msg.includes('threading')) {
    return '🌿 For waxing & threading, Velvet Touch Salon (Colaba) and Blush Studio Mumbai (Andheri) offer professional services at very affordable prices!'
  }
  if (msg.includes('cheap') || msg.includes('budget') || msg.includes('affordable') || msg.includes('value')) {
    return '💰 For budget-friendly options: Blush Studio Mumbai (₹₹, Andheri) and Velvet Touch Salon (₹₹, Colaba) deliver great quality at affordable prices. Services from just ₹800!'
  }
  if (msg.includes('luxury') || msg.includes('premium') || msg.includes('best')) {
    return '👑 For luxury: The Glow Room (₹₹₹₹, Worli) with private rooms and Aurora Beauty Lounge (₹₹₹₹, Juhu) with valet parking are our most exclusive salons!'
  }
  if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('fee') || msg.includes('charge')) {
    return '💸 Prices: Nail Art ₹800 | Haircut ₹1,200 | Hair Spa ₹1,800 | Gold Facial ₹2,500 | Party Makeup ₹3,000 | Bridal Package ₹15,000. Something for every budget!'
  }
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('schedule') || msg.includes('reserve')) {
    return '📅 Booking is super easy! Browse salons → Click any salon → Select services → Pick a date & time → Enter your details. Done in under 2 minutes! 🎉'
  }
  if (msg.includes('hour') || msg.includes('timing') || msg.includes('open') || msg.includes('close')) {
    return '🕐 Most salons are open 9 AM – 9 PM daily. Check individual salon pages for exact hours. We recommend booking at least a day in advance for peak times!'
  }
  if (msg.includes('bandra')) {
    return '📍 In Bandra, Lavelle Beauty Mumbai (4.9★) on Linking Road is our most-booked salon, known for exceptional bridal makeup and hair styling!'
  }
  if (msg.includes('juhu')) {
    return '📍 In Juhu, Aurora Beauty Lounge (4.8★) on Juhu Tara Road offers luxury spa, facials & nails — with valet parking and refreshments!'
  }
  if (msg.includes('andheri')) {
    return '📍 In Andheri West, Blush Studio Mumbai (4.7★) on SV Road is our Best Value pick for hair, nails, and threading!'
  }
  if (msg.includes('colaba')) {
    return '📍 In Colaba, Velvet Touch Salon (4.6★) on Colaba Causeway offers classic hair, facial & waxing services with experienced stylists!'
  }
  if (msg.includes('worli')) {
    return '📍 In Worli, The Glow Room (4.9★, Top Rated) on Worli Sea Face is our most exclusive salon — private rooms, premium bridal packages & hair spa!'
  }
  if (msg.includes('powai')) {
    return '📍 In Powai, Radiance Beauty Bar (4.8★, Trending) in Hiranandani Gardens is perfect for nail art, lashes & makeup — the modern beauty haven!'
  }
  if (msg.includes('malad') || msg.includes('borivali') || msg.includes('thane') || msg.includes('navi mumbai')) {
    return "🚧 We're expanding soon! Currently we cover Bandra, Andheri, Juhu, Colaba, Worli & Powai. Stay tuned for new areas!"
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('namaste')) {
    return "👋 Hello! I'm your GlowCity beauty consultant. Tell me what service you need (bridal, hair, nails, facial, spa) or your area in Mumbai, and I'll find you the perfect salon!"
  }
  if (msg.includes('thank') || msg.includes('thanks')) {
    return "😊 You're welcome! Feel free to ask anything about salons, services, or booking. We're here to help you glow! ✨"
  }

  return "💅 Tell me what you're looking for! I can help with bridal makeup, hair services, nail art, facials, or spa treatments in Mumbai. Which area or service interests you?"
}

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  const message = String(req.body?.message ?? '').trim()

  if (!message) {
    res.status(400).json({ error: 'Message is required' })
    return
  }

  // Try Groq AI first
  if (groqClient) {
    try {
      const completion = await groqClient.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: 250,
        temperature: 0.7,
      })

      const reply =
        completion.choices[0]?.message?.content?.trim() || getKeywordResponse(message)

      res.json({ reply, source: 'groq' })
      return
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status
      const errMsg = err instanceof Error ? err.message : String(err)

      if (status === 429 || errMsg.includes('429') || errMsg.toLowerCase().includes('rate')) {
        console.log('⚠️  Groq rate limit reached — using keyword fallback')
      } else {
        console.error('Groq API error:', errMsg)
      }
      // Fall through to keyword fallback
    }
  }

  // Keyword-based fallback
  const reply = getKeywordResponse(message)
  res.json({ reply, source: 'fallback' })
})

export default router
