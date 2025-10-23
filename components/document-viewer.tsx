"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Download, RefreshCw, Save, FileText, X } from "lucide-react"

// 文档数据
const documentData = {
  id: Date.now(),
  title: "南昌市新建区蛋鸡养殖基地建设项目外联单",
  type: "外联单",
  generateTime: "2025-07-02 14:30",
  content: `南昌市新建区蛋鸡养殖基地建设项目外联单

项目基本信息：
项目名称：南昌市新建区蛋鸡养殖基地建设项目
申报主体：新建区国控集团
实施主体：新建区国控集团
建设地址：南昌市新建区西山镇石堎村
总投资：43000万元
资金需求：34000万元

项目建设内容：
本项目拟建设160万羽蛋鸡及40万羽育雏智慧养殖基地，项目占地面积约500亩。主要建设内容包括：

1. 蛋鸡养殖区
建设标准化鸡舍20栋，单栋设计容量8万羽，配套自动化喂料系统、饮水系统、清粪系统等现代化设备。采用层叠式笼养模式，提高空间利用率。

2. 育雏区建设
建设育雏舍8栋，单栋设计容量5万羽，配套先进的温控系统、通风系统，确保雏鸡健康成长环境。

3. 饲料加工区
建设饲料加工车间及仓储设施，年加工能力5万吨，满足养殖场饲料需求，确保饲料质量和供应稳定。

4. 蛋品处理区
建设蛋品分拣、包装、冷藏设施，日处理鸡蛋能力100吨，配套现代化分拣设备和包装流水线。

5. 环保设施建设
建设粪污处理系统，采用干湿分离、厌氧发酵等技术，实现粪污资源化利用，年处理粪污8万吨。

6. 配套��础设施
建设办公楼、宿舍、道路、绿化等配套设施，完善项目功能配套。

项目效益分析：
项目建成后，年产鸡蛋约4万吨�����年产值预计达到3.2亿元。同时可带动当地就业300余人，对促进当地农业产业化发展、增加农民收入具有重要意义。

项目符合国家产业政策和地方发展规划，建议予以支持。

                                    新建区发展和改革委员会
                                      ${new Date().toLocaleDateString()}`,
  pdfUrl: "/documents/liaison-letter.pdf",
}

// 初始评论数据
const initialComments = [
  {
    id: 1,
    text: "建设160万羽蛋鸡及40万羽育雏智慧养殖基地",
    comment: "建议补充具体的养殖技术方案和设备配置清单",
    timestamp: "2025/7/3 11:08:28",
    author: "张三",
  },
]

