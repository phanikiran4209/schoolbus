"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RoutepointRegistrationForm() {
  const [formData, setFormData] = useState({
    sch_uniq_id: "",
    sch_country_id: "",
    route_id: "",
    route_name: "",
    route_point_name: "",
    latitude: "",
    longitude: "",
    student_id: "",
    parent_id: "",
    parent_name: "",
    parent_contact: "",
    status: false,
    csv_file: null // Store the uploaded CSV file
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  return (
    <Card className="max-w-4xl mx-auto bg-[#1e2532] text-white border-none shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-yellow-400">Route Point Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School Unique ID and School Country ID */}
            <div className="space-y-2">
              <Label htmlFor="sch_uniq_id" className="text-gray-300">School Unique ID:</Label>
              <Input
                id="sch_uniq_id"
                name="sch_uniq_id"
                placeholder="Enter School Unique ID"
                value={formData.sch_uniq_id}
                onChange={handleChange}
                maxLength={8}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sch_country_id" className="text-gray-300">School Country ID:</Label>
              <Input
                id="sch_country_id"
                name="sch_country_id"
                placeholder="Enter School Country ID"
                value={formData.sch_country_id}
                onChange={handleChange}
                maxLength={3}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                required
              />
            </div>

            {/* Route ID and Route Name */}
            <div className="space-y-2">
              <Label htmlFor="route_id" className="text-gray-300">Route ID:</Label>
              <Input
                id="route_id"
                name="route_id"
                placeholder="Enter Route ID"
                value={formData.route_id}
                onChange={handleChange}
                maxLength={20}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="route_name" className="text-gray-300">Route Name:</Label>
              <Input
                id="route_name"
                name="route_name"
                placeholder="Enter Route Name"
                value={formData.route_name}
                onChange={handleChange}
                maxLength={20}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Route Point Name and Latitude */}
            <div className="space-y-2">
              <Label htmlFor="route_point_name" className="text-gray-300">Route Point Name:</Label>
              <Input
                id="route_point_name"
                name="route_point_name"
                placeholder="Enter Route Point Name"
                value={formData.route_point_name}
                onChange={handleChange}
                maxLength={20}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-gray-300">Latitude:</Label>
              <Input
                id="latitude"
                name="latitude"
                placeholder="Enter Latitude"
                value={formData.latitude}
                onChange={handleChange}
                maxLength={10}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Longitude and Student ID */}
            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-gray-300">Longitude:</Label>
              <Input
                id="longitude"
                name="longitude"
                placeholder="Enter Longitude"
                value={formData.longitude}
                onChange={handleChange}
                maxLength={10}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
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

            {/* Parent ID and Parent Name */}
            <div className="space-y-2">
              <Label htmlFor="parent_id" className="text-gray-300">Parent ID:</Label>
              <Input
                id="parent_id"
                name="parent_id"
                placeholder="Enter Parent ID"
                value={formData.parent_id}
                onChange={handleChange}
                maxLength={8}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
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
          </div>

          {/* Parent Contact */}
          <div className="space-y-2">
            <Label htmlFor="parent_contact" className="text-gray-300">Parent Contact:</Label>
            <Input
              id="parent_contact"
              name="parent_contact"
              type="tel"
              placeholder="Enter Parent Contact"
              value={formData.parent_contact}
              onChange={handleChange}
              maxLength={12}
              pattern="\d*"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          {/* CSV Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="csv_file" className="text-gray-300">Upload Pre-filled Data:</Label>
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

          {/* Status Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="status"
              name="status"
              checked={formData.status}
              onCheckedChange={(checked) => setFormData({ ...formData, status: checked as boolean })}
              className="border-gray-500"
            />
            <Label htmlFor="status" className="text-gray-300">Status</Label>
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
