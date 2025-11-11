"use client"

import { useState } from "react"
import { Search, Plus, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { useRouter } from "next/navigation"

// 项目数据
const projects = [
  {
    id: "001",
    name: "智慧城市建设项目",
    status: "进行中",
    priority: "高",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    budget: "5000万",
    progress: 65,
    manager: "张三",
    team: ["李四", "王五", "赵六"],
    description: "构建智慧城市基础设施，包括物联网、大数据平台等",
    category: "基础设施",
    department: "信息化部",
  },
  {
    id: "002",
    name: "数字政务平台",
    status: "待审批",
    priority: "中",
    startDate: "2024-03-01",
    endDate: "2024-10-30",
    budget: "2000万",
    progress: 0,
    manager: "李四",
    team: ["王五", "赵六"],
    description: "建设一站式数字政务服务平台",
    category: "软件开发",
    department: "政务服务部",
  },
  {
    id: "003",
    name: "教育信息化项目",
    status: "已完成",
    priority: "低",
    startDate: "2023-09-01",
    endDate: "2024-02-29",
    budget: "1500万",
    progress: 100,
    manager: "王五",
    team: ["张三", "赵六"],
    description: "推进教育数字化转型，建设智慧校园",
    category: "教育",
    department: "教育局",
  },
  {
    id: "004",
    name: "医疗健康大数据平台",
    status: "进行中",
    priority: "高",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    budget: "3500万",
    progress: 40,
    manager: "赵六",
    team: ["张三", "李四"],
    description: "构建区域医疗健康大数据平台",
    category: "医疗",
    department: "卫健委",
  },
  {
    id: "005",
    name: "交通智能管控系统",
    status: "暂停",
    priority: "中",
    startDate: "2024-01-01",
    endDate: "2024-08-31",
    budget: "2800万",
    progress: 25,
    manager: "孙七",
    team: ["李四", "王五"],
    description: "建设智能交通管控和监测系统",
    category: "交通",
    department: "交通局",
  },
]

// 人员数据
const availablePersons = {
  张三: { name: "张三", role: "项目经理", department: "信息化部" },
  李四: { name: "李四", role: "技术负责人", department: "技术部" },
  王五: { name: "王五", role: "产品经理", department: "产品部" },
  赵六: { name: "赵六", role: "开发工程师", department: "技术部" },
  孙七: { name: "孙七", role: "项目经理", department: "基础设施部" },
}

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const router = useRouter()

  // 过滤项目
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes((searchTerm || "").toLowerCase()) ||
      project.description.toLowerCase().includes((searchTerm || "").toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "进行中":
        return "bg-blue-100 text-blue-800"
      case "待审批":
        return "bg-yellow-100 text-yellow-800"
      case "已完成":
        return "bg-green-100 text-green-800"
      case "暂停":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRowClick = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  return (
    <div className="space-y-6">
      {/* 搜索和过滤器 */}
      <Card className="border-transparent leading-4 border-none mx-0 px-0 opacity-100">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>我的项目</span>
            <Button asChild>
              <a href="/projects/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                立项
              </a>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索项目名称或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="进行中">进行中</SelectItem>
                <SelectItem value="待审批">待审批</SelectItem>
                <SelectItem value="已完成">已完成</SelectItem>
                <SelectItem value="暂停">暂停</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 项目表格 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>项目名称</TableHead>
                  <TableHead>状态</TableHead>

                  <TableHead>进度</TableHead>
                  <TableHead>申报截止日期</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      没有找到匹配的项目
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow 
                      key={project.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleRowClick(project.id)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{project.endDate}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
