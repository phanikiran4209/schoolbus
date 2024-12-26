import { NavigationBar } from "@/components/navigation-bar"
import { RegistrationGrid } from "@/components/registration-grid"

export default function RegistrationForms() {
  return (
    <main className="min-h-screen bg-white">
      <NavigationBar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          REGISTRATION FORMS
        </h1>
        <RegistrationGrid />
      </div>
    </main>
  )
}

