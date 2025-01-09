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

  const [data, setData] = React.useState({ userName: '', password: '' });

  const signinHandler = async () => {
    const response = await fetch(`http://68.178.203.99:7080/api/v1/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Type': 'web',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Parent sign-in failed');
    }
    
    const result = await response.json();
    console.log(result);
    return result;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signinHandler();
      router.push('/student-selection');
    } catch {
      alert('Email or password not found');
    }
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
              <label htmlFor="userName" className="text-sm font-medium text-gray-300">
                userName
              </label>
              <Input 
                id="userName" 
                type="text" 
                required 
                placeholder="Enter your userName"
                value={data.userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, userName: e.target.value })}
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
                value={data.password}
                required 
                placeholder="Enter your Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, password: e.target.value })}
                className="w-full bg-gray-700/90 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
              />
            </div>
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-yellow-400 hover:underline">
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

