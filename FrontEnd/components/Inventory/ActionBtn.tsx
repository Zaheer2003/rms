"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { ArrowLeft, RemoveFormatting, Save } from 'lucide-react';

export default function ActionBtn() {

    const router = useRouter();

  return (
    <div className='bg-white shadow rounded-lg p-4 flex justify-between items-center '>
        <Button
         variant="secondary" 
         className='bg-yellow-400 hover:bg-yellow-500 text-white'
         onClick={() => 
            router.back()
         }
         >
            <ArrowLeft className='w-4 h-4'/>
            Back
        </Button>
        <div className='flex gap-3'>
        <Button variant={'outline'}>
            <RemoveFormatting/>
            Clear
        </Button>
        <Button>
         
            Save
               <Save/>
        </Button>
        </div>
    </div>
  )
}
