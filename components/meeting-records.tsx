"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mic, Search, Filter, Calendar, User, Clock, Play, Pause, StopCircle, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

export function MeetingRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false)

  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null)
  const [meetings, setMeetings] = useState([
    {
      id: "001",
      title: "南昌高铁项目启动会议",
      date: "2024-01-15",
      time: "14:03",
      participants: ["张市长", "李秘书", "王副市长"],
      status: "未立项",
      duration: "56分钟",
      location: "会议室A",
      summary: "讨论了项目的可行性和初步规划，确定了项目团队和时间节点。",
    },
    {
      id: "002",
      title: "赣州产业园规划讨论",
      date: "2024-01-18",
      time: "09:22",
      participants: ["赵纪委书记", "孙副书记"],
      status: "已立项",
      duration: "129分钟",
      location: "会议室B",
      summary: "确定了产业园的建设规模和投资预算，讨论了环保要求。",
    },
    {
      id: "003",
      title: "九江物流中心进度汇报",
      date: "2024-01-20",
      time: "10:08",
      participants: ["王县长", "吴副县长", "郑主任"],
      status: "已立项",
      duration: "24分钟",
      location: "会议室C",
      summary: "汇报了项目当前进度，讨论了遇到的问题和解决方案。",
    },
  ])

  const startRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
    setRecordingTime(0)

    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)
    setRecordingInterval(interval)
  }

  const pauseRecording = () => {
    setIsPaused(true)
    if (recordingInterval) {
      clearInterval(recordingInterval)
      setRecordingInterval(null)
    }
  }

  const resumeRecording = () => {
    setIsPaused(false)
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)
    setRecordingInterval(interval)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    if (recordingInterval) {
      clearInterval(recordingInterval)
      setRecordingInterval(null)
    }

    // 创建新的会议记录
    const newMeeting = {
      id: String(meetings.length + 1).padStart(3, "0"),
      title: `会议录音 ${new Date().toLocaleDateString()}`,
      date: new Date().toISOString().split("T")[0],
      time: `${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}-录制完成`,
      participants: ["当前用户"],
      status: "未立项" as const,
      duration: `${Math.floor(recordingTime / 60)}分${recordingTime % 60}秒`,
      location: "在线录制",
      summary: "新录制的会议内容，等待转录和处理。",
    }

    setMeetings((prev) => [newMeeting, ...prev])
    setRecordingTime(0)
  }

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已立项":
        return "bg-green-100 text-green-800"
      case "未立项":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter

    let matchesDate = true
    if (dateFilter !== "all") {
      const meetingDate = new Date(meeting.date)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - meetingDate.getTime()) / (1000 * 60 * 60 * 24))

      switch (dateFilter) {
        case "week":
          matchesDate = daysDiff <= 7
          break
        case "twoWeeks":
          matchesDate = daysDiff <= 14
          break
        case "month":
          matchesDate = daysDiff <= 30
          break
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* 左侧：标题 */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{"访问记录"}</h1>
          </div>
        </div>

        {/* 中间：录音控件 */}
        <div className="flex items-center gap-2">
          {isRecording && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-600 font-mono">{formatRecordingTime(recordingTime)}</span>
            </div>
          )}

          

          {isRecording && (
            <Button onClick={stopRecording} variant="outline" size="sm">
              <StopCircle className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* 右侧：搜索和筛选控件 */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="搜索会议记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Button
            variant={isMultiSelectMode ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setIsMultiSelectMode(!isMultiSelectMode)
              setSelectedRecords([])
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%AB%8B%E9%A1%B9%E9%A1%B9%E7%9B%AE-MfAc2tyOcsVvHZonQ3P7MjXPyUTTsq.png"
              alt="Multi-select"
              className="h-4 w-4"
              style={{ filter: isMultiSelectMode ? "invert(1)" : "none" }}
            />
          </Button>

          {isMultiSelectMode && selectedRecords.length > 0 && (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  // 更新选中记录的状态为已立项
                  setMeetings((prev) =>
                    prev.map((meeting) =>
                      selectedRecords.includes(meeting.id) ? { ...meeting, status: "已立项" } : meeting,
                    ),
                  )

                  // 跳转到项目创建页面
                  window.location.href = `/projects/create?meetingId=001&action=establish`

                  // 清空选择状态
                  setSelectedRecords([])
                  setIsMultiSelectMode(false)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                立项 ({selectedRecords.length})
              </Button>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">全部状态</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="已立项">已立项</SelectItem>
                        <SelectItem value="未立项">未立项</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">日期</label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部时间</SelectItem>
                        <SelectItem value="week">1周内</SelectItem>
                        <SelectItem value="twoWeeks">2周内</SelectItem>
                        <SelectItem value="month">1个月内</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 访问记录列表 - 移除Card包装，用横线分隔 */}
      <div className="space-y-0">
        {filteredMeetings.map((meeting, index) => (
          <div key={meeting.id}>
            <div
              className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors relative ${
                selectedRecords.includes(meeting.id) ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => (window.location.href = `/meetings/${meeting.id}`)}
              style={{ cursor: "pointer" }}
            >
              {isMultiSelectMode && (
                <div className="absolute top-4 left-4 z-10">
                  <Checkbox
                    checked={selectedRecords.includes(meeting.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRecords((prev) => [...prev, meeting.id])
                      } else {
                        setSelectedRecords((prev) => prev.filter((id) => id !== meeting.id))
                      }
                    }}
                  />
                </div>
              )}
              <div className={`flex items-center gap-4 ${isMultiSelectMode ? "ml-8" : ""}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{meeting.title}</h4>
                    <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {meeting.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meeting.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      时长: {meeting.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {meeting.participants.length}人参与：{meeting.participants.join("、")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {meeting.status === "未立项" && !isMultiSelectMode && (
                  <Button size="sm" asChild>
                    <a href={`/projects/create?meetingId=${meeting.id}&action=establish`}>立项</a>
                  </Button>
                )}
              </div>
            </div>
            {/* 横线分隔，最后一项不显示 */}
            {index < filteredMeetings.length - 1 && <hr className="border-gray-200" />}
          </div>
        ))}
      </div>
    </div>
  )
}
