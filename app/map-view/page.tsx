import { MapView } from "@/components/map-view"
import { NavigationBar } from "@/components/navigation-bar"

export default function MapViewPage() {
  return (
    <main className="min-h-screen">
      <NavigationBar />
      <div className="h-[calc(100vh-80px)]">
        <MapView />
      </div>
    </main>
  )
}

