"use client"

import { useState } from "react"
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

export function SchoolLoginBox() {
  const router = useRouter()
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOTP] = useState(['', '', '', '', '', ''])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setShowOTP(true)
  }

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOTP = [...otp]
    newOTP[index] = value
    setOTP(newOTP)

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const handleVerifyOTP = () => {
    // Add OTP verification logic here
    console.log('Verifying OTP:', otp.join(''))
    router.push('/registration-forms')
  }

  const handleResendOTP = () => {
    // Add OTP resend logic here
    console.log('Resending OTP')
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-yellow-400 rounded-lg blur opacity-30 animate-pulse"></div>
      <Card className="relative w-full bg-gray-800/90 backdrop-blur-sm text-white border-2 border-yellow-400 shadow-xl animate-fade-in-up animation-delay-600">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">
            School Login
          </CardTitle>
          <CardDescription className="text-gray-300 text-center text-lg">
            {showOTP ? 'Enter the OTP sent to your device' : 'Enter your credentials to access your account'}
          </CardDescription>
        </CardHeader>
        {!showOTP ? (
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-300">
                  Username:
                </label>
                <Input 
                  id="username" 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  placeholder="Enter your name" 
                  className="w-full bg-gray-700/90 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password:
                </label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  placeholder="Enter your Password" 
                  className="w-full bg-gray-700/90 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 placeholder-transparent"
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
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <CardContent className="space-y-6">
              <div className="flex justify-between space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-2xl bg-gray-700/90 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                  />
                ))}
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-yellow-400 hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleVerifyOTP}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
              >
                Verify OTP
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
