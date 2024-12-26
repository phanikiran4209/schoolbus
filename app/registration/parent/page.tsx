import { NavigationBar } from "@/components/navigation-bar"
import { ParentRegistrationForm } from "@/components/parent-registration-form"

export default function ParentRegistration() {
  return (
    <main className="min-h-screen bg-[#1e2532]">
      <NavigationBar />
      <div className="container mx-auto px-4 py-12">
        <ParentRegistrationForm />
      </div>
    </main>
  )
}

