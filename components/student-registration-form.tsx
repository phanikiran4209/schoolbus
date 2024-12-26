"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as XLSX from "xlsx";

export function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    sch_uniq_id: "",
    parent_id: "",
    parent_name: "",
    parent_contact: "",
    student_id: "",
    student_age: "",
    student_sex: "",
    student_status: false,
    route_id: "",
    reserve: "",
    profile_photo: null,
    csv_file: null, // for CSV upload
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure file is a JPG or PNG
    if (formData.profile_photo && !["image/jpeg", "image/png"].includes(formData.profile_photo.type)) {
      alert("Only JPG and PNG files are allowed for the profile photo upload!");
      return;
    }

    // Ensure CSV file is uploaded
    if (formData.csv_file && formData.csv_file.type !== "text/csv") {
      alert("Only CSV files are allowed for the data upload!");
      return;
    }

    console.log("Form submitted:", formData);

    // Prepare data for Excel
    const excelData = {
      ...formData,
      profile_photo: formData.profile_photo ? formData.profile_photo.name : "",
    };

    // Generate Excel file
    const worksheet = XLSX.utils.json_to_sheet([excelData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registration Form");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "student_registration_form.xlsx";
    link.click();
  };

  return (
    <Card className="max-w-4xl mx-auto bg-[#1e2532] text-white border-none shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-yellow-400">Student Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School Unique ID and Parent ID */}
            <div className="space-y-2">
              <Label htmlFor="sch_uniq_id" className="text-gray-300">School Unique ID:</Label>
              <Input
                id="sch_uniq_id"
                name="sch_uniq_id"
                placeholder="Enter School Unique ID"
                value={formData.sch_uniq_id}
                onChange={handleChange}
                maxLength={8}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parent_id" className="text-gray-300">Parent ID:</Label>
              <Input
                id="parent_id"
                name="parent_id"
                placeholder="Enter Parent ID"
                value={formData.parent_id}
                onChange={handleChange}
                maxLength={20}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Parent Name and Contact */}
            <div className="space-y-2">
              <Label htmlFor="parent_name" className="text-gray-300">Parent Name:</Label>
              <Input
                id="parent_name"
                name="parent_name"
                placeholder="Enter Parent Name"
                value={formData.parent_name}
                onChange={handleChange}
                maxLength={20}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parent_contact" className="text-gray-300">Parent Contact:</Label>
              <Input
                id="parent_contact"
                name="parent_contact"
                placeholder="Enter Parent Contact"
                value={formData.parent_contact}
                onChange={handleChange}
                maxLength={12}
                pattern="[0-9]*" // Allows only numbers
                inputMode="numeric" // Makes numeric keyboard pop up on mobile
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Student ID and Age */}
            <div className="space-y-2">
              <Label htmlFor="student_id" className="text-gray-300">Student ID:</Label>
              <Input
                id="student_id"
                name="student_id"
                placeholder="Enter Student ID"
                value={formData.student_id}
                onChange={handleChange}
                maxLength={8}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student_age" className="text-gray-300">Student Age:</Label>
              <Input
                id="student_age"
                name="student_age"
                placeholder="Enter Student Age"
                type="number"
                value={formData.student_age}
                onChange={handleChange}
                min={0}
                max={100}
                inputMode="numeric" // Ensures only numeric input
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Student Sex Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="student_sex" className="text-gray-300">Student Sex:</Label>
              <select
                id="student_sex"
                name="student_sex"
                value={formData.student_sex}
                onChange={(e) => setFormData({ ...formData, student_sex: e.target.value })}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 rounded-md p-2"
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            {/* Route ID */}
            <div className="space-y-2">
              <Label htmlFor="route_id" className="text-gray-300">Route ID:</Label>
              <Input
                id="route_id"
                name="route_id"
                placeholder="Enter Route ID"
                value={formData.route_id}
                onChange={handleChange}
                maxLength={8}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Reserve */}
          <div className="space-y-2">
            <Label htmlFor="reserve" className="text-gray-300">Reserve:</Label>
            <Input
              id="reserve"
              name="reserve"
              placeholder="Enter Reserve Info"
              value={formData.reserve}
              onChange={handleChange}
              maxLength={8}
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Student Status Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="student_status"
              name="student_status"
              checked={formData.student_status}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, student_status: checked as boolean })
              }
              className="border-gray-500"
            />
            <Label htmlFor="student_status" className="text-gray-300">Student Status</Label>
          </div>

          {/* Profile Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="profile_photo" className="text-gray-300">Profile Photo (JPG/PNG):</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="profile_photo"
                name="profile_photo"
                type="file"
                accept=".jpg,.png"
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md"
              />
            </div>
          </div>

          {/* CSV File Upload */}
          <div className="space-y-2">
            <Label htmlFor="csv_file" className="text-gray-300">Upload File:</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="csv_file"
                name="csv_file"
                type="file"
                accept=".csv"
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md"
              />
              <span className="text-sm text-gray-400">Please upload pre-filled data *.csv is allowed.</span>
            </div>
          </div>

          {/* Submit Button */}
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
