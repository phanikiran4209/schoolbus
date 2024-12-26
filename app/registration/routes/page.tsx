import { NavigationBar } from "@/components/navigation-bar"
import { RoutesRegistrationForm } from "@/components/routes-registration-form"

export default function RoutesRegistration() {
  return (
    <main className="min-h-screen bg-[#1e2532]">
      <NavigationBar />
      <div className="container mx-auto px-4 py-12">
        <RoutesRegistrationForm />
      </div>
    </main>
  )
}

