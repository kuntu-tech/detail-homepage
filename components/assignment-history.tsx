"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type AssignmentStatus = "已完成" | "进行中" | "待确认"

type AssignmentRecord = {
  id: string
  projectName: string
  role: string
  assignee: string
  department: string
  status: AssignmentStatus
  assignedAt: string
  lastUpdated: string
  notes?: string
}

const statusStyles: Record<AssignmentStatus, string> = {
  已完成: "bg-green-100 text-green-700 border-green-200",
  进行中: "bg-blue-100 text-blue-700 border-blue-200",
  待确认: "bg-orange-100 text-orange-700 border-orange-200",
}

const assignmentRecords: AssignmentRecord[] = [
  {
    id: "AH-2025-0702-001",
    projectName: "南昌蛋鸡项目",
    role: "项目经理",
    assignee: "张三",
    department: "规划部",
    status: "进行中",
    assignedAt: "2025-07-02 14:30",
    lastUpdated: "2025-07-05 09:10",
    notes: "等待外联单反馈",
  },
  {
    id: "AH-2025-0701-002",
    projectName: "赣州产业园项目",
    role: "政研员",
    assignee: "李四",
    department: "政研室",
    status: "已完成",
    assignedAt: "2025-07-01 10:15",
    lastUpdated: "2025-07-04 16:45",
    notes: "材料审查完成",
  },
  {
    id: "AH-2025-0630-003",
    projectName: "九江物流中心",
    role: "技术员",
    assignee: "吴十",
    department: "技术部",
    status: "进行中",
    assignedAt: "2025-06-30 16:20",
    lastUpdated: "2025-07-03 11:32",
  },
  {
    id: "AH-2025-0628-004",
    projectName: "上饶文旅项目",
    role: "项目经理",
    assignee: "赵六",
    department: "文化旅游部",
    status: "待确认",
    assignedAt: "2025-06-28 09:00",
    lastUpdated: "2025-07-01 08:40",
    notes: "等待合同确认",
  },
  {
    id: "AH-2025-0625-005",
    projectName: "景德镇陶瓷产业园",
    role: "批量谋划员",
    assignee: "王五",
    department: "规划部",
    status: "已完成",
    assignedAt: "2025-06-25 13:45",
    lastUpdated: "2025-06-30 17:20",
  },
]

export function AssignmentHistory() {
  const totalCount = assignmentRecords.length
  const completedCount = assignmentRecords.filter((record) => record.status === "已完成").length
  const inProgressCount = assignmentRecords.filter((record) => record.status === "进行中").length
  const pendingCount = assignmentRecords.filter((record) => record.status === "待确认").length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>分配概览</CardTitle>
          <CardDescription>实时查看项目角色分配进度及状态</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">总记录数</div>
              <div className="text-2xl font-semibold mt-2">{totalCount}</div>
              <div className="text-xs text-muted-foreground mt-1">包含最近 30 天的角色分配</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">进行中</div>
              <div className="text-2xl font-semibold mt-2">{inProgressCount}</div>
              <div className="text-xs text-muted-foreground mt-1">待跟进的角色分配</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">待确认</div>
              <div className="text-2xl font-semibold mt-2">{pendingCount}</div>
              <div className="text-xs text-muted-foreground mt-1">等待确认或反馈</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">已完成</div>
              <div className="text-2xl font-semibold mt-2">{completedCount}</div>
              <div className="text-xs text-muted-foreground mt-1">已闭环的分配流程</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>分配记录</CardTitle>
          <CardDescription>查看各项目的角色分配历程与进展</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>记录编号</TableHead>
                <TableHead>项目名称</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>分配时间</TableHead>
                <TableHead>最新更新时间</TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignmentRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{record.projectName}</span>
                      <span className="text-xs text-muted-foreground">{record.department}</span>
                    </div>
                  </TableCell>
                  <TableCell>{record.role}</TableCell>
                  <TableCell>{record.assignee}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[record.status]}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.assignedAt}</TableCell>
                  <TableCell>{record.lastUpdated}</TableCell>
                  <TableCell className="max-w-[240px] text-xs text-muted-foreground">
                    {record.notes ?? "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground">
            数据为演示用途，实际项目应接入后台接口以确保信息实时更新。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


