"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Bus, Phone, Map } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Mock driver data
const drivers = {
  driver1: {
    id: "driver1",
    name: "Driver 1",
    location: "MG Road, Vijayawada",
    speed: "45 km/h"
  },
  driver2: {
    id: "driver2",
    name: "Driver 2",
    location: "Elm Road, Vijayawada",
    speed: "60 km/h"
  },
  driver3: {
    id: "driver3",
    name: "Driver 3",
    location: "Bank Road, Vijayawada",
    speed: "55 km/h"
  }
}

export function DriverTracker() {
  const [selectedDriver, setSelectedDriver] = useState<string | undefined>()
  const router = useRouter()

  const handleDriverSelect = (value: string) => {
    setSelectedDriver(value)
  }

  const handleLiveMap = (driverId: string) => {
    router.push(`/live-map/${driverId}`)
  }

  return (
    <div className="space-y-8 px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-semibold text-center text-gray-800">Driver Tracker</h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="driver-select" className="text-lg font-medium text-gray-700">
            Select Driver:
          </label>
          <Select onValueChange={handleDriverSelect}>
            <SelectTrigger className="w-full bg-white border-2 border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 rounded-md shadow-sm">
              <SelectValue placeholder="Select a driver" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
              <SelectItem 
                value="driver1" 
                className="hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Driver 1
              </SelectItem>
              <SelectItem 
                value="driver2" 
                className="hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Driver 2
              </SelectItem>
              <SelectItem 
                value="driver3" 
                className="hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Driver 3
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedDriver && (
          <div className="bg-[#1f2937] text-white rounded-xl p-6 shadow-lg border border-[#1f2937] hover:bg-[#374151] transition-all duration-200 ease-in-out">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400 p-3 rounded-full">
                <Bus className="w-8 h-8 text-black" />
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-semibold">{drivers[selectedDriver as keyof typeof drivers].name}</h2>
                <div className="space-y-1">
                  <p className="text-gray-200">
                    <span className="font-medium">Location:</span> {drivers[selectedDriver as keyof typeof drivers].location}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-medium">Speed:</span> {drivers[selectedDriver as keyof typeof drivers].speed}
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    className="bg-yellow-400 text-black hover:bg-yellow-500 flex items-center gap-2 w-full sm:w-auto"
                    onClick={() => handleLiveMap(drivers[selectedDriver as keyof typeof drivers].id)}
                  >
                    <Map className="w-5 h-5" />
                    Live Map
                  </Button>
                  <Button
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 w-full sm:w-auto"
                    onClick={() => console.log("Initiating call...")}
                  >
                    <Phone className="w-5 h-5" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
