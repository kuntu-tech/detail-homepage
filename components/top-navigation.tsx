"use client"
import { useState } from "react"
import { FileText, Bell, User, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// 导航菜单数据
const menuItems = [
  {
    title: "我的项目",
    url: "/projects",
    icon: FileText,
  },
]

interface TopNavigationProps {
  currentPath?: string
}

export function TopNavigation({ currentPath = "" }: TopNavigationProps) {
  const [notificationOpen, setNotificationOpen] = useState(false)

  // 通知数据
  const notifications = [
    {
      id: 1,
      title: "商务完成了智慧城市建设项目的材料提交",
      time: "2小时前",
      type: "材料提交",
      urgent: false,
    },
    {
      id: 2,
      title: "数字政务平台项目已通过初审",
      time: "4小时前",
      type: "审批进度",
      urgent: true,
    },
    {
      id: 3,
      title: "教育信息化项目截止日期临近",
      time: "1天前",
      type: "截止提醒",
      urgent: true,
    },
  ]
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo 和品牌 */}
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <div className="grid text-left text-sm leading-tight">
              <span className="truncate font-semibold">项目管理系统</span>
              <span className="truncate text-xs text-muted-foreground">商务版</span>
            </div>
          </a>

          {/* 导航菜单 */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive =
                currentPath === item.url || (item.url !== "/" && currentPath && currentPath.startsWith(item.url))

              return (
                <Button
                  key={item.title}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="relative"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </nav>
        </div>

        {/* 右侧操作区域 */}
        <div className="flex items-center gap-2">
          <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold">通知中心</h3>
                <p className="text-sm text-muted-foreground">
                  您有 {notifications.filter((n) => n.urgent).length} 条重要通知
                </p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setNotificationOpen(false)
                      window.location.href = "/projects/001"
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? "bg-red-500" : "bg-blue-500"}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 leading-tight">{notification.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              notification.type === "材料提交"
                                ? "bg-green-100 text-green-700"
                                : notification.type === "审批进度"
                                  ? "bg-blue-100 text-blue-700"
                                  : notification.type === "会议提醒"
                                    ? "bg-orange-100 text-orange-700"
                                    : notification.type === "预算审核"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-red-100 text-red-700"
                            }`}
                          >
                            {notification.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t">
                <Button variant="ghost" size="sm" className="w-full text-sm">
                  查看全部通知
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>曾春梅</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">曾春梅</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                个人设置
              </DropdownMenuItem>
              <DropdownMenuItem>退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
