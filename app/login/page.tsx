"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// 手机号格式验证函数
const validatePhoneNumber = (phone: string): boolean => {
  // 中国大陆手机号正则表达式
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // 验证手机号格式
    if (!validatePhoneNumber(phoneNumber)) {
      setError("请输入正确的手机号格式")
      setLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        phone_number: phoneNumber,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("手机号或密码错误")
      } else {
        // 登录成功，获取会话信息
        const session = await getSession()
        console.log("登录成功，用户信息:", session)
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      setError("登录失败，请重试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">登录</CardTitle>
          <CardDescription className="text-center">
            请输入您的手机号和密码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">手机号</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="请输入手机号"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={11}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "登录中..." : "登录"}
            </Button>
          </form>
          
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600 text-center">测试账号：</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>测试账号: 18779164383 / checker123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}