export default function DocumentViewer() {
  const [documentComments, setDocumentComments] = useState(initialComments)
  const [noSelectionDialogOpen, setNoSelectionDialogOpen] = useState(false)
  const [commentInputVisible, setCommentInputVisible] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [selectedText, setSelectedText] = useState("")
  const [commentPosition, setCommentPosition] = useState({ top: 0, left: 0 })
  const documentRef = useRef<HTMLDivElement>(null)
  const [regenerateDialogOpen, setRegenerateDialogOpen] = useState(false)
  const [regenerateText, setRegenerateText] = useState("")

  const handleCommentButtonClick = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString()
      setSelectedText(selectedText)

      // 获取选中文本的位置
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const documentRect = documentRef.current?.getBoundingClientRect()

      if (documentRect) {
        setCommentPosition({
          top: rect.bottom - documentRect.top + 10,
          left: rect.left - documentRect.left,
        })
      }

      setCommentInputVisible(true)
      selection.removeAllRanges() // 清除选择
    } else {
      setNoSelectionDialogOpen(true)
    }
  }

  const handleAddComment = () => {
    if (commentText.trim() && selectedText.trim()) {
      const newComment = {
        id: Date.now(),
        text: selectedText,
        comment: commentText,
        timestamp: new Date().toLocaleString(),
        author: "张三",
      }
      setDocumentComments([...documentComments, newComment])
      setCommentText("")
      setCommentInputVisible(false)
      setSelectedText("")
    }
  }

  const handleRegenerateSection = (sectionText: string) => {
    setRegenerateText(sectionText)
    setRegenerateDialogOpen(true)
  }

  const handleRegenerateClick = (paragraph: string) => {
    setRegenerateText(paragraph)
    setRegenerateDialogOpen(true)
  }

  const handleConfirmRegenerate = () => {
    // 这里可以添加实际的重新生成逻辑
    {/*
    console.log(`正在重新生成选中段落：\n"${regenerateText.substring(0, 50)}..."`)
    setRegenerateDialogOpen(false)
    setRegenerateText("")
*/}
       setIsRegenerating(true)

    // 模拟异步重生成逻辑
    console.log(`正在重新生成选中段落：\n"${regenerateText.substring(0, 50)}..."`)
    await new Promise((r) => setTimeout(r, 1500)) // 模拟异步

    setIsRegenerating(false)
    setRegenerateDialogOpen(false)
    setRegenerateText("")
  }

  // 点击文档区域外关闭评论输入框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commentInputVisible && documentRef.current && !documentRef.current.contains(event.target as Node)) {
        setCommentInputVisible(false)
        setCommentText("")
        setSelectedText("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [commentInputVisible])

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="/projects/1">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">{documentData.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">生成时间: {documentData.generateTime}</span>
          </div>
        </div>
      </header>

      {/* 主体内容区域 - 左右布局 */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* 左侧文档内容区域 */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* 工具栏 */}
            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                下载PDF
              </Button>

              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                重新生成
              </Button>
              <div className="ml-auto">
                <Button variant="outline" size="sm" onClick={handleCommentButtonClick}>
                  评论
                </Button>
              </div>
            </div>

            {/* 文档内容区域 */}
            <div ref={documentRef} className="relative border rounded-lg p-8 bg-white shadow-sm">
              {/* 动态评论输入框 */}
              {commentInputVisible && (
                <div
                  className="absolute z-10 w-80 p-4 border rounded-lg bg-blue-50 shadow-lg"
                  style={{
                    top: commentPosition.top,
                    left: Math.min(commentPosition.left, window.innerWidth - 350), // 防止��出屏幕
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">添加评论</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => {
                          setCommentInputVisible(false)
                          setCommentText("")
                          setSelectedText("")
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium">选中的文本：</label>
                      <p className="text-sm border rounded p-2 bg-white mt-1 max-h-20 overflow-y-auto">
                        "{selectedText.substring(0, 100)}
                        {selectedText.length > 100 ? "..." : ""}"
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">评论内容：</label>
                      <textarea
                        className="w-full mt-1 p-2 border rounded-md text-sm"
                        rows={3}
                        placeholder="请输入您的评论..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleAddComment}>
                        添加评论
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCommentInputVisible(false)
                          setCommentText("")
                          setSelectedText("")
                        }}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* 文档正文内容 */}
              <div className="space-y-4 text-sm leading-relaxed">
                {documentData.content.split("\n\n").map((paragraph: string, index: number) => (
                  <div key={index} className="paragraph-item hover:bg-yellow-50 p-2 rounded relative group">
                    <p className="whitespace-pre-line">{paragraph}</p>
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRegenerateClick(paragraph)
                        }}
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧评论区域 */}
        <div className="w-80 border-l bg-gray-50 p-4">
          <div className="space-y-4 h-full">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">评论 ({documentComments.length})</h4>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1">
              {documentComments.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <p className="text-sm">暂无评论</p>
                  <p className="text-xs mt-1">选择文本后点击"评论"按钮添加评论</p>
                </div>
              ) : (
                documentComments.map((comment) => (
                  <div key={comment.id} className="p-3 border rounded-lg bg-white">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-600">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <div className="text-xs bg-gray-50 p-2 rounded border">
                        <span className="text-muted-foreground">引用：</span>"{comment.text.substring(0, 50)}
                        {comment.text.length > 50 ? "..." : ""}"
                      </div>
                      <div className="text-sm">{comment.comment}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 底部操作按钮 */}
            <div className="pt-4 border-t">
              <Button className="w-full gap-2">
                <Save className="h-4 w-4" />
                保存文档
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 未选择文本提示对话框 */}
      <Dialog open={noSelectionDialogOpen} onOpenChange={setNoSelectionDialogOpen}>
        <DialogContent className="max-w-md" aria-describedby="no-selection-description">
          <DialogHeader>
            <DialogTitle>提示</DialogTitle>
          </DialogHeader>
          <div className="py-4" id="no-selection-description">
            <p className="text-sm text-muted-foreground">请先选择要评论的文本内容，然后再点击评论按钮。</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setNoSelectionDialogOpen(false)}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

 <button onClick={() => setRegenerateDialogOpen(true)}>重新生成</button>

      <Dialog open={regenerateDialogOpen} onOpenChange={setRegenerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认重新生成？</DialogTitle>
          </DialogHeader>

          <div className="text-sm text-gray-600 whitespace-pre-wrap">
            {regenerateText || "未选择任何段落"}
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setRegenerateDialogOpen(false)}
              className="px-3 py-1 rounded border"
            >
              取消
            </button>

            <button
              onClick={handleRegenerate}
              className="px-3 py-1 rounded bg-black text-white"
              disabled={isRegenerating}
            >
              {isRegenerating ? "生成中..." : "确认生成"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
      

      
    </div>
  )
}
