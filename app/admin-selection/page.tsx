import { NavigationBar } from "@/components/navigation-bar"
import { AdminOptions } from "@/components/admin-options"

export default function AdminSelection() {
  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url("/school.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative">
        <NavigationBar />
        <div className="container mx-auto px-4 py-12">
          <AdminOptions />
        </div>
      </div>
    </main>
  )
}

