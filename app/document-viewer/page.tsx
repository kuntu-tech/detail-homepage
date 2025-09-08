"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Download, Edit, RefreshCw, FileText, X, Check } from "lucide-react"

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
资金需求34000万元

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

6. 配套基础设施
建设办公楼、宿舍、道路、绿化等配套设施，完善项目功能配套。

项目效益分析：
项目建成后，年产鸡蛋约4万吨，年产值预计达到3.2亿元。同时可带动当地就业300余人，对促进当地农业产业化发展、增加农民收入具有重要意义。

项目符合国家产业政策和地方发展规划，建议予以支持。

                                    新建区发展和改革委员会
  ${new Date().toLocaleDateString()}`,
  pdfUrl: "/documents/liaison-letter.pdf",
}

// 初始评论数据
const initialComments = [
  {
    id: 1,
    text: "设160万羽蛋鸡及40万羽育雏智养殖基地",
    comment: "建议补充具体的养殖技术方案和设备配置清单",
    timestamp: "2025/7/3 11:08:28",
    author: "张三",
    resolved: false,
    replies: [],
  },
]

export default function DocumentViewer() {
  const [documentComments, setDocumentComments] = useState(initialComments)
  const [noSelectionDialogOpen, setNoSelectionDialogOpen] = useState(false)
  const [regenerateDialogOpen, setRegenerateDialogOpen] = useState(false)
  const [regenerateText, setRegenerateText] = useState("")
  const [commentInputVisible, setCommentInputVisible] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [selectedText, setSelectedText] = useState("")
  const [commentPosition, setCommentPosition] = useState({ top: 0, left: 0 })
  const documentRef = useRef<HTMLDivElement>(null)
  const [selectionPopup, setSelectionPopup] = useState({ visible: false, top: 0, left: 0 })
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [hoverCommentId, setHoverCommentId] = useState<number | null>(null)
  const [hoverReplyText, setHoverReplyText] = useState("")
  const [showHoverReplyInput, setShowHoverReplyInput] = useState<number | null>(null)

  const handleCommentButtonClick = () => {
    setSelectionPopup({ visible: false, top: 0, left: 0 })
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
        resolved: false,
        replies: [],
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

  const handleConfirmRegenerate = () => {
    // 这里可以添加实际的重新生成逻辑
    console.log("正在重新生成段落:", regenerateText.substring(0, 50) + "...")
    setRegenerateDialogOpen(false)
    setRegenerateText("")
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const documentRect = documentRef.current?.getBoundingClientRect()

      if (documentRect) {
        setSelectionPopup({
          visible: true,
          top: rect.bottom - documentRect.top + 10,
          left: rect.left - documentRect.left,
        })
      }
    } else {
      setSelectionPopup({ visible: false, top: 0, left: 0 })
    }
  }

  // 点击文档区域外关闭评论输入框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // 处理评论输入框
      if (
        (commentInputVisible || selectionPopup.visible) &&
        documentRef.current &&
        !documentRef.current.contains(target)
      ) {
        setCommentInputVisible(false)
        setCommentText("")
        setSelectedText("")
        setSelectionPopup({ visible: false, top: 0, left: 0 })
      }

      // 处理hover评论框
      if (
        hoverCommentId !== null &&
        !target.closest('[id^="comment-hover-"]') &&
        !target.classList.contains("comment-highlight")
      ) {
        setHoverCommentId(null)
        const hoverElement = document.getElementById(`comment-hover-${hoverCommentId}`)
        if (hoverElement) {
          hoverElement.classList.remove("opacity-100", "pointer-events-auto")
          hoverElement.classList.add("opacity-0", "pointer-events-none")
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [commentInputVisible, selectionPopup.visible, hoverCommentId])

  const handleToggleResolved = (commentId: number) => {
    setDocumentComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, resolved: !comment.resolved } : comment)),
    )
  }

  const handleAddReply = (commentId: number) => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        comment: replyText,
        timestamp: new Date().toLocaleString(),
        author: "张三",
      }

      setDocumentComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, replies: [...(comment.replies || []), newReply] } : comment,
        ),
      )

      setReplyText("")
      setReplyingTo(null)
    }
  }

  const handleCommentHover = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.classList.contains("comment-highlight")) {
      const commentId = target.getAttribute("data-comment-id")
      if (commentId) {
        setHoverCommentId(Number.parseInt(commentId))
        const hoverElement = document.getElementById(`comment-hover-${commentId}`)
        if (hoverElement) {
          const rect = target.getBoundingClientRect()
          hoverElement.style.left = `${Math.min(rect.right + 10, window.innerWidth - 340)}px`
          hoverElement.style.top = `${rect.top}px`
          hoverElement.classList.remove("opacity-0", "pointer-events-auto")
          hoverElement.classList.add("opacity-100", "pointer-events-auto")
        }
      }
    }
  }

  const handleCommentLeave = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const relatedTarget = event.relatedTarget as HTMLElement

    // 如果鼠标移动到hover评论框内，不隐藏
    if (relatedTarget && relatedTarget.closest('[id^="comment-hover-"]')) {
      return
    }

    if (target.classList.contains("comment-highlight")) {
      const commentId = target.getAttribute("data-comment-id")
      if (commentId) {
        setTimeout(() => {
          const hoverElement = document.getElementById(`comment-hover-${commentId}`)
          if (hoverElement && !hoverElement.matches(":hover")) {
            setHoverCommentId(null)
            hoverElement.classList.remove("opacity-100", "pointer-events-auto")
            hoverElement.classList.add("opacity-0", "pointer-events-none")
          }
        }, 100)
      }
    }
  }

  const handleAddHoverReply = (commentId: number) => {
    if (hoverReplyText.trim()) {
      const newReply = {
        id: Date.now(),
        comment: hoverReplyText,
        timestamp: new Date().toLocaleString(),
        author: "张三",
      }

      setDocumentComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, replies: [...(comment.replies || []), newReply] } : comment,
        ),
      )

      setHoverReplyText("")
      setShowHoverReplyInput(null)
    }
  }

  useEffect(() => {
    document.addEventListener("mouseover", handleCommentHover)
    document.addEventListener("mouseout", handleCommentLeave)

    return () => {
      document.removeEventListener("mouseover", handleCommentHover)
      document.removeEventListener("mouseout", handleCommentLeave)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <style jsx>{`
  .comment-highlight {
    background-color: #fef3c7;
    border-bottom: 2px solid #f59e0b;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .comment-highlight:hover {
    background-color: #fde68a;
  }
