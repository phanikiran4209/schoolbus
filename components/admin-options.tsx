"use client"

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function AdminOptions() {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div 
        onClick={() => router.push('/map-view')}
        className="bg-gray-900 rounded-xl p-6 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300 group"
      >
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <Image
              src="/assets/routes.png"
              alt="Route icon"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-white">BY ROUTE</h2>
        </div>
        <ArrowRight className="w-8 h-8 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
      </div>

      <div 
        onClick={() => router.push('/driver-tracker')}
        className="bg-gray-900 rounded-xl p-6 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300 group"
      >
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <Image
              src="/assets/driver.png"
              alt="Bus icon"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-white">BY DRIVER</h2>
        </div>
        <ArrowRight className="w-8 h-8 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </div>
  )
}

