"use client";

import { useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Mocked student data
const students = {
  STU001: {
    name: "Ravi Kumar",
    image: "/assets/boy.jpg",
    arrivalTime: "5:39pm",
  },
  STU002: {
    name: "Priya",
    image: "/assets/girl2.jpg",
    arrivalTime: "5:39pm",
  },
  STU003: {
    name: "Giri",
    image: "/assets/boy.jpg",
    arrivalTime: "5:39pm",
  },
  STU004: {
    name: "Sai Kumar",
    image: "/assets/girl.jpg",
    arrivalTime: "5:39pm",
  },
};

interface StudentTrackingMapProps {
  studentId: string;
}

export function StudentTrackingMap({ studentId }: StudentTrackingMapProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [showRerouteDropdown, setShowRerouteDropdown] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const student = students[studentId as keyof typeof students];

  const handleSendMessage = () => {
    console.log("Sending message:", message);
    setMessage("");
    setShowMessageInput(false);
  };

  const handleSendReroute = () => {
    console.log("Reroute to:", selectedRoute);
    setSelectedRoute("");
    setShowRerouteDropdown(false);
  };

  const handleMessageClick = () => {
    setShowMessageInput(!showMessageInput);
    setShowRerouteDropdown(false);
  };

  const handleRerouteClick = () => {
    setShowRerouteDropdown(!showRerouteDropdown);
    setShowMessageInput(false);
  };

  return (
    <div className="relative h-full w-full">
      {/* Map Container */}
      <div className="h-full w-full bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d72.5!3d23.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1629789658907!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsDetailsOpen(!isDetailsOpen);
          setShowMessageInput(false);
          setShowRerouteDropdown(false);
        }}
        className="absolute top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
      >
        {isDetailsOpen ? (
          <X className="h-6 w-6 text-gray-800" />
        ) : (
          <Menu className="h-6 w-6 text-gray-800" />
        )}
      </button>

      {/* Student Details Card */}
      {isDetailsOpen && (
        <Card className="absolute top-20 left-4 w-80 bg-white rounded-3xl shadow-xl p-6 z-40">
          <div className="space-y-6">
            {/* Student Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-yellow-400">
                <img
                  src={student?.image}
                  alt={student?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Dear {student?.name}...</h2>
                <p className="text-sm">
                  Arrival time: <span className="text-yellow-500">{student?.arrivalTime}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleMessageClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full"
              >
                📝 Message Driver
              </Button>
              <Button
                onClick={handleRerouteClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full"
              >
                🎯 Ask to Reroute
              </Button>
            </div>

            {/* Message Input */}
            {showMessageInput && (
              <div className="space-y-4 animate-fade-in">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message..."
                  className="w-full h-24 bg-gray-50 border border-gray-200 rounded-lg resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full"
                >
                  Send
                </Button>
              </div>
            )}

            {/* Reroute Dropdown */}
            {showRerouteDropdown && (
              <div className="space-y-4 animate-fade-in">
                <Select
                  onValueChange={(value) => setSelectedRoute(value)}
                  value={selectedRoute}
                >
                  <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-full">
                    <SelectValue placeholder="Select a route..." />
                  </SelectTrigger>
                  <SelectContent>
                    {["Route 1", "Route 2", "Route 3", "Route 4", "Route 5"].map((route) => (
                      <SelectItem key={route} value={route}>
                        {route}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleSendReroute}
                  disabled={!selectedRoute}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Confirm
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
