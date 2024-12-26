import { NavigationBar } from "@/components/navigation-bar"
import { SchoolRegistrationForm } from "@/components/school-registration-form"

export default function SchoolRegistration() {
  return (
    <main className="min-h-screen bg-[#1e2532]">
      <NavigationBar />
      <div className="container mx-auto px-4 py-12">
        <SchoolRegistrationForm />
      </div>
    </main>
  )
}

