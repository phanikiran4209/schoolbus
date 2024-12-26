"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SchoolRegistrationForm() {
  const [formData, setFormData] = useState({
    sch_country_id: "",
    sch_prov_id: "",
    sch_area_id: "",
    sch_entity_id: "",
    sch_id: "",
    sch_name: "",
    sch_contact_num: "",
    sch_contact_name: "",
    sch_status: false,
    profile_photo: null,
    csv_file: null, // To store the uploaded CSV file
  });

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);

    // Prepare form data for CSV export
    const formEntries = Object.entries(formData);
    const csvContent = [
      ["Field", "Value"],
      ...formEntries.map(([key, value]) => [key, value ? value : "N/A"]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Create a CSV Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "school_registration_form.csv";
    link.click();
  };

  return (
    <Card className="max-w-4xl mx-auto bg-[#1e2532] text-white border-none shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-yellow-400">
          School Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sch_country_id" className="text-gray-300">
                School Country ID:
              </Label>
              <Input
                id="sch_country_id"
                name="sch_country_id"
                placeholder="Enter School Country ID"
                value={formData.sch_country_id}
                onChange={handleChange}
                maxLength={3}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sch_prov_id" className="text-gray-300">
                School Province ID:
              </Label>
              <Input
                id="sch_prov_id"
                name="sch_prov_id"
                placeholder="Enter School Province ID"
                value={formData.sch_prov_id}
                onChange={handleChange}
                maxLength={3}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sch_area_id" className="text-gray-300">
                School Area ID:
              </Label>
              <Input
                id="sch_area_id"
                name="sch_area_id"
                placeholder="Enter School Area ID"
                value={formData.sch_area_id}
                onChange={handleChange}
                maxLength={3}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sch_entity_id" className="text-gray-300">
                School Entity ID:
              </Label>
              <Input
                id="sch_entity_id"
                name="sch_entity_id"
                placeholder="Enter School Entity ID"
                value={formData.sch_entity_id}
                onChange={handleChange}
                maxLength={3}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sch_id" className="text-gray-300">
                School ID:
              </Label>
              <Input
                id="sch_id"
                name="sch_id"
                placeholder="Enter School ID"
                value={formData.sch_id}
                onChange={handleChange}
                maxLength={8}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sch_name" className="text-gray-300">
                School Name:
              </Label>
              <Input
                id="sch_name"
                name="sch_name"
                placeholder="Enter School Name"
                value={formData.sch_name}
                onChange={handleChange}
                maxLength={20}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sch_contact_num" className="text-gray-300">
                School Contact Number:
              </Label>
              <Input
                id="sch_contact_num"
                name="sch_contact_num"
                placeholder="Enter Contact Number"
                value={formData.sch_contact_num}
                onChange={handleChange}
                maxLength={12}
                pattern="\d*"
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sch_contact_name" className="text-gray-300">
                School Contact Name:
              </Label>
              <Input
                id="sch_contact_name"
                name="sch_contact_name"
                placeholder="Enter Contact Name"
                value={formData.sch_contact_name}
                onChange={handleChange}
                maxLength={20}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Profile Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="profile_photo" className="text-gray-300">
              Profile Photo (JPG/PNG):
            </Label>
            <Input
              id="profile_photo"
              name="profile_photo"
              type="file"
              accept=".jpg,.png"
              onChange={handleChange}
              className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md"
            />
          </div>

          {/* CSV Upload Button with Text */}
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
              id="sch_status"
              name="sch_status"
              checked={formData.sch_status}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, sch_status: checked })
              }
              className="border-gray-500"
            />
            <Label htmlFor="sch_status" className="text-gray-300">
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
