"use client"
import { useState, useCallback } from "react"
import { Progress } from "@/components/ui/progress"
import { DropdownMenuContent as DropdownMenuContentComponent } from "@/components/ui/dropdown-menu"
import { AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { SidebarFooter as SidebarFooterComponent } from "@/components/ui/sidebar"
import { SidebarMenuButton as SidebarMenuButtonComponent } from "@/components/ui/sidebar"
import { SidebarMenuItem as SidebarMenuItemComponent } from "@/components/ui/sidebar"
import { SidebarMenu } from "@/components/ui/sidebar"
import { SidebarGroupContent as SidebarGroupContentComponent } from "@/components/ui/sidebar"
import { SidebarGroupLabel as SidebarGroupLabelComponent } from "@/components/ui/sidebar"
import { SidebarContent as SidebarContentComponent } from "@/components/ui/sidebar"
import { SidebarHeader as SidebarHeaderComponent } from "@/components/ui/sidebar"
import { Sidebar, SidebarGroup } from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import type React from "react"
import {
  Upload,
  FileText,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TopNavigation } from "@/components/top-navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 导航菜单数据
const menuItems = [
  {
    title: "工作台",
    url: "/",
    icon: FileText,
  },
  {
    title: "会议记录",
    url: "/meetings",
    icon: FileText,
    badge: "3",
  },
  {
    title: "我的项目",
    url: "/projects/list",
    icon: FileText,
  },
  {
    title: "材料管理",
    url: "/materials",
    icon: FileText,
    isActive: true,
    badge: "5",
  },
  {
    title: "系统设置",
    url: "/settings",
    icon: FileText,
  },
]

// 项目信息
const projectInfo = {
  name: "南昌蛋鸡项目",
  type: "专项债",
  deadline: "2025-08-15",
  progress: 60,
}

// 材料数据
const materialsData = {
  required: [
    {
      id: 1,
      name: "项目建议书",
      status: "uploaded",
      statusText: "已上传",
      uploadDate: "2025-07-01",
      reviewer: "张三",
      auditStatus: "passed",
      auditText: "通过审核",
    },
    {
      id: 2,
      name: "可研报告",
      status: "uploaded",
      statusText: "已上传",
      uploadDate: "2025-07-02",
      reviewer: "李四",
      auditStatus: "passed",
      auditText: "通过审核",
    },
    {
      id: 3,
      name: "环评报告",
      status: "reviewing",
      statusText: "审核中",
      uploadDate: "2025-07-03",
      reviewer: "王五",
      auditStatus: "reviewing",
      auditText: "审核中",
    },
    {
      id: 4,
      name: "建规证",
      status: "not_uploaded",
      statusText: "未上传",
      auditStatus: "pending",
      auditText: "待上传",
    },
    {
      id: 5,
      name: "用地预审意见书",
      status: "not_uploaded",
      statusText: "未上传",
      auditStatus: "pending",
      auditText: "待上传",
    },
    {
      id: 6,
      name: "资金证明",
      status: "uploaded",
      statusText: "已上传",
      uploadDate: "2025-07-04",
      reviewer: "赵六",
      auditStatus: "failed",
      auditText: "需���������修改",
    },
  ],
  optional: [
    {
      id: 7,
      name: "项目效果图",
      status: "not_uploaded",
      statusText: "未上传",
      auditStatus: "pending",
      auditText: "待上传",
    },
    {
      id: 8,
      name: "技术方案书",
      status: "not_uploaded",
      statusText: "未上传",
      auditStatus: "pending",
      auditText: "待上传",
    },
    {
      id: 9,
      name: "合作协议",
      status: "not_uploaded",
      statusText: "未上传",
      auditStatus: "pending",
      auditText: "待上传",
    },
  ],
}

// 获取指���数据
const guideData = {
  建规证: {
    title: "建规证获取指南",
    steps: ["前往当地规划局窗口", "携带用地预审意见书", "填写建设工程规划许可申请表", "提交相关材料并缴费"],
    duration: "15个工作日",
    requirements: ["用地预审意见书", "项目建议书", "身份证明"],
  },
  用地预审意见书: {
    title: "用地预审意见书获取指南",
    steps: ["前往当地自然资源局", "提交用地预审申请", "提供项目用地规划图", "等待审核结果"],
    duration: "20个工作日",
    requirements: ["项目建议书", "用地规划图", "申请表"],
  },
}

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
        <SidebarHeaderComponent>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">项目申报系统</span>
              <span className="truncate text-xs text-muted-foreground">政府版</span>
            </div>
          </div>
        </SidebarHeaderComponent>
        <SidebarContentComponent>
          <SidebarGroup>
            <SidebarGroupLabelComponent>主要功能</SidebarGroupLabelComponent>
            <SidebarGroupContentComponent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItemComponent key={item.title}>
                    <SidebarMenuButtonComponent asChild isActive={item.isActive}>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto h-5 w-5 rounded-full p-0 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButtonComponent>
                  </SidebarMenuItemComponent>
                ))}
              </SidebarMenu>
            </SidebarGroupContentComponent>
          </SidebarGroup>
        </SidebarContentComponent>
        <SidebarFooterComponent>
          <SidebarMenu>
            <SidebarMenuItemComponent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButtonComponent className="w-full">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>张三</AvatarFallback>
                    </Avatar>
                    <span>张三</span>
                    <MoreHorizontal className="ml-auto h-4 w-4" />
                  </SidebarMenuButtonComponent>
                </DropdownMenuTrigger>
                <DropdownMenuContentComponent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>个人设置</DropdownMenuItem>
                  <DropdownMenuItem>系统设置</DropdownMenuItem>
                  <DropdownMenuItem>退出登录</DropdownMenuItem>
                </DropdownMenuContentComponent>
              </DropdownMenu>
            </SidebarMenuItemComponent>
          </SidebarMenu>
        </SidebarFooterComponent>
      </Sidebar>
    </div>
  )
}

