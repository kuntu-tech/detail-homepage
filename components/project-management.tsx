"use client"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"

import { Home, Search, Settings, FileText, Mic, FolderOpen, Plus, Filter, Calendar, Download, Eye, Edit, FileCheck, TrendingUp, User, ChevronRight, Building, Factory, Truck, DollarSign, Users, Zap, UserCheck, Network, Wrench, RefreshCw, MoreHorizontal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TopNavigation } from "@/components/top-navigation"

// 导航菜单数据
const menuItems = [
  {
    title: "工作台",
    url: "/",
    icon: Home,
  },
  {
    title: "会议记录",
    url: "/meetings",
    icon: Mic,
    badge: "3",
  },
  {
    title: "项目管理",
    url: "/projects",
    icon: FolderOpen,
    isActive: true,
  },
  {
    title: "系统设置",
    url: "/settings",
    icon: Settings,
  },
]

// 团队成员数据
const teamMembers = {
  批量谋划员: [
    { id: 1, name: "张三", currentTasks: 6, maxTasks: 10, department: "规划部", phone: "13800138001" },
    { id: 2, name: "李四", currentTasks: 4, maxTasks: 10, department: "规划部", phone: "13800138002" },
    { id: 3, name: "王五", currentTasks: 2, maxTasks: 10, department: "规划部", phone: "13800138003" },
  ],
  政研员: [
    { id: 4, name: "赵六", currentTasks: 8, maxTasks: 10, department: "政研室", phone: "13800138004" },
    { id: 5, name: "钱七", currentTasks: 6, maxTasks: 10, department: "政研室", phone: "13800138005" },
    { id: 6, name: "孙八", currentTasks: 3, maxTasks: 10, department: "政研室", phone: "13800138006" },
  ],
  技术员: [
    { id: 7, name: "周九", currentTasks: 6, maxTasks: 10, department: "技术部", phone: "13800138007" },
    { id: 8, name: "吴十", currentTasks: 4, maxTasks: 10, department: "技术部", phone: "13800138008" },
    { id: 9, name: "郑一", currentTasks: 2, maxTasks: 10, department: "技术部", phone: "13800138009" },
    { id: 10, name: "陈二", currentTasks: 5, maxTasks: 10, department: "技术部", phone: "13800138010" },
  ],
}

// 项目数据（添加分配状态）
const projectsData = [
  {
    id: 1,
    name: "南昌蛋鸡项目",
    fullName: "南昌市新建区蛋鸡养殖基地建设项目",
    type: "专项债",
    amount: "4.3亿",
    status: "进行中",
    statusType: "in_progress",
    materialProgress: 80,
    deadline: "2025-08-15",
    manager: "张三",
    icon: Building,
    applicant: "新建区国控集团",
    location: "南昌市新建区西山镇石堎村",
    startDate: "2025-06-01",
    endDate: "2026-05-31",
    createDate: "2025-07-02",
    // 分配状态
    isAssigned: true,
    assignments: {
      批量谋划员: { id: 3, name: "王五", assignedDate: "2025-07-02 14:30" },
      政研员: { id: 5, name: "钱七", assignedDate: "2025-07-02 14:30" },
      技术员: { id: 7, name: "周九", assignedDate: "2025-07-02 14:30" },
    },
  },
  {
    id: 2,
    name: "赣州产业园项目",
    fullName: "赣州产业园基础设施建设项目",
    type: "一般债",
    amount: "2.1亿",
    status: "待审核",
    statusType: "pending",
    materialProgress: 95,
    deadline: "2025-07-20",
    manager: "李四",
    icon: Factory,
    applicant: "赣州市发展集团",
    location: "赣州市章贡区产业园区",
    startDate: "2025-08-01",
    endDate: "2026-12-31",
    createDate: "2025-07-01",
    // 未分配
    isAssigned: false,
    assignments: {},
  },
  {
    id: 3,
    name: "九江物流中心",
    fullName: "九江现代物流中心建设项目",
    type: "专项债",
    amount: "1.8亿",
    status: "材料准备",
    statusType: "preparing",
    materialProgress: 60,
    deadline: "2025-09-01",
    manager: "王五",
    icon: Truck,
    applicant: "九江港务集团",
    location: "九江市濂溪区长江大道",
    startDate: "2025-09-01",
    endDate: "2026-08-31",
    createDate: "2025-06-30",
    // 部分分配
    isAssigned: true,
    assignments: {
      批量谋划员: { id: 1, name: "张三", assignedDate: "2025-06-30 16:20" },
      技术员: { id: 8, name: "吴十", assignedDate: "2025-06-30 16:20" },
    },
  },
  {
    id: 4,
    name: "上饶文旅项目",
    fullName: "上饶市文化旅游综合开发项目",
    type: "专项债",
    amount: "3.5亿",
    status: "已完成",
    statusType: "completed",
    materialProgress: 100,
    deadline: "2025-06-30",
    manager: "赵六",
    icon: Building,
    applicant: "上饶文旅集团",
    location: "上饶市信州区",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    createDate: "2024-12-15",
    isAssigned: false,
    assignments: {},
  },
  {
    id: 5,
    name: "景德镇陶瓷产业园",
    fullName: "景德镇陶瓷文化创意产业园项目",
    type: "一般债",
    amount: "2.8亿",
    status: "暂停",
    statusType: "paused",
    materialProgress: 45,
    deadline: "2025-10-15",
    manager: "孙七",
    icon: Factory,
    applicant: "景德镇陶瓷集团",
    location: "景德镇市珠山区",
    startDate: "2025-11-01",
    endDate: "2027-10-31",
    createDate: "2025-05-20",
    isAssigned: false,
    assignments: {},
  },
]

