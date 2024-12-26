"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LoginBox() {
  const router = useRouter()
  const [loginType, setLoginType] = React.useState("")

  const handleGetStarted = () => {
    if (loginType === "parent") {
      router.push('/parent-login')
    } else if (loginType === "admin") {
      router.push('/admin-login')
    } else if (loginType === "school") {
      router.push('/school-login')
    }
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-yellow-400 rounded-lg blur opacity-30 animate-pulse"></div>
      <Card className="relative w-full bg-gray-800/90 backdrop-blur-sm text-white border-2 border-yellow-400 shadow-xl animate-fade-in-up animation-delay-600">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">
            <span className="text-yellow-400">School</span> Bus Management
          </CardTitle>
          <CardDescription className="text-gray-300 text-center text-lg">
            Select your login type to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="login-type" className="text-sm font-medium text-gray-300">
              Login Type
            </label>
            <Select onValueChange={(value) => setLoginType(value)}>
              <SelectTrigger id="login-type" className="w-full bg-gray-700/90 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300">
                <SelectValue placeholder="Select Login Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="parent">Parent Login</SelectItem>
                <SelectItem value="admin">Admin Login</SelectItem>
                <SelectItem value="school">School Login</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

