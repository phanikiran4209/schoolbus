"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

// Mock driver locations
const driverLocations = {
  driver1: { lat: 16.5062, lng: 80.6480 },
  driver2: { lat: 16.3067, lng: 80.4365 },
  driver3: { lat: 16.2359, lng: 80.6400 },
}

interface LiveMapProps {
  driverId: string
}

export function LiveMap({ driverId }: LiveMapProps) {
  const router = useRouter()
  const [mapUrl, setMapUrl] = useState<string | null>(null)

  useEffect(() => {
    const location = driverLocations[driverId as keyof typeof driverLocations]
    if (location) {
      // Replace 'YOUR_API_KEY' with your actual API key
      setMapUrl("https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d487295.02532044657!2d80.5421!3d16.3067!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1629789658907!5m2!1sen!2sin")
    } else {
      setMapUrl(null)
    }
  }, [driverId])

  return (
    <div className="relative h-screen w-screen">
      <Button
        className="absolute top-4 left-4 z-10 bg-white text-black hover:bg-gray-100"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      {mapUrl ? (
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center h-full w-full bg-gray-100">
          <p className="text-xl text-gray-600">Loading map...</p>
        </div>
      )}
    </div>
  )
}
