// app/pricing/page.tsx
'use client'

import React from 'react'

export default function PricingPage() {
  const handleSubscribe = (plan: string) => {
    console.log(`User subscribed to: ${plan}`)
    // Implement payment logic here
  }

  return (
    <section className="min-h-screen bg-muted p-6 md:p-12">
      <h3 className="text-3xl font-bold text-center text-primary mb-8">Pricing Plans</h3>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* 1 Month Plan */}
        <div className="bg-card border border-border rounded-lg p-6 shadow flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-semibold mb-2">1 Month</h4>
            <p className="text-sm mb-4">Basic access for short-term users</p>
            <ul className="text-sm space-y-2 mb-4">
              <li>✅ Core ERP Features</li>
              <li>✅ Basic Support</li>
              <li>❌ No Custom Reports</li>
            </ul>
            <p className="text-xl font-bold">$10</p>
          </div>
          <button
            onClick={() => handleSubscribe('1 Month')}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            Subscribe
          </button>
        </div>

        {/* 6 Months Plan */}
        <div className="bg-card border border-border rounded-lg p-6 shadow flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-semibold mb-2">6 Months</h4>
            <p className="text-sm mb-4">Best for growing teams</p>
            <ul className="text-sm space-y-2 mb-4">
              <li>✅ Core ERP Features</li>
              <li>✅ Priority Support</li>
              <li>✅ Custom Reports</li>
            </ul>
            <p className="text-xl font-bold">$50</p>
          </div>
          <button
            onClick={() => handleSubscribe('6 Months')}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            Subscribe
          </button>
        </div>

        {/* 1 Year Plan */}
        <div className="bg-card border border-border rounded-lg p-6 shadow flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-semibold mb-2">1 Year</h4>
            <p className="text-sm mb-4">Ultimate access and savings</p>
            <ul className="text-sm space-y-2 mb-4">
              <li>✅ All ERP Features</li>
              <li>✅ 24/7 Support</li>
              <li>✅ Custom Reports & Analytics</li>
            </ul>
            <p className="text-xl font-bold">$90</p>
          </div>
          <button
            onClick={() => handleSubscribe('1 Year')}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}
