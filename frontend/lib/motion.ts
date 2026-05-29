/** Animations without hiding content — opacity stays visible */
export const fadeUp = {
  initial: { y: 20 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
}

export const fadeIn = {
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.4 },
}

export const stagger = (delay = 0.1) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
})
