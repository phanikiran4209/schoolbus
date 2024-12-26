import { LiveMap } from "@/components/live-map"

interface LiveMapPageProps {
  params: {
    driverId: string
  }
}

export default function LiveMapPage({ params }: LiveMapPageProps) {
  return (
    <main className="h-screen w-screen">
      <LiveMap driverId={params.driverId} />
    </main>
  )
}

