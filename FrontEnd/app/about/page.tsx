'use client'

import React from 'react'
import Image from 'next/image'
import {Audiowide} from 'next/font/google'

const audiowide = Audiowide ({
  subsets: ['latin'],
  weight: ['400']
})

const features = [
  {
    title: 'Dashboard',
    description: 'Get a real-time overview of your business metrics, activities, and performance in one place.',
    image: '/Dashboard-cuate.svg',
  },
  {
    title: 'Sales Management',
    description: 'Track leads, manage customers, and monitor sales activities seamlessly.',
    image: 'Design stats-bro.svg',
  },
  {
    title: 'Invoices & Receipts',
    description: 'Easily generate and manage invoices and receipts with automated tax and discount options.',
    image: '/Receipt-cuate.svg',
  },
  {
    title: 'Reporting & Analytics',
    description: 'Visualize your data and make smart decisions with powerful reporting tools.',
    image: '/Report-cuate.svg',
  },
]

export default function AboutPage() {
  return (
    <div className="p-8 space-y-12">
      <h1 className={`text-3xl font-bold text-center text-primary ${audiowide.className}`}>About Nexa ERP</h1>
      <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto">
        Nexa ERP is your all-in-one solution for business management, built for small to mid-size enterprises.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4">
            <Image
              src={feature.image}
              alt={feature.title}
              width={300}
              height={200}
              className="rounded-lg object-contain"
            />
            <h2 className="text-2xl font-semibold text-primary">{feature.title}</h2>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
