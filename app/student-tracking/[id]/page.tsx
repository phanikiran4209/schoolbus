import { StudentTrackingMap } from "@/components/student-tracking-map"

interface StudentTrackingPageProps {
  params: {
    id: string
  }
}

export default function StudentTracking({ params }: StudentTrackingPageProps) {
  return (
    <main className="h-screen w-screen relative">
      <StudentTrackingMap studentId={params.id} />
    </main>
  )
}

