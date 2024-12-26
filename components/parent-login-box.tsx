"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ParentLoginBox() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your authentication logic here
    router.push('/student-selection')
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-yellow-400 rounded-lg blur opacity-30 animate-pulse"></div>
      <Card className="relative w-full bg-gray-800/90 backdrop-blur-sm text-white border-2 border-yellow-400 shadow-xl animate-fade-in-up animation-delay-600">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">
            Parent Login
          </CardTitle>
          <CardDescription className="text-gray-300 text-center text-lg">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-300">
                Username:
              </label>
              <Input 
                id="username" 
                type="text" 
                required 
                placeholder="Enter your Username"
                className="w-full bg-gray-700/90 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <Input 
                id="password" 
                type="password" 
                required 
                placeholder="Enter your Password"
                className="w-full bg-gray-700/90 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
              />
            </div>
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-yellow-400 hover:underline">
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit"
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

