"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit3, Download } from "lucide-react"
import { TopNavigation } from "./top-navigation"
import { useState } from "react"

interface MeetingDetailProps {
  meetingId: string
}

export function MeetingDetail({ meetingId }: MeetingDetailProps) {
  // 模拟会议数据
  const meetingData = {
    id: meetingId,
    title: "南昌蛋鸡项目讨论",
    date: "2025-07-02",
    stopTime: "14:30:25",
    duration: "25:30",
    status: "已立项",
  }

  const [isEditing, setIsEditing] = useState(false)
  const [editableContent, setEditableContent] = useState({
    keyPoints:
      "本次会议重点讨论了南昌市新建区蛋鸡养殖基地建设项目的具体实施方案。项目总投资4.3亿元，选址在西山镇石岗村，占地面积约500亩。该项目将建设现代化蛋鸡养殖场，预计年产鸡蛋2万吨，能够带动当地就业200余人。\n\n会议强调了环保要求的重要性，要求项目方必须确保养殖废料得到妥善处理，严格符合国家环保标准。项目将分三期建设，第一期投资1.5亿元，主要建设基础设施和部分养殖场设施。\n\n与会专家对项目的技术方案和投资预算进行了详细审核，认为项目具有良好的经济效益和社会效益，符合当地产业发展规划。",
    suggestions:
      "• 完善项目环保措施方案，确保通过环评审批\n• 加快土地使用权办理手续，确保项目按期开工\n• 建立项目进度监督机制，定期汇报建设情况\n• 协调相关部门支持，为项目建设提供便利条件\n• 安排下次项目汇报会议，时间定于7月15日",
    participants: "张三、李四、王五、赵六、钱七",
  })

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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavigation currentPath="/meetings" />

      <div className="container mx-auto p-6 pt-24 max-w-4xl">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{meetingData.title}</h1>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meetingData.status)}`}>
                  {meetingData.status}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-xs text-muted-foreground">2025-07-02</p>
                <span className="text-xs text-muted-foreground">·</span>
                <div className="text-xs text-muted-foreground">
                  参与人：
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableContent.participants}
                      onChange={(e) => setEditableContent((prev) => ({ ...prev, participants: e.target.value }))}
                      className="ml-1 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-primary/20 bg-white"
                      placeholder="请输入参与人员"
                    />
                  ) : (
                    <span className="ml-1">{editableContent.participants}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* 会议纪要 */}
          <div className="space-y-6">
            <div>
              {/*<h2 className="text-xl font-semibold mb-4">会议纪要</h2>

              <Separator className="mb-6" />

              {/* 讨论要点 */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">讨论要点</h3>
                {isEditing ? (
                  <textarea
                    value={editableContent.keyPoints}
                    onChange={(e) => setEditableContent((prev) => ({ ...prev, keyPoints: e.target.value }))}
                    className="w-full min-h-[200px] p-3 text-sm leading-relaxed border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="请输入讨论要点..."
                  />
                ) : (
                  <div className="space-y-4">
                    {editableContent.keyPoints.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="mb-6" />

              {/* 下一步建议 */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">下一步建议</h3>
                {isEditing ? (
                  <textarea
                    value={editableContent.suggestions}
                    onChange={(e) => setEditableContent((prev) => ({ ...prev, suggestions: e.target.value }))}
                    className="w-full min-h-[120px] p-3 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="请输入下一步建议..."
                  />
                ) : (
                  <div className="space-y-2">
                    {editableContent.suggestions.split("\n").map((suggestion, index) => (
                      <p key={index} className="text-sm">
                        {suggestion}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* 操作按钮 */}
              <div className="flex gap-3 mt-6">
                {meetingData.status === "未立项" && (
                  <>
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={() => setIsEditing(false)}>
                          保存
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                          取消
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        编辑纪要
                      </Button>
                    )}
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  导出纪要
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
