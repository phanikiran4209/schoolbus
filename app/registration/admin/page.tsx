import { NavigationBar } from "@/components/navigation-bar"
import { AdminRegistrationForm } from "@/components/admin-registration-form"

export default function StudentRegistration() {
  return (
    <main className="min-h-screen bg-[#1e2532]">
      <NavigationBar />
      <div className="container mx-auto px-4 py-12">
        <AdminRegistrationForm />
      </div>
    </main>
  )
}

