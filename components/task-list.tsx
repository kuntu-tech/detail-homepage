"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, MoreHorizontal, Plus, Circle, FileText, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Task {
  id: string
  name: string
  description: string
  lastUpdated: string
  status: "pending" | "in-progress" | "completed" | "review"
}

interface TaskGroup {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  tasks: Task[]
  isExpanded: boolean
}

const getStatusBadge = (status: Task["status"]) => {
  const statusConfig = {
    pending: { label: "待处理", color: "bg-yellow-100 text-yellow-800" },
    "in-progress": { label: "进行中", color: "bg-blue-100 text-blue-800" },
    completed: { label: "已完成", color: "bg-green-100 text-green-800" },
    review: { label: "待审核", color: "bg-purple-100 text-purple-800" },
  }

  const config = statusConfig[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

export function TaskList() {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([
    {
      id: "1",
      name: "商务收集材料",
      icon: <Circle className="w-3 h-3 fill-gray-400 text-gray-400" />,
      color: "gray",
      isExpanded: true,
      tasks: [
        {
          id: "1",
          name: "企业营业执照",
          description: "提供最新的企业营业执照副本，确保信息完整清晰",
          lastUpdated: "2024-01-15 14:30",
          status: "completed",
        },
        {
          id: "2",
          name: "财务审计报告",
          description: "近三年财务审计报告，包含资产负债表和利润表",
          lastUpdated: "2024-01-14 16:45",
          status: "in-progress",
        },
        {
          id: "3",
          name: "技术方案书",
          description: "详细的技术实施方案，包含时间节点和里程碑",
          lastUpdated: "2024-01-13 09:20",
          status: "pending",
        },
        {
          id: "4",
          name: "项目预算表",
          description: "详细的项目预算分解，包含人力成本和设备采购",
          lastUpdated: "2024-01-12 11:15",
          status: "review",
        },
        {
          id: "5",
          name: "合规证明文件",
          description: "相关行业资质证书和合规性证明材料",
          lastUpdated: "2024-01-11 15:30",
          status: "pending",
        },
      ],
    },
  ])

  const toggleGroupExpansion = (groupId: string) => {
    setTaskGroups((groups) =>
      groups.map((group) => (group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group)),
    )
  }

  const addNewTask = (groupId: string) => {
    // 这里可以添加新任务的逻辑
    console.log("添加新任务到组:", groupId)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* 标题 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">任务 List</h2>
      </div>

      {/* 任务分组列表 */}
      <div className="divide-y divide-gray-200">
        {taskGroups.map((group) => (
          <div key={group.id} className="bg-white">
            {/* 分组标题 */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleGroupExpansion(group.id)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  {group.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  {group.icon}
                  <span className="font-medium">{group.name}</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{group.tasks.length}</span>
                </button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>编辑分组</DropdownMenuItem>
                  <DropdownMenuItem>删除分组</DropdownMenuItem>
                  <DropdownMenuItem>导出任务</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 任务列表表格 */}
            {group.isExpanded && (
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        示例文件及说明
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        最晚更新时间
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {group.tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{task.name}</div>
                              <div className="text-sm text-gray-500">{getStatusBadge(task.status)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">{task.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{task.lastUpdated}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>查看详情</DropdownMenuItem>
                              <DropdownMenuItem>编辑任务</DropdownMenuItem>
                              <DropdownMenuItem>更改状态</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">删除任务</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* 添加任务按钮 */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addNewTask(group.id)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