// 悬停触发区域组件
function HoverTrigger() {
  const { setOpen } = useSidebar()

  return <div className="fixed left-0 top-0 z-40 h-full w-4 bg-transparent" onMouseEnter={() => setOpen(true)} />
}

// 材料清单组件
function MaterialsList() {
  const [showOptionalMaterials, setShowOptionalMaterials] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showAuditDialog, setShowAuditDialog] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploaded":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "reviewing":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "not_uploaded":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (auditStatus: string, auditText: string) => {
    const variants = {
      passed: "default",
      reviewing: "secondary",
      failed: "destructive",
      pending: "outline",
    } as const

    return (
      <Badge variant={variants[auditStatus as keyof typeof variants] || "outline"} className="text-xs">
        {auditText}
      </Badge>
    )
  }

  const uploadedCount = materialsData.required.filter((m) => m.status === "uploaded").length
  const totalRequired = materialsData.required.length

  return (
    <div className="space-y-6">
      {/* 项目信息条 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">{projectInfo.name}</h2>
              <Badge variant="secondary">{projectInfo.type}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                截止时间: {projectInfo.deadline}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">进度:</span>
              <div className="flex items-center gap-2">
                <Progress value={projectInfo.progress} className="w-20" />
                <span className="text-sm font-medium">{projectInfo.progress}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 材料清单 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            必���材料 ({uploadedCount}/{totalRequired} 已上传)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {materialsData.required.map((material) => (
            <div key={material.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(material.status)}
                <div>
                  <p className="font-medium">{material.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {getStatusBadge(material.auditStatus, material.auditText)}
                    {material.uploadDate && <span>上传于 {material.uploadDate}</span>}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {material.status === "not_uploaded" ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                      onClick={() => {
                        setSelectedMaterial(material.name)
                        // 这里可以显示获取指南
                      }}
                    >
                      <FileText className="h-4 w-4" />
                      获取指南
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        setSelectedMaterial(material.name)
                        setShowUploadDialog(true)
                      }}
                    >
                      <Upload className="h-4 w-4" />
                      上传
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                      onClick={() => {
                        setSelectedMaterial(material.name)
                        setShowAuditDialog(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      查看
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                      onClick={() => {
                        setSelectedMaterial(material.name)
                        setShowUploadDialog(true)
                      }}
                    >
                      <Upload className="h-4 w-4" />
                      重新上传
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* 可选材料展开/收起 */}
          <div className="border-t pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowOptionalMaterials(!showOptionalMaterials)}
              className="w-full justify-between"
            >
              <span>可选材料 ({materialsData.optional.length}项)</span>
              {showOptionalMaterials ? <FileText className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
            </Button>

            {showOptionalMaterials && (
              <div className="mt-4 space-y-4">
                {materialsData.optional.map((material) => (
                  <div key={material.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(material.status)}
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getStatusBadge(material.auditStatus, material.auditText)}
                          {material.uploadDate && <span>上传于 {material.uploadDate}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          setSelectedMaterial(material.name)
                          setShowUploadDialog(true)
                        }}
                      >
                        <Upload className="h-4 w-4" />
                        上传
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 批量操作区 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              批量上传
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              导出清单
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Clock className="h-4 w-4" />
              申请延期
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              联系支持
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 上传对话框 */}
      <MaterialUploadDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        materialName={selectedMaterial}
      />

      {/* 审核状态对话框 */}
      <AuditStatusDialog open={showAuditDialog} onOpenChange={setShowAuditDialog} materialName={selectedMaterial} />
    </div>
  )
}

// 材料上传对话框
function MaterialUploadDialog({
  open,
  onOpenChange,
  materialName,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  materialName: string | null
}) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setUploadedFiles(files)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(files)
    }
  }

  const guide = materialName ? guideData[materialName as keyof typeof guideData] : null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      style={{ display: open ? "block" : "none" }}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">上传材料: {materialName}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => onOpenChange(false)}>
            <FileText className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* 上传区域 */}
          <div className="space-y-4">
            <h3 className="font-medium">上传区域</h3>
            <div
              className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <p className="text-lg font-medium">拖拽文件到此处 或</p>
                <label htmlFor="file-upload" className="mt-2 inline-block">
                  <Button variant="outline" className="cursor-pointer bg-transparent">
                    选择文件
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>支持格式: PDF, DOC, DOCX, JPG, PNG</p>
                <p>文件大小: 最大100MB</p>
              </div>
            </div>

            {/* 已选择的文件 */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">已选择的文件:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 获取指南 */}
          {guide && (
            <div className="space-y-4">
              <h3 className="font-medium">获取指南</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium">{guide.title}</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {guide.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                <p className="text-sm">
                  <strong>办理周期:</strong> {guide.duration}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    查看详细流程
                  </Button>
                  <Button variant="outline" size="sm">
                    下载申请表
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button variant="outline" disabled={uploadedFiles.length === 0}>
            保存并继续
          </Button>
          <Button disabled={uploadedFiles.length === 0}>上传完成</Button>
        </div>
      </div>
    </div>
  )
}

// 审核状态对��框
function AuditStatusDialog({
  open,
  onOpenChange,
  materialName,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  materialName: string | null
}) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const auditResults = [
    {
      name: "项目建议书",
      format: "格式正确",
      content: "内容完整",
      status: "passed",
      statusText: "通过审核",
    },
    {
      name: "可研报告",
      format: "格式正确",
      content: "缺少投资估算",
      status: "warning",
      statusText: "需要修改",
    },
    {
      name: "环评报告",
      format: "格式错误",
      content: "-",
      status: "failed",
      statusText: "未通过审核",
    },
  ]

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      style={{ display: open ? "block" : "none" }}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">审核状态</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => onOpenChange(false)}>
            <FileText className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* 审核状态总览 */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span>🔄 AI审核进行中... 预计完成时间: 3分钟</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  查看审核日志
                </Button>
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <FileText className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  刷新状态
                </Button>
              </div>
            </div>
          </div>

          {/* 审核结果 */}
          <div className="space-y-4">
            <h3 className="font-medium">审核结果</h3>
            <div className="space-y-3">
              {auditResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    {result.status === "passed" && <FileText className="h-5 w-5 text-green-500" />}
                    {result.status === "warning" && <FileText className="h-5 w-5 text-orange-500" />}
                    {result.status === "failed" && <FileText className="h-5 w-5 text-red-500" />}
                    <div>
                      <p className="font-medium">{result.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{result.format}</span>
                        <span>{result.content}</span>
                        <Badge
                          variant={
                            result.status === "passed"
                              ? "default"
                              : result.status === "warning"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {result.statusText}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                查看详细报告
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                重新审核
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                联系技术支持
              </Button>
            </div>
          </div>

          {/* 操作建议 */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-medium">💡 建议操作:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>修改可研报告中的投资估算章节</li>
              <li>重新上传环评报告(PDF格式)</li>
              <li>完成后重新提交审核</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
          <Button>重新上传</Button>
        </div>
      </div>
    </div>
  )
}

// 模拟材料数据
const materials = [
  {
    id: "MAT001",
    name: "项目可行性研究报告",
    type: "研究报告",
    project: "南昌高铁项目",
    uploadDate: "2024-01-15",
    size: "2.5MB",
    status: "已审核",
    uploader: "张三",
    format: "PDF",
  },
  {
    id: "MAT002",
    name: "环境影响评估报告",
    type: "评估报告",
    project: "赣州产业园",
    uploadDate: "2024-01-20",
    size: "4.2MB",
    status: "待审核",
    uploader: "李四",
    format: "PDF",
  },
  {
    id: "MAT003",
    name: "土地使用证明",
    type: "证明文件",
    project: "九江物流中心",
    uploadDate: "2024-01-18",
    size: "1.8MB",
    status: "已审核",
    uploader: "王五",
    format: "Excel",
  },
]

export function MaterialsManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || material.type === typeFilter
    const matchesStatus = statusFilter === "all" || material.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已审核":
        return "bg-green-100 text-green-800"
      case "待审核":
        return "bg-yellow-100 text-yellow-800"
      case "已拒绝":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation currentPath="/materials" />

      <main className="pt-16">
        <div className="container mx-auto p-6 space-y-6">
          {/* 页面标题和操作 */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">材料管理</h1>
            <p className="text-muted-foreground">管理项目相关文档和材料</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              上传材料
            </Button>
          </div>

          {/* 搜索和筛选 */}
          <Card>
            <CardHeader>
              <CardTitle>搜索和筛选</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="搜索材料名称或项目..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="材料类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="研究报告">研究报告</SelectItem>
                    <SelectItem value="评估报告">评估报告</SelectItem>
                    <SelectItem value="财务文件">财务文件</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="审核状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="已审核">已审核</SelectItem>
                    <SelectItem value="待审核">待审核</SelectItem>
                    <SelectItem value="已拒绝">已拒绝</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 材料列表 */}
          <Card>
            <CardHeader>
              <CardTitle>材料列表</CardTitle>
              <CardDescription>共 {filteredMaterials.length} 个材料</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">材料名称</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">类型</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">关联项目</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">状态</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">上传时间</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">上传人</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">文件信息</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map((material) => (
                      <tr key={material.id} className="border-b hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{material.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{material.type}</Badge>
                        </td>
                        <td className="py-4 px-4">{material.project}</td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(material.status)}>{material.status}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {material.uploadDate}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm">
                            <User className="h-3 w-3" />
                            {material.uploader}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div>{material.format}</div>
                            <div className="text-muted-foreground">{material.size}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>查看详情</DropdownMenuItem>
                                <DropdownMenuItem>编辑信息</DropdownMenuItem>
                                <DropdownMenuItem>删除材料</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
