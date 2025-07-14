'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Audiowide } from 'next/font/google'
import { Roboto } from 'next/font/google'

// Font config
const silkscreen = Audiowide({
  subsets: ['latin'],
  weight: '400',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
})

// Phrases to rotate
const phrases = [
  'Digital Software Solutions',
  'ERP Systems for Every Industry',
  'E-Commerce Websites with Admin Dashboards',
  'Retail POS & Management Solutions',
  'Healthcare and Medical Software Coming Soon',
]

// HeroTitle Component with rotation
function HeroTitle() {
  const [currentText, setCurrentText] = useState(phrases[0])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
      setCurrentText('')
    }, 4000) // rotate every 4 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let i = 0
    const typeInterval = setInterval(() => {
      i++
      setCurrentText(phrases[index].slice(0, i))
      if (i >= phrases[index].length) clearInterval(typeInterval)
    }, 50)

    return () => clearInterval(typeInterval)
  }, [index])

  return (
    <h2 className={`text-3xl md:text-5xl font-extrabold mb-6 text-primary tracking-wide drop-shadow-lg text-center ${silkscreen.className}`}>
      <span className="bg-gradient-to-r from-[#BA68C8] to-[#7E57C2] text-transparent bg-clip-text animate-pulse">
        {currentText}
      </span>
    </h2>
  )
}

// MainContent Component
export default function MainContent() {
  const router = useRouter()

  return (
    <main className="flex-1 p-6 text-center">
      <HeroTitle />
      <p className={`text-lg mb-6 ${roboto.className}`}>
  Nexa transforms businesses with smart, scalable software - from retail POS to enterprise-level ERP and beyond.
</p>

      <button
      onClick={() => router.push('/auth')}
      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition"
    >
      Get Started
    </button>
    
    </main>
  )
}
