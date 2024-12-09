import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Login = () => {
  return (
    <div className=' h-screen w-screen flex items-center justify-center'>
    <Card className="w-[450px]">
    <CardHeader>
      <CardTitle>Admin Login</CardTitle>
      <CardDescription>Enter your credential to go to dashboard.</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your valid email"  />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Password</Label>
            <Input id="password"  type="password" placeholder="Enter your password for the above mail" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-center">
      
      <Button className='hover:bg-gray-300'>Log In</Button>
    </CardFooter>
  </Card>
  </div>
  )
}

export default Login;