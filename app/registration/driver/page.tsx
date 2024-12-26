import { NavigationBar } from "@/components/navigation-bar"
import { DriverRegistrationForm } from "@/components/driver-registration-form"

export default function DriverRegistration() {
  return (
    <main className="min-h-screen bg-[#1e2532]">
      <NavigationBar />
      <div className="container mx-auto px-4 py-12">
        <DriverRegistrationForm />
      </div>
    </main>
  )
}

