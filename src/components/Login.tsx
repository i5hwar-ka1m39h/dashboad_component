import React, { useState } from 'react'
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
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const [formData, setFormData] = useState({email:"", password:""})

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, id } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const testMail = "test@mail.com"
    const password = 'pass@123'
    if(formData.email === testMail && formData.password === password){
      navigate('/dashboard')
    }
    
  }
  return (
    <div className=' h-screen w-screen flex items-center justify-center gap-4 bg-gray-600'>
    <Card className="w-[450px] h-[300px] bg-slate-100">
    <CardHeader>
      <CardTitle>Admin Login</CardTitle>
      <CardDescription>Enter your credential to go to dashboard.</CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter valid email" onChange={handleChange} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Password</Label>
            <Input id="password"  type="password" placeholder="Enter your password for the above mail"  onChange={handleChange}/>
          </div>
        </div>
        <div>
        <Button className='mt-2 hover:bg-gray-300' type='submit'>Log In</Button>
        </div>
      </form>
      
    </CardContent>
    <CardFooter className="flex justify-center">
      
      
    </CardFooter>
  </Card>

  <Card className="w-[450px] h-[300px] bg-slate-100">
    <CardHeader>
      <CardTitle>A note </CardTitle>
      <CardDescription>Read the following before proceeding.</CardDescription>
    </CardHeader>
    <CardContent>
      
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <p>This is just a test/ui component. All the value that are in table are just dummy data in the table format. Plus it has image upload with preview content with no api logic, add item button</p>
            <Label htmlFor="email">Email</Label>
            <p className=' font-bold'>test@mail.com</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Password</Label>
            <p className='font-bold'>pass@123</p>
          </div>
        </div>
        
      
      
    </CardContent>
    <CardFooter className="flex justify-center">
      
      
    </CardFooter>
  </Card>
  </div>
  )
}

export default Login;