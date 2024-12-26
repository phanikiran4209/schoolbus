import { SchoolLoginBox } from "@/components/school-login-box"
import { NavigationBar } from "@/components/navigation-bar"

export default function SchoolLogin() {
  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url("/assets/school.jpg")',
      }}
    >
    
      <div className="relative">
        <NavigationBar />
        <div className="container mx-auto px-4 py-12 flex justify-end items-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-md">
            <SchoolLoginBox />
          </div>
        </div>
      </div>
    </main>
  )
}

