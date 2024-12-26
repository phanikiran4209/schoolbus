"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const registrationForms = [
  {
    id: "students",
    title: "Students",
    icon: "/assets/student.png",
    href: "/registration/student",
  },
  {
    id: "school",
    title: "School",
    icon: "/assets/school2.png",
    href: "/registration/school",
  },
  {
    id: "driver",
    title: "Driver",
    icon: "/assets/driver.png",
    href: "/registration/driver",
  },
  {
    id: "attender",
    title: "Attender",
    icon: "/assets/attender.png",
    href: "/registration/attender",
  },
  {
    id: "admins",
    title: "Admins",
    icon: "/assets/admin.png",
    href: "/registration/admin",
  },
  {
    id: "routes",
    title: "Routes",
    icon: "/assets/routes.png",
    href: "/registration/routes",
  },
  {
    id: "route-point",
    title: "Route-Point",
    icon: "/assets/route-point.png",
    href: "/registration/route-point",
  },
  {
    id: "parent",
    title: "Parent",
    icon: "/assets/parents.png",
    href: "/registration/parent",
  },
];

export function RegistrationGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {registrationForms.map((form) => (
        <Card
          key={form.id}
          className="bg-gradient-to-br from-[#1e2532] to-[#2a3444] text-white p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl group"
          onClick={() => router.push(form.href)}
        >
          <div className="relative w-24 h-24 mb-4 transform group-hover:scale-110 transition-transform duration-300">
            <Image
              src={form.icon}
              alt={form.title}
              fill
              className="object-contain rounded-full border-4 border-[#2a3444] shadow-lg"
            />
          </div>
          <h2 className="text-xl font-semibold text-center group-hover:text-yellow-400 transition-colors duration-300">
            {form.title}
          </h2>
        </Card>
      ))}
    </div>
  );
}
