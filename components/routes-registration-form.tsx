"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FormData = {
  sch_uniq_id: string;
  sch_country_id: string;
  sch_name: string;
  sch_contact_name: string;
  sch_contact_num: string;
  route_id: string;
  route_name: string;
  route_points_count: string;
  status: boolean;
  reserve: string;
  csv_file: File | null; // To store the uploaded CSV file
};

export function RoutesRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    sch_uniq_id: "",
    sch_country_id: "",
    sch_name: "",
    sch_contact_name: "",
    sch_contact_num: "",
    route_id: "",
    route_name: "",
    route_points_count: "",
    status: false,
    reserve: "",
    csv_file: null, // To store the uploaded CSV file
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setFormData((prev) => ({ ...prev, status: checked === true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Example: Generate a downloadable CSV file with form data
    const csvContent = [
      ["Field", "Value"],
      ...Object.entries(formData),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "route_registration_form.csv";
    link.click();
  };

  return (
    <Card className="max-w-4xl mx-auto bg-[#1e2532] text-white border-none shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Route Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[ 
              { id: "sch_uniq_id", label: "School Unique ID", maxLength: 8 },
              { id: "sch_country_id", label: "School Country ID", maxLength: 3 },
              { id: "sch_name", label: "School Name", maxLength: 20 },
              { id: "sch_contact_name", label: "Contact Name", maxLength: 20 },
              { id: "sch_contact_num", label: "Contact Number", maxLength: 12, pattern: "\\d*" },
              { id: "route_id", label: "Route ID", maxLength: 8 },
              { id: "route_name", label: "Route Name", maxLength: 12 },
              { id: "route_points_count", label: "Route Points Count", type: "number", min: 1, max: 50 },
              { id: "reserve", label: "Reserve Info", maxLength: 8 },
            ].map(({ id, label, ...rest }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id} className="text-gray-300">
                  {label}:
                </Label>
                <Input
                  id={id}
                  name={id}
                  placeholder={`Enter ${label}`}
                  value={(formData as any)[id]} // Type assertion to access dynamic keys
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                  {...rest}
                />
              </div>
            ))}
          </div>

          {/* Profile Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="csv_file" className="text-gray-300">
              Upload Pre-filled Data:
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="csv_file"
                name="csv_file"
                type="file"
                accept=".csv"
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md"
              />
              <span className="text-gray-400 text-sm">Please upload pre-filled data *.csv is allowed</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="status"
              name="status"
              checked={formData.status}
              onCheckedChange={handleCheckboxChange}
              className="border-gray-500"
            />
            <Label htmlFor="status" className="text-gray-300">
              Status
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2"
          >
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
