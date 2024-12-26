import { NavigationBar } from "@/components/navigation-bar"
import { DriverTracker } from "@/components/driver-tracker"

export default function DriverTrackerPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto">
          <DriverTracker />
        </div>
      </div>
    </main>
  )
}

