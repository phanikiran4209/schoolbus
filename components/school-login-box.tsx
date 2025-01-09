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
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SchoolLoginBox() {
  const router = useRouter()
  const [showOTP, setShowOTP] = React.useState(false)
  const [otp, setOTP] = React.useState(['', '', '', '', '', ''])
  const [data, setData] = React.useState({ username: '', password: '' })
  const [showForgotPasswordAlert, setShowForgotPasswordAlert] = React.useState(false)
  const [token, setToken] = React.useState('')
  const [username, setUsername] = React.useState('')

  const signinHandler = async () => {
    const response = await fetch("http://68.178.203.99:7080/api/v1/auth/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Type': 'web',
      },
      body: JSON.stringify({ 
        userName: data.username, 
        password: data.password 
      }),
    })
    
    if (!response.ok) {
      throw new Error('School sign-in failed')
    }

    const result = await response.json()
    console.log(result)

    if (result.twoFactorAuthentication) {
      setShowOTP(true)
      setToken(result.token)
      setUsername(result.username)
    } else {
      router.push('/registration-forms')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signinHandler()
    } catch {
      alert('Username or password not found')
    }
  }

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOTP = [...otp]
    newOTP[index] = value
    setOTP(newOTP)

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch("http://68.178.203.99:7080/api/v1/otp/verify", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Type': 'web',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
          otp: otp.join(''),
        }),
      })
      if (!response.ok) {
        throw new Error('OTP verification failed')
      }
      router.push('/registration-forms')
    } catch {
      alert('Invalid OTP')
    }
  }

  const handleResendOTP = () => {
    console.log('Resending OTP')
  }

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setShowForgotPasswordAlert(true)
    setTimeout(() => setShowForgotPasswordAlert(false), 5000)
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
                  required 
                  placeholder="Enter your Username"
                  value={data.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, username: e.target.value })}
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
                  required 
                  placeholder="Enter your Password"
                  value={data.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, password: e.target.value })}
                  className="w-full bg-gray-700/90 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                />
              </div>
              <div className="text-right">
                <Link href="#" onClick={handleForgotPassword} className="text-sm text-yellow-400 hover:underline">
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
        {showForgotPasswordAlert && (
          <Alert className="mt-4 bg-blue-100 border-blue-500 text-blue-900">
            <AlertDescription>
              Please consult the school admin for password recovery assistance.
            </AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  )
}
