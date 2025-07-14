'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

export default function ECommerceHomePage() {
  const router = useRouter()
  const [shop, setShop] = useState<{ business_name?: string } | null>(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) return

    axios
      .get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setShop(res.data.shop || null)
      })
      .catch(() => {
        setShop(null)
      })
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary/10 to-background py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Welcome to {shop?.business_name || 'our store'}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Tools. Parts. Confidence. Everything you need in one place.
        </p>
        <Button
          size="lg"
          className="flex items-center gap-2 mx-auto"
          onClick={() => router.push('/e-commerce/products')}
        >
          <ShoppingBag className="w-5 h-5" />
          Browse Products
          <ArrowRight className="w-4 h-4" />
        </Button>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">🚚 Fast Delivery</h3>
          <p className="text-sm text-muted-foreground">
            Orders are delivered quickly and securely all across the country.
          </p>
        </div>
        <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">✅ Trusted Products</h3>
          <p className="text-sm text-muted-foreground">
            Only genuine and top-rated hardware & construction tools.
          </p>
        </div>
        <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">🔐 Secure Payments</h3>
          <p className="text-sm text-muted-foreground">
            Pay with Apple Pay, QPay, cards, or cash on delivery with confidence.
          </p>
        </div>
      </section>

      {/* Featured Products (Placeholder) */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-white dark:bg-card border rounded-xl shadow-sm hover:shadow-md p-4 transition"
            >
              <div className="bg-muted h-40 mb-4 rounded-md" />
              <h3 className="font-medium text-lg mb-1">Product Name</h3>
              <p className="text-sm text-muted-foreground mb-2">Short description goes here.</p>
              <Button variant="default" size="sm" onClick={() => router.push('/e-commerce/products')}>
                View Details
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
