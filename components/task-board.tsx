"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronRight, Plus, MoreHorizontal, User, FileText } from "lucide-react"

interface Task {
  id: string
  name: string
  researcher: string
  status: string
  statusColor: string
}

interface TaskGroup {
  id: string
  title: string
  tasks: Task[]
  isExpanded: boolean
}

export function TaskBoard() {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([
    {
      id: "1",
      title: "待处理",
      isExpanded: true,
      tasks: [
        {
          id: "1",
          name: "智慧城市建设项目外联单",
          researcher: "张三",
          status: "待审核",
          statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
          id: "2",
          name: "数字政务平台外联单",
          researcher: "李四",
          status: "待处理",
          statusColor: "bg-blue-100 text-blue-800",
        },
      ],
    },
    {
      id: "2",
      title: "进行中",
      isExpanded: true,
      tasks: [
        {
          id: "3",
          name: "环保监测系统外联单",
          researcher: "王五",
          status: "处理中",
          statusColor: "bg-orange-100 text-orange-800",
        },
      ],
    },
    {
      id: "3",
      title: "已完成",
      isExpanded: true,
      tasks: [
        {
          id: "4",
          name: "交通管理系统外联单",
          researcher: "赵六",
          status: "已完成",
          statusColor: "bg-green-100 text-green-800",
        },
        {
          id: "5",
          name: "教育信息化外联单",
          researcher: "钱七",
          status: "已完成",
          statusColor: "bg-green-100 text-green-800",
        },
      ],
    },
  ])

  const [newStatusName, setNewStatusName] = useState("")
  const [showNewStatusInput, setShowNewStatusInput] = useState(false)

  const toggleGroup = (groupId: string) => {
    setTaskGroups((groups) =>
      groups.map((group) => (group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group)),
    )
  }

  const addNewStatus = () => {
    if (newStatusName.trim()) {
      const newGroup: TaskGroup = {
        id: Date.now().toString(),
        title: newStatusName.trim(),
        tasks: [],
        isExpanded: true,
      }
      setTaskGroups([...taskGroups, newGroup])
      setNewStatusName("")
      setShowNewStatusInput(false)
    }
  }

  const addNewTask = (groupId: string) => {
    // 这里可以添加新任务的逻辑
    console.log("Add new task to group:", groupId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">任务看板</h2>
        <div className="flex items-center gap-2">
          {showNewStatusInput ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder="输入状态名称"
                value={newStatusName}
                onChange={(e) => setNewStatusName(e.target.value)}
                className="w-40"
                onKeyPress={(e) => e.key === "Enter" && addNewStatus()}
              />
              <Button size="sm" onClick={addNewStatus}>
                确定
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowNewStatusInput(false)
                  setNewStatusName("")
                }}
              >
                取消
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowNewStatusInput(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建状态
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {taskGroups.map((group) => (
          <Card key={group.id} className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => toggleGroup(group.id)} className="p-0 h-6 w-6">
                    {group.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                  <CardTitle className="text-lg font-semibold">{group.title}</CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {group.tasks.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addNewTask(group.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {group.isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {group.tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{task.name}</h4>
                            </div>
                            <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-600">{task.researcher}</span>
                            </div>
                            <Badge className={`text-xs ${task.statusColor}`}>{task.status}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {group.tasks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">暂无任务</p>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                    onClick={() => addNewTask(group.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    添加任务
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