`}</style>
      {/* 顶部导航栏 */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="/projects/001">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">{documentData.title}</h1>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent ml-4">
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">生成时间: {documentData.generateTime}</span>
          </div>
        </div>
      </header>

      {/* 主体内容区域 - 左右布局 */}
      <div className="h-[calc(100vh-4rem)]">
        {/* 文档内容区域 */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* 文档内容区域 */}
            <div
              ref={documentRef}
              className="relative border rounded-lg p-8 bg-white shadow-sm"
              onMouseUp={handleTextSelection}
            >
              {/* 选中文本操作弹窗 */}
              {selectionPopup.visible && (
                <div
                  className="absolute z-20 p-2 border rounded-lg bg-white shadow-lg"
                  style={{
                    top: selectionPopup.top,
                    left: Math.min(selectionPopup.left, window.innerWidth - 100),
                  }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCommentButtonClick}
                    className="gap-2 bg-transparent"
                  >
                    <Edit className="h-3 w-3" />
                    评论
                  </Button>
                </div>
              )}
              {/* 动态评论输入框 */}
              {commentInputVisible && (
                <div
                  className="absolute z-10 w-80 p-4 border rounded-lg bg-blue-50 shadow-lg"
                  style={{
                    top: commentPosition.top,
                    left: Math.min(commentPosition.left, window.innerWidth - 350), // 防止超出屏幕
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
                {documentData.content.split("\n\n").map((paragraph: string, index: number) => {
                  // 查找该段落中是否有评论
                  const paragraphComments = documentComments.filter((comment) => paragraph.includes(comment.text))

                  if (paragraphComments.length > 0) {
                    // 如果有评论，需要高亮显示评论文本
                    let highlightedParagraph = paragraph
                    paragraphComments.forEach((comment) => {
                      const commentTextRegex = new RegExp(
                        `(${comment.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                        "gi",
                      )
                      highlightedParagraph = highlightedParagraph.replace(
                        commentTextRegex,
                        `<span class="comment-highlight" data-comment-id="${comment.id}">$1</span>`,
                      )
                    })

                    return (
                      <div
                        key={index}
                        className="paragraph-item hover:bg-yellow-50 p-2 rounded cursor-pointer relative group"
                      >
                        <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: highlightedParagraph }} />
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRegenerateSection(paragraph)
                            }}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div
                      key={index}
                      className="paragraph-item hover:bg-yellow-50 p-2 rounded cursor-pointer relative group"
                    >
                      <p className="whitespace-pre-line">{paragraph}</p>
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRegenerateSection(paragraph)
                          }}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* 评论hover显示 */}
              {documentComments.map((comment) => (
                <div
                  key={`hover-${comment.id}`}
                  id={`comment-hover-${comment.id}`}
                  className="fixed z-50 w-80 p-4 border rounded-lg bg-white shadow-xl opacity-0 pointer-events-none transition-opacity duration-200"
                  style={{ maxWidth: "320px" }}
                  onMouseLeave={(e) => {
                    const relatedTarget = e.relatedTarget as HTMLElement
                    if (
                      !relatedTarget ||
                      (!relatedTarget.classList.contains("comment-highlight") &&
                        !relatedTarget.closest('[id^="comment-hover-"]'))
                    ) {
                      setTimeout(() => {
                        if (!document.getElementById(`comment-hover-${comment.id}`)?.matches(":hover")) {
                          setHoverCommentId(null)
                          const hoverElement = document.getElementById(`comment-hover-${comment.id}`)
                          if (hoverElement) {
                            hoverElement.classList.remove("opacity-100", "pointer-events-auto")
                            hoverElement.classList.add("opacity-0", "pointer-events-none")
                          }
                        }
                      }, 100)
                    }
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-600">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleToggleResolved(comment.id)}
                        title={comment.resolved ? "取消解决" : "标记���解决"}
                      >
                        <Check className={`h-3 w-3 ${comment.resolved ? "text-green-600" : "text-gray-400"}`} />
                      </Button>
                    </div>
                    <div className="text-xs bg-gray-50 p-2 rounded border">
                      <span className="text-muted-foreground">引用：</span>"{comment.text.substring(0, 50)}
                      {comment.text.length > 50 ? "..." : ""}"
                    </div>
                    <div className="text-sm">{comment.comment}</div>

                    {/* 回复列表 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="space-y-2 border-t pt-2">
                        <span className="text-xs font-medium text-gray-600">回复 ({comment.replies.length})</span>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="text-xs bg-blue-50 p-2 rounded">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-blue-600">{reply.author}</span>
                              <span className="text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <div>{reply.comment}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 追加评论输入框 */}
                    <div className="border-t pt-2 space-y-2">
                      {showHoverReplyInput === comment.id ? (
                        <>
                          <textarea
                            className="w-full p-2 border rounded-md text-xs resize-none"
                            rows={2}
                            placeholder="追加评论..."
                            value={hoverReplyText}
                            onChange={(e) => setHoverReplyText(e.target.value)}
                            autoFocus
                          />
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-xs bg-transparent"
                              onClick={() => {
                                setShowHoverReplyInput(null)
                                setHoverReplyText("")
                              }}
                            >
                              取消
                            </Button>
                            <Button
                              size="sm"
                              className="h-6 px-3 text-xs"
                              onClick={() => handleAddHoverReply(comment.id)}
                              disabled={!hoverReplyText.trim()}
                            >
                              确认
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs bg-transparent"
                            onClick={() => setShowHoverReplyInput(comment.id)}
                          >
                            追加评论
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 未选择文本提示对话框 */}
      <Dialog open={noSelectionDialogOpen} onOpenChange={setNoSelectionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>提示</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">请先选择要评论的文本内容，然后再点击评论按钮。</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setNoSelectionDialogOpen(false)}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 重新生成确认对话框 */}
      <Dialog open={regenerateDialogOpen} onOpenChange={setRegenerateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>重新生成段落</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-3">正在重新生成选中段落：</p>
            <div className="text-sm border rounded p-3 bg-gray-50 max-h-32 overflow-y-auto">
              "{regenerateText.substring(0, 100)}
              {regenerateText.length > 100 ? "..." : ""}"
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegenerateDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmRegenerate}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