// 项目分配数据
const assignmentsData = [
  {
    id: 1,
    projectName: "南昌蛋鸡项目",
    assignee: {
      name: "张三",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "项目经理",
    },
    assignDate: "2025-01-15",
    deadline: "2025-08-15",
    status: "进行中",
    priority: "高",
    statusColor: "bg-blue-500",
    priorityColor: "text-red-600",
  },
  {
    id: 2,
    projectName: "赣州产业园项目",
    assignee: {
      name: "李四",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "技术负责人",
    },
    assignDate: "2025-01-12",
    deadline: "2025-07-20",
    status: "待审核",
    priority: "中",
    statusColor: "bg-orange-500",
    priorityColor: "text-orange-600",
  },
  {
    id: 3,
    projectName: "九江物流中心",
    assignee: {
      name: "王五",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "项目经理",
    },
    assignDate: "2025-01-10",
    deadline: "2025-09-01",
    status: "材料准备",
    priority: "中",
    statusColor: "bg-yellow-500",
    priorityColor: "text-orange-600",
  },
]

function AppSidebar() {
  const { setOpen } = useSidebar()

  const handleMouseEnter = () => {
    setOpen(true)
  }

  const handleMouseLeave = () => {
    setOpen(false)
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Sidebar variant="inset">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">项目申报系统</span>
              <span className="truncate text-xs text-muted-foreground">政府版</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>主要功能</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto h-5 w-5 rounded-full p-0 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>张三</AvatarFallback>
                    </Avatar>
                    <span>张三</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    个人设置
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    系统设置
                  </DropdownMenuItem>
                  <DropdownMenuItem>退出登录</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}

// 悬停触发区域组件
function HoverTrigger() {
  const { setOpen } = useSidebar()

  return <div className="fixed left-0 top-0 z-40 h-full w-4 bg-transparent" onMouseEnter={() => setOpen(true)} />
}

// 人员选择器对话框
function PersonSelectorDialog({
  open,
  onOpenChange,
  role,
  projectName,
  currentPerson,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: string
  projectName: string
  currentPerson?: { id: number; name: string } | null
  onConfirm: (person: any) => void
}) {
  const [selectedPersonId, setSelectedPersonId] = useState<string>("")
  const [isAssigning, setIsAssigning] = useState(false)

  const availableMembers = teamMembers[role as keyof typeof teamMembers] || []

  const handleConfirm = () => {
    if (!selectedPersonId) return

    const selectedPerson = availableMembers.find((member) => member.id.toString() === selectedPersonId)
    if (!selectedPerson) return

    setIsAssigning(true)

    // 模拟分配过程
    setTimeout(() => {
      onConfirm(selectedPerson)
      setIsAssigning(false)
      onOpenChange(false)
      setSelectedPersonId("")
    }, 1500)
  }

  const getWorkloadColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 80) return "text-red-600"
    if (percentage >= 60) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>重新分配 {role}</DialogTitle>
          <DialogDescription>
            为项目 "{projectName}" 选择新的{role}
            {currentPerson && (
              <span className="block mt-2 text-sm">
                当前负责人: <span className="font-medium">{currentPerson.name}</span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            {availableMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedPersonId === member.id.toString()
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPersonId(member.id.toString())}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={selectedPersonId === member.id.toString()}
                      onChange={() => setSelectedPersonId(member.id.toString())}
                      className="text-primary"
                    />
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>{member.name.slice(-2)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.name}</span>
                      {currentPerson?.id === member.id && (
                        <Badge variant="outline" className="text-xs">
                          当前负责人
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{member.department}</span>
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">工作负载</div>
                    <div className={`text-sm ${getWorkloadColor(member.currentTasks, member.maxTasks)}`}>
                      {member.currentTasks}/{member.maxTasks} 个任务
                    </div>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (member.currentTasks / member.maxTasks) * 100 >= 80
                          ? "bg-red-500"
                          : (member.currentTasks / member.maxTasks) * 100 >= 60
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${(member.currentTasks / member.maxTasks) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isAssigning}>
            取消
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedPersonId || isAssigning}>
            {isAssigning ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                分配中...
              </>
            ) : (
              "确认分配"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ProjectsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [fundingFilter, setFundingFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // 人员选择器状态
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedRole, setSelectedRole] = useState("")

  // 修改后的 getStatusBadge 函数，支持阶段标题和反馈状态
  const getStatusBadge = (status: string, statusType: string, stageTitle?: string, hasFeedback?: boolean) => {
    const variants = {
      in_progress: "default",
      pending: "secondary",
      preparing: "outline",
      completed: "default",
      paused: "destructive",
    } as const

    const colors = {
      in_progress: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      pending: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      preparing: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      completed: "bg-green-100 text-green-800 hover:bg-green-100",
      paused: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    // 如果是进行中状态且有阶段标题，显示特定的进行中状态
    let displayStatus = status
    if (statusType === "in_progress" && stageTitle) {
      switch (stageTitle) {
        case "外联单阶段":
          displayStatus = "商务查收外联单中"
          break
        case "合同谈判阶段":
          displayStatus = "合同谈判中"
          break
        case "回款建档阶段":
          displayStatus = "手动录入建档信息中"
          break
        case "报告阶段":
          displayStatus = "商务查收报告中"
          break
        case "省评阶段":
          displayStatus = hasFeedback ? "省评修改意见处理中" : "等待省评结果中"
          break
        case "国评阶段":
          displayStatus = hasFeedback ? "国评修改意见处理中" : "等待国评结果中"
          break
        case "项目结项":
          displayStatus = "项目结项确认中"
          break
        default:
          displayStatus = status
      }
    }

    return (
      <Badge
        variant={variants[statusType as keyof typeof variants] || "outline"}
        className={colors[statusType as keyof typeof colors]}
      >
        {displayStatus}
      </Badge>
    )
  }

  const getFundingTypeBadge = (type: string) => {
    return (
      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
        {type}
      </Badge>
    )
  }

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.statusType === statusFilter
    const matchesFunding = fundingFilter === "all" || project.type === fundingFilter
    return matchesSearch && matchesStatus && matchesFunding
  })

  const totalPages = Math.ceil(filteredProjects.length / 10)
  const startIndex = (currentPage - 1) * 10
  const endIndex = startIndex + 10
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  // 首次分配功能
  const handleQuickAssign = (projectId: number) => {
    const confirmAssign = confirm(`确定要为项目 ID ${projectId} 一键分配所有角色吗？`)
    if (confirmAssign) {
      alert("🚀 正在进行一键分配...")
      setTimeout(() => {
        alert("✅ 分配完成！请在项目详情页面查看分配结果。")
      }, 2000)
    }
  }

  const handleRoleAssign = (projectId: number, role: string) => {
    alert(`正在为项目 ID ${projectId} 分配 ${role}...`)
    setTimeout(() => {
      alert(`✅ ${role} 分配完成！请在项目详情页面查看分配结果。`)
    }, 1500)
  }

  // 重新分配功能
  const handleReassign = (project: any, role: string) => {
    setSelectedProject(project)
    setSelectedRole(role)
    setSelectorOpen(true)
  }

  const handleConfirmReassign = (newPerson: any) => {
    if (!selectedProject || !selectedRole) return

    const oldPerson = selectedProject.assignments[selectedRole]

    // 记录变更操作
    const changeRecord = {
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      role: selectedRole,
      oldPerson: oldPerson,
      newPerson: newPerson,
      changeTime: new Date().toLocaleString("zh-CN"),
      operator: "张三", // 当前用户
    }

    console.log("变更记录:", changeRecord)

    // 发送通知
    const notifications = []

    if (oldPerson) {
      notifications.push({
        to: oldPerson.name,
        message: `您已被移除项目"${selectedProject.name}"的${selectedRole}职责`,
        type: "removal",
      })
    }

    notifications.push({
      to: newPerson.name,
      message: `您已被分配为项目"${selectedProject.name}"的${selectedRole}`,
      type: "assignment",
    })

    // 模拟发送通知
    setTimeout(() => {
      alert(
        `📤 重新分配完成！\n\n变更详情：\n项目：${selectedProject.name}\n角色：${selectedRole}\n原负责人：${oldPerson?.name || "无"}\n新负责人：${newPerson.name}\n\n✅ 已向相关人员发送通知`,
      )
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* 筛选与搜索 */}
      <hr className="border-gray-200" />
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
              <Input
                placeholder="搜索项目..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="in_progress">进行中</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                  <SelectItem value="preparing">材料准备</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="paused">暂停</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="时间筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部时间</SelectItem>
                  <SelectItem value="this_month">本月</SelectItem>
                  <SelectItem value="this_quarter">本季度</SelectItem>
                  <SelectItem value="this_year">本年度</SelectItem>
                </SelectContent>
              </Select>

              <Select value={fundingFilter} onValueChange={setFundingFilter}>
                <SelectTrigger className="w-[140px]">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="资金类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="专项债">专项债</SelectItem>
                  <SelectItem value="一般债">一般债</SelectItem>
                  <SelectItem value="财政资金">财政资金</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                导出
              </Button>

              <Button className="gap-2" asChild>
                <a href="/projects/create">
                  <Plus className="h-4 w-4" />
                  新建项目
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <hr className="border-gray-200" />

      {/* 项目列表 */}
      <div className="space-y-4">
        {currentProjects.map((project) => (
          <Card key={project.id} className="transition-shadow hover:shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <project.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    {getFundingTypeBadge(project.type)}
                    {/* 这里可以根据实际需要传入阶段标题和反馈状态 */}
                    {getStatusBadge(project.status, project.statusType)}
                    {project.isAssigned && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        已分配
                      </Badge>
                    )}
                  </div>

                  <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      投资: {project.amount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      截止: {project.deadline}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      负责人: {project.manager}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileCheck className="h-4 w-4" />
                      材料完成度: {project.materialProgress}%
                    </div>
                  </div>

                  {/* 显示已分配的人员信息 */}
                  {project.isAssigned && Object.keys(project.assignments).length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">已分配:</span>
                      <div className="flex gap-2">
                        {Object.entries(project.assignments).map(([role, person]: [string, any]) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}: {person.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">材料进度:</span>
                    <Progress value={project.materialProgress} className="flex-1 max-w-xs" />
                    <span className="text-sm font-medium">{project.materialProgress}%</span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                    <a href={`/projects/${project.id}`}>
                      <Eye className="h-4 w-4" />
                      查看
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                    <a href={`/projects/create?edit=${project.id}`}>
                      <Edit className="h-4 w-4" />
                      编辑
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                    <a href="/materials">
                      <FileCheck className="h-4 w-4" />
                      材料
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <TrendingUp className="h-4 w-4" />
                    进度
                  </Button>

                  {/* 任务分配下拉菜单 - 根据分配状态显示不同选项 */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Users className="h-4 w-4" />
                        {project.isAssigned ? "重新分配" : "任务分配"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {!project.isAssigned ? (
                        // 首次分配选项
                        <>
                          <DropdownMenuItem onClick={() => handleQuickAssign(project.id)} className="gap-2">
                            <Zap className="h-4 w-4" />🚀 一键分配所有角色
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleAssign(project.id, "批量谋划员")}
                            className="gap-2"
                          >
                            <UserCheck className="h-4 w-4" />
                            分配批量谋划员
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleAssign(project.id, "政研员")} className="gap-2">
                            <Network className="h-4 w-4" />
                            分配政研员
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleAssign(project.id, "技术员")} className="gap-2">
                            <Wrench className="h-4 w-4" />
                            分配技术员
                          </DropdownMenuItem>
                        </>
                      ) : (
                        // 重新分配选项
                        <>
                          <DropdownMenuItem onClick={() => handleReassign(project, "批量谋划员")} className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            重新分配批量谋划员
                            {project.assignments.批量谋划员 && (
                              <span className="ml-auto text-xs text-muted-foreground">
                                ({project.assignments.批量谋划员.name})
                              </span>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReassign(project, "政研员")} className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            重新分配政研员
                            {project.assignments.政研员 && (
                              <span className="ml-auto text-xs text-muted-foreground">
                                ({project.assignments.政研员.name})
                              </span>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReassign(project, "技术员")} className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            重新分配技术员
                            {project.assignments.技术员 && (
                              <span className="ml-auto text-xs text-muted-foreground">
                                ({project.assignments.技术员.name})
                              </span>
                            )}
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 分页控制 */}
      <hr className="border-gray-200" />
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">共 {filteredProjects.length} 个项目</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                上一页
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              })}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                下一页
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 人员选择器对话框 */}
      <PersonSelectorDialog
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
        role={selectedRole}
        projectName={selectedProject?.name || ""}
        currentPerson={selectedProject?.assignments[selectedRole]}
        onConfirm={handleConfirmReassign}
      />
    </div>
  )
}

// 模拟项目数据
const projects = [
  {
    id: "001",
    name: "南昌高铁项目",
    description: "南昌市新建至赣州高铁基地...",
    status: "进行中",
    priority: "高",
    investment: "4.3亿元",
    location: "南昌市新建区南山镇",
    responsible: "张三",
    progress: 75,
    deadline: "2026-05-30",
    allocation: "2人",
    statusColor: "blue",
  },
  {
    id: "002",
    name: "赣州产业园",
    description: "赣州市现代农业产业园建设...",
    status: "待批",
    priority: "中",
    investment: "2.8亿元",
    location: "赣州市章贡区",
    responsible: "王五",
    progress: 30,
    deadline: "2025-12-15",
    allocation: "1人",
    statusColor: "yellow",
  },
]

export function ProjectsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("全部状态")
  const [priorityFilter, setPriorityFilter] = useState("全部优先级")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "全部状态" || project.status === statusFilter
    const matchesPriority = priorityFilter === "全部优先级" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavigation currentPath="/projects" />

      <div className="container mx-auto p-6 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">项目管理</h1>
          <p className="text-muted-foreground">管理和监控所有项目进展</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜索项目名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部状态">全部状态</SelectItem>
                <SelectItem value="进行中">进行中</SelectItem>
                <SelectItem value="已完成">已完成</SelectItem>
                <SelectItem value="待批">待批</SelectItem>
                <SelectItem value="暂停">暂停</SelectItem>
              </SelectContent>
            </Select>

            <Button asChild>
              <a href="/projects/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                新建项目
              </a>
            </Button>
          </div>
        </div>

        <hr className="border-gray-200" />
        <Card>
          <CardHeader>
            <CardTitle>项目列表</CardTitle>
            <CardDescription>共 {filteredProjects.length} 个项目</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <Badge variant="outline">#{project.id}</Badge>
                        <Badge variant={project.status === "进行中" ? "default" : "secondary"}>{project.status}</Badge>
                        <Badge variant={project.priority === "高" ? "destructive" : "outline"}>
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{project.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">投资金额:</span>
                          <span className="ml-1 font-medium">{project.investment}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">建设地址:</span>
                          <span className="ml-1">{project.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">负责人:</span>
                          <span className="ml-1">{project.responsible}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">截止时间:</span>
                          <span className="ml-1">{project.deadline}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">项目进度</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`/projects/${project.id}`}>
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <a href={`/projects/${project.id}`}>查看详情</a>
                          </DropdownMenuItem>
                          <DropdownMenuItem>编辑项目</DropdownMenuItem>
                          <DropdownMenuItem>分配任务</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">删除项目</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
