"use client"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// This would typically come from your API
const students = [
  {
    id: "STU001",
    name: "Ravi Kumar",
    image: "/assets/boy.jpg"
  },
  {
    id: "STU002",
    name: "priya",
    image: "/assets/girl2.jpg"
  },
  {
    id: "STU003",
    name: "Giri",
    image: "/assets/boy.jpg"
  },
  {
    id: "STU004",
    name: "Sai Kumar",
    image: "/assets/girl.jpg"
  }
]

export function StudentGrid() {
  const router = useRouter()

  const handleSelect = (studentId: string) => {
    router.push(`/student-tracking/${studentId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {students.map((student) => (
        <Card 
          key={student.id}
          className="bg-gray-800/90 backdrop-blur-sm border-2 border-yellow-400 text-white p-6 hover:transform hover:scale-105 transition-all duration-300"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400">
              <Image
                src={student.image}
                alt={student.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{student.name}</h3>
              <p className="text-gray-400 text-sm">{student.id}</p>
            </div>
            <Button
              onClick={() => handleSelect(student.id)}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
            >
              Select
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

