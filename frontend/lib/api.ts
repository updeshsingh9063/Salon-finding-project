const API_URL =
  (typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL) ?? 'https://salon-finding-project.onrender.com'

// ─── Salons ────────────────────────────────────────────────────────────────

export async function fetchSalons(params: Record<string, string> = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${API_URL}/api/salons${qs ? `?${qs}` : ''}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch salons')
  return res.json() as Promise<{ count: number; salons: unknown[] }>
}

export async function fetchSalon(id: string) {
  const res = await fetch(`${API_URL}/api/salons/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Salon ${id} not found`)
  return res.json()
}

export async function fetchServices() {
  const res = await fetch(`${API_URL}/api/salons/services`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch services')
  return res.json()
}

export async function fetchMeta() {
  const res = await fetch(`${API_URL}/api/salons/meta`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch meta')
  return res.json()
}

// ─── Bookings ──────────────────────────────────────────────────────────────

export interface BookingPayload {
  salonId: string
  serviceIds: string[]
  date: string
  time: string
  customer: {
    name: string
    phone: string
    email: string
    specialRequests?: string
  }
}

export async function createBooking(data: BookingPayload) {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create booking')
  return res.json()
}

export async function fetchBooking(bookingId: string) {
  const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Booking not found')
  return res.json()
}

// ─── AI Chat ───────────────────────────────────────────────────────────────

export async function sendChatMessage(message: string) {
  const res = await fetch(`${API_URL}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  if (!res.ok) throw new Error('Chat request failed')
  return res.json() as Promise<{ reply: string; source: 'groq' | 'fallback' }>
}
