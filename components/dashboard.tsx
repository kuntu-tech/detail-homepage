"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, Clock, CheckCircle, AlertCircle, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { useRouter } from "next/navigation"

const projectStats = {
  total: 44,
  inProgress: 12,
  completed: 24,
  overdue: 3,
}

const recentProjects = [
  {
    id: "001",
    name: "智慧城市建设项目",
    department: "信息化部",
    status: "进行中",
    progress: 75,
  },
  {
    id: "002", 
    name: "教育信息化项目",
    department: "教育局",
    status: "已完成",
    progress: 100,
  },
  {
    id: "003",
    name: "数字政务平台",
    department: "政务服务部", 
    status: "待审批",
    progress: 30,
  },
]

export function Dashboard() {
  const router = useRouter()

  const handleRowClick = (projectId: string, e: React.MouseEvent) => {
    // 阻止在点击下拉菜单时触发行点击
    const target = e.target as HTMLElement
    if (target.closest('[data-dropdown-trigger]')) {
      return
    }
    
    console.log('Navigating to:', `/projects/${projectId}`)
    router.push(`/projects/${projectId}`)
  }

  const handleMenuItemClick = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Menu item clicked, navigating to:', `/projects/${projectId}`)
    router.push(`/projects/${projectId}`)
  }

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总项目数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.total}</div>
            <p className="text-xs text-muted-foreground">+2 较上月</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">进行中</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">+1 较上月</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.completed}</div>
            <p className="text-xs text-muted-foreground">+3 较上月</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">逾期项目</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{projectStats.overdue}</div>
            <p className="text-xs text-muted-foreground">需要关注</p>
          </CardContent>
        </Card>
      </div>

      {/* 最近项目列表 */}
      <Card>
        <CardHeader>
          <CardTitle>最近项目</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div 
                key={project.id} 
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={(e) => handleRowClick(project.id, e)}
              >
                <div className="flex-1 pointer-events-none">
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.department}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={project.status === "已完成" ? "default" : project.status === "进行中" ? "secondary" : "outline"}>
                      {project.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0 pointer-events-auto" 
                      data-dropdown-trigger="true"
                    >
                      <span className="sr-only">打开菜单</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      onClick={(e) => handleMenuItemClick(project.id, e)}
                      className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                      查看详情
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer">
                      <Edit className="h-4 w-4" />
                      编辑项目
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer text-red-600">
                      <Trash2 className="h-4 w-4" />
                      删除项目
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
