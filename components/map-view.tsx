"use client"

import { useState } from 'react'
import { Bus, X } from 'lucide-react'
import { Card } from "@/components/ui/card"

// Mock bus data with actual coordinates
const busLocations = [
  { id: 1, lat: 16.5062, lng: 80.6480, driver: "John Doe", location: "Vijayawada", route: "Route A" },
  { id: 2, lat: 16.2359, lng: 80.6400, driver: "Jane Smith", location: "Tenali", route: "Route B" },
  { id: 3, lat: 16.3067, lng: 80.4365, driver: "Mike Johnson", location: "Guntur", route: "Route C" },
]

export function MapView() {
  const [selectedBus, setSelectedBus] = useState<typeof busLocations[0] | null>(null)

  return (
    <div className="relative h-full w-full">
      {/* Map Container */}
      <div className="h-full w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d487295.02532044657!2d80.5421!3d16.3067!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1629789658907!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>

        {/* Bus Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {busLocations.map((bus) => (
            <button
              key={bus.id}
              onClick={() => setSelectedBus(bus)}
              className="absolute p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors duration-300 pointer-events-auto"
              style={{
                left: `${(bus.lng - 80.4365) * 1000}px`,
                top: `${(16.5062 - bus.lat) * 1000}px`,
              }}
            >
              <Bus className="w-6 h-6 text-black" />
            </button>
          ))}
        </div>
      </div>

      {/* Bus Details Panel */}
      {selectedBus && (
        <div className="absolute top-4 right-4 w-80">
          <Card className="bg-white p-4 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">Bus Details</h3>
              <button 
                onClick={() => setSelectedBus(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <p><strong>Driver:</strong> {selectedBus.driver}</p>
              <p><strong>Location:</strong> {selectedBus.location}</p>
              <p><strong>Route:</strong> {selectedBus.route}</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

