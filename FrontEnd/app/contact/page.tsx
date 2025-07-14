'use client'

import React, { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 👉 Here you can handle sending formData to your backend
    console.log('Submitted:', formData)
    alert('Message sent successfully!')
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-12 flex justify-center items-center">
      <div className="w-full max-w-xl bg-card p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border bg-background border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border bg-background border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 rounded-lg border bg-background border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
