"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FormData = {
  schoolId: string;
  adminId: string;
  adminName: string;
  userName: string;
  countryCode: string;
  contactNumber: string;
  lastRole: string;
  reserve: string;
  profilePhoto: File | null;
  preFilledCSV: File | null;
  status: boolean;
};

export function AdminRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    schoolId: "",
    adminId: "",
    adminName: "",
    userName: "",
    countryCode: "",
    contactNumber: "",
    lastRole: "",
    reserve: "",
    profilePhoto: null,
    preFilledCSV: null,
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileKey: keyof FormData
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [fileKey]: file }));
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setFormData((prev) => ({ ...prev, status: checked === true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const csvData = [
      ["Field", "Value"],
      ["School ID", formData.schoolId],
      ["Admin ID", formData.adminId],
      ["Admin Name", formData.adminName],
      ["Username", formData.userName],
      ["Country Code", formData.countryCode],
      ["Contact Number", formData.contactNumber],
      ["Last Role", formData.lastRole],
      ["Reserve Info", formData.reserve],
      ["Status", formData.status ? "Active" : "Inactive"],
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "admin_registration.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="max-w-4xl mx-auto bg-[#1e2532] text-white border-none shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Admin Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "schoolId", label: "School ID", maxLength: 8 },
              { id: "adminId", label: "Admin ID", maxLength: 8 },
              { id: "adminName", label: "Admin Name", maxLength: 20 },
              { id: "userName", label: "Username", maxLength: 10 },
              { id: "countryCode", label: "Country Code", maxLength: 3 },
              { id: "contactNumber", label: "Contact Number", maxLength: 12, pattern: "\\d*" },
              { id: "lastRole", label: "Last Role (0-5 years)", pattern: "\\d*" },
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
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                  {...rest}
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="profilePhoto" className="text-gray-300">
                Profile Photo:
              </Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profilePhoto")}
                className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preFilledCSV" className="text-gray-300">
                Pre-filled Data:
              </Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="preFilledCSV"
                  name="preFilledCSV"
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileChange(e, "preFilledCSV")}
                  className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md"
                />
                <span className="text-sm text-gray-400">
                  Please upload pre-filled data. Only *.csv is allowed.
                </span>
              </div>
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
