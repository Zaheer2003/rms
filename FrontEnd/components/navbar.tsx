'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import {
  ContactIcon,
  InfoIcon,
  LogIn,
  ShoppingBag,
  StoreIcon,
  HomeIcon,
  LogOut,
  User2Icon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

export default function Navbar() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [shop, setShop] = useState<{ business_name?: string } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) return

    axios
      .get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsername(res.data.name || '')
        setShop(res.data.shop || null)
        setIsAuthenticated(true)
      })
      .catch(() => {
        setUsername('')
        setShop(null)
        setIsAuthenticated(false)
      })
  }, [])

  const handleLogout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    router.push('/e-commerce/auth')
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm border-b border-border bg-card">
      {/* Shop Name */}
      <button
        onClick={() => router.push('/e-commerce')}
        className="text-xl font-bold text-primary flex items-center gap-2"
      >
        <StoreIcon className="w-5 h-5" />
        {shop?.business_name || 'Loading...'}
      </button>

      {/* Navigation Links */}
      <div className="flex gap-3 items-center">
        <Button onClick={() => router.push('/e-commerce')} variant="ghost" className="flex items-center gap-2">
          <HomeIcon className="w-4 h-4" />
          Home
        </Button>

        <Button onClick={() => router.push('/e-commerce/products')} variant="ghost" className="flex items-center gap-2">
          <StoreIcon className="w-4 h-4" />
          Products
        </Button>

        <Button onClick={() => router.push('/e-commerce/about')} variant="ghost" className="flex items-center gap-2">
          <InfoIcon className="w-4 h-4" />
          About
        </Button>

        <Button onClick={() => router.push('/e-commerce/contact')} variant="ghost" className="flex items-center gap-2">
          <ContactIcon className="w-4 h-4" />
          Contact
        </Button>

        <Button onClick={() => router.push('/e-commerce/cart')} variant="outline" className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Cart
        </Button>

        {!isAuthenticated ? (
          <Button
            onClick={() => router.push('/e-commerce/auth')}
            variant="default"
            className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Button>
        ) : (
          <>
            <Button
              onClick={() => router.push('/e-commerce/profile')}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <User2Icon className="w-4 h-4" />
              {username || 'Profile'}
            </Button>
            <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}
