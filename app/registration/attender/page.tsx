import { NavigationBar } from "@/components/navigation-bar"
import { AttenderRegistrationForm } from "@/components/attender-registration-form"

export default function AttenderRegistration() {
  return (
    <main className="min-h-screen bg-[#1e2532]">
      <NavigationBar />
      <div className="container mx-auto px-4 py-12">
        <AttenderRegistrationForm />
      </div>
    </main>
  )
}

