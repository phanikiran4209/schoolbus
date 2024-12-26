import { NavigationBar } from "@/components/navigation-bar";
import { StudentGrid } from "@/components/student-grid";

export default function StudentSelection() {
  return (
    <main className="min-h-screen bg-gray-100 relative">
      <div className="relative">
        <NavigationBar />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Select The Student ID
          </h1>
          <StudentGrid />
        </div>
      </div>
    </main>
  );
}
