"use Client"
import Navbar from '@/components/navbar'
import React from 'react'

function page() {
  return (
    <>
    <Navbar/>
    <section className='p-8'>
        <h1 className='text-4xl font-bold text-center text-primary'>About</h1>
    </section>
    </>
  )
}

export default page