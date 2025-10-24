"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Download, MessageSquare, RefreshCw, FileText, Calendar, User, Plus } from "lucide-react"
import { TopNavigation } from "@/components/top-navigation"

// 外联单文档数据 - 基于提供的图片1:1还原
const documentData = {
  title: "中央预算内资金项目联系函",
  projectName: "南昌市新建区蛋鸡养殖基地建设项目",
  buildingLocation: "南昌市新建区西山镇石堎村",
  contact: "雷政权",
  contactMethod: "13870074010",
  currentRound: "第___稿",
  applicant: "新建区国控集团",
  leadingUnit: "中央预算内商务工具第一版0116(3)) method",

  // 投资信息
  investmentInfo: {
    totalInvestment: "43000", // 万元
    similarProject: "",
    fundingDemand: "34000", // 万元
    capitalRatio: "待续，需确认各注没写支持比例的。",
    ownCapital: "", // 万元
    investmentPlan: {
      year1: "?",
      year2: "?",
      year3: "?",
    },
  },

  // 申报材料清单
  applicationMaterials: {
    applicationSummary: "✓",
    materialList: "✓",
    intentionReply: "✓",
    mainBodyDialog: "✓",
    projectApproval: "✓",
    landUsePermit: "✓",
    environmentalApproval: "✓",
    constructionPermit: "✓",
    buildingPermit: "✓",
    researchApproval: "✓",
    environmentalBatch: "✓",
    conceptualApproval: "✓",
    waterConservationApproval: "✓",
    fundingApplicationReport: "✓",
    stabilityApproval: "✓",
    threePlans: "✓",
    fireEquipmentList: "✓",
    personnelPlan: "✓",
    constructionApplicationPlan: "✓",
    landReport: "✓",
    tenderDrawings: "✓",
    materialReport: "✓",
    financialSituation: "✓",
    energySavingApproval: "✓",
    constructionPeriod: "2025年6月-2026年5月",
    startTime: "2025年6月30日",
    completionTime: "2026年5月30日",
    currentPhotos: "✓",
  },

  // 补贴文件
  subsidyDocument: "单位标注为万元的填写金额，标注为文号的，填写文号，未办理的与其他未标注的单位的填写时间要求",

  // 建设内容及规模
  constructionContent:
    "本项目拟建设占地面积约287亩，含建筑面积约2000平方米，项目建设内容为建设160万羽蛋鸡及40万羽育雏智慧养殖基地，配套建设综合楼、管理楼、饲养系统、饮水系统、集蛋系统、清粪系统、环控系统等。",

  backgroundNote: "",

  // 现状
  currentStatus: {
    nature: "新建", // 新建/改扩建/提升改造
    projectNature: "来自《内联单》的项目性质",
    engineeringReality: "",
  },

  // 项目困难
  projectDifficulties: "来自《内联单》的项目难点",

  // 建设内容及规模
  constructionContentScale: "同专项债逻辑",

  // 亿科建议
  yikeAdvice: "",

  // 工作安排下一步指标
  workArrangement: {
    projectDirection: "准备报批前相关资料，以便后续申报资金。",
    timeline: {
      applicationDeadline: "___年___月___日",
      recommendedTime: "___年___月___日",
      availableTime: "___年___月___日",
    },
  },

  // 本案价格
  casePrice: "",
  contractTargetPoints: "",
  paymentMethod: "",

  // 备注
  notes: `
本项目属于地方政府、主体单位、实施单位选择的项目，立项程序按政府文件要求，资金由中央投资。
项目建设单位为新建区国控集团，项目实施单位为新建区国控集团。
项目建设内容：亿科确保了7个工程的投资基本项目，项目建设内容（可行性研究报告）原则，经费包括人员费用，资本项目工程费。
项目建设期：2025年6月-2026年5月。
项目总投资：43000万元，申请中央预算内投资34000万元，地方配套资金9000万元，资金来源一次，按政府分配要求进行0.8，民政一般预算。
项目建设内容0.8%次数人员配置情况。
项目建设单位为新建区国控集团（统一社会信用代码：91360112MA35KBXD04），项目建设单位中央预算内资金申请单位。
项目建设单位为新建区国控集团（统一社会信用代码：91360112MA35KBXD04）。
本《联系函》由亿科方负责工程的监督，以确保一定时间的监督监察，项目建设单位要求监督监察。
项目建设单位要求监督监察，项目建设单位要求监督监察。
  `,

  // 签名信息
  signatures: {
    projectManager: {
      inputPerson: "（盖章）：",
      confirmTime: "",
      confirmLocation: "",
    },
    yikeManager: {
      manager: "经办人：",
      totalPoint: "",
      businessUnit: "",
      signTime: "",
      businessManager: "",
      generalManager: "",
    },
  },
}

// 评论数据结构
interface Comment {
  id: number
  author: string
  avatar: string
  time: string
  content: string
  selectedText: string
  replies: Reply[]
  textId: string // 用于标识被评论的文本
}

interface Reply {
  id: number
  author: string
  avatar: string
  time: string
  content: string
}

// 文本选择相关的接口
interface TextSelection {
  text: string
  range: Range
  rect: DOMRect
}

// 高亮文本组件
const HighlightedText = ({
  children,
  comment,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode
  comment: Comment
  onMouseEnter: (comment: Comment, event: React.MouseEvent) => void
  onMouseLeave: () => void
}) => (
  <span
    className="bg-yellow-200 cursor-pointer px-1 rounded relative"
    onMouseEnter={(e) => onMouseEnter(comment, e)}
    onMouseLeave={onMouseLeave}
    title={`评论: ${comment.content}`}
  >
    {children}
  </span>
)

// 可评论文本组件
const CommentableText = ({
  text,
  textId,
  comments,
  onMouseEnter,
  onMouseLeave,
}: {
  text: string
  textId: string
  comments: Comment[]
  onMouseEnter: (comment: Comment, event: React.MouseEvent) => void
  onMouseLeave: () => void
}) => {
  const comment = comments.find((c) => c.textId === textId)

  if (comment) {
    return (
      <HighlightedText comment={comment} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {text}
      </HighlightedText>
    )
  }

  return <>{text}</>
}

export default function WailianDanViewer() {
  const [regenerateDialogOpen, setRegenerateDialogOpen] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regeneratingCells, setRegeneratingCells] = useState<Set<string>>(new Set())

  // 文本选择和评论相关状态
  const [selectedText, setSelectedText] = useState<TextSelection | null>(null)
  const [showCommentButton, setShowCommentButton] = useState(false)
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [hoveredComment, setHoveredComment] = useState<Comment | null>(null)
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 })
  const [showPopover, setShowPopover] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const documentRef = useRef<HTMLDivElement>(null)

  // 处理文本选择
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().trim() && selection.rangeCount > 0 && documentRef.current) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        // 检查选择是否在文档区域内
        if (documentRef.current.contains(range.commonAncestorContainer)) {
          setSelectedText({
            text: selection.toString().trim(),
            range: range.cloneRange(),
            rect,
          })
          setShowCommentButton(true)
        }
      } else {
        setShowCommentButton(false)
        setSelectedText(null)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      // 如果点击的不是评论按钮，则隐藏按钮
      const target = e.target as HTMLElement
      if (!target.closest("[data-comment-button]")) {
        setTimeout(() => {
          const selection = window.getSelection()
          if (!selection || !selection.toString().trim()) {
            setShowCommentButton(false)
            setSelectedText(null)
          }
        }, 100)
      }
    }

    document.addEventListener("mouseup", handleSelection)
    document.addEventListener("keyup", handleSelection)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("mouseup", handleSelection)
      document.removeEventListener("keyup", handleSelection)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // 单个格子重新生成函数
  const handleCellRegenerate = (cellId: string) => {
    setRegeneratingCells((prev) => new Set([...prev, cellId]))

    // 模拟重新生成过程
    setTimeout(() => {
      setRegeneratingCells((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cellId)
        return newSet
      })
      // 这里可以更新对应格子的内容
    }, 2000)
  }

  // 添加评论
  const handleAddComment = () => {
    if (newComment.trim() && selectedText) {
      const textId = `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const comment: Comment = {
        id: Date.now(),
        author: "当前用户",
        avatar: "/placeholder.svg?height=32&width=32",
        time: new Date().toLocaleString("zh-CN"),
        content: newComment,
        selectedText: selectedText.text,
        replies: [],
        textId: textId,
      }

      setComments([...comments, comment])
      setNewComment("")
      setCommentDialogOpen(false)
      setShowCommentButton(false)
      setSelectedText(null)

      // 清除选择
      window.getSelection()?.removeAllRanges()
    }
  }

  // 添加回复
  const handleAddReply = (commentId: number) => {
    if (replyContent.trim()) {
      const reply: Reply = {
        id: Date.now(),
        author: "当前用户",
        avatar: "/placeholder.svg?height=32&width=32",
        time: new Date().toLocaleString("zh-CN"),
        content: replyContent,
      }

      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
        ),
      )
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  // 处理鼠标悬停
  const handleMouseEnter = (comment: Comment, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPopoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
    setHoveredComment(comment)
    setShowPopover(true)
  }

  const handleMouseLeave = () => {
    // 延迟隐藏，给用户时间移动到popover上
    setTimeout(() => {
      setShowPopover(false)
      setHoveredComment(null)
      setReplyingTo(null)
      setReplyContent("")
    }, 200)
  }

  // 重新生成
  const handleRegenerate = () => {
    setIsRegenerating(true)
    setRegenerateDialogOpen(false)

    // 模拟重新生成过程
    setTimeout(() => {
      setIsRegenerating(false)
      // 这里可以更新文档内容
    }, 3000)
  }

  // 下载文档
  const handleDownload = () => {
    // 模拟下载
    const element = document.createElement("a")
    const file = new Blob(
      [
        `${documentData.title}\n\n项目名称：${documentData.projectName}\n建设地点：${documentData.buildingLocation}\n...`,
      ],
      { type: "text/plain" },
    )
    element.href = URL.createObjectURL(file)
    element.download = `${documentData.projectName}_外联单.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavigation currentPath="/wailiandan-viewer" />

      <div className="h-[calc(100vh-4rem)] overflow-auto">
        <div className="p-6 max-w-4xl mx-auto">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                返回项目详情
              </Button>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{documentData.title}</h1>
                  {isRegenerating && (
                    <Badge variant="outline" className="text-blue-600 border-blue-300 animate-pulse">
                      重新生成中...
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>外联单文档</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>生成时间: 2024-07-08 16:30</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>生成人: 张三</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  下载文档
                </Button>
              </div>
            </div>
          </div>

          {/* 文档内容 */}
          <Card>
            <CardContent className="p-0">
              <div ref={documentRef} className="relative">
                {/* 外联单表格 - 1:1还原图片内容 */}
                <div className="border border-gray-300">
                  {/* 标题 */}
                  <div className="bg-gray-100 border-b border-gray-300 p-4 text-center">
                    <h2 className="text-xl font-bold">
                      <CommentableText
                        text={documentData.title}
                        textId="title"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </h2>
                  </div>

                  {/* 基本信息行 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      城市
                    </div>
                    <div className="col-span-5 border-r border-gray-300 p-2 bg-gray-50 relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("city")}
                        disabled={regeneratingCells.has("city")}
                      >
                        {regeneratingCells.has("city") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      本次第___稿
                    </div>
                    <div className="col-span-4 p-2 bg-gray-50 relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("draft")}
                        disabled={regeneratingCells.has("draft")}
                      >
                        {regeneratingCells.has("draft") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      项目名称
                    </div>
                    <div className="col-span-5 border-r border-gray-300 p-2 bg-gray-50 relative group">
                      <CommentableText
                        text={documentData.projectName}
                        textId="projectName"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("projectName")}
                        disabled={regeneratingCells.has("projectName")}
                      >
                        {regeneratingCells.has("projectName") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      申报主体
                    </div>
                    <div className="col-span-4 p-2 bg-gray-50 relative group">
                      <CommentableText
                        text={documentData.applicant}
                        textId="applicant"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("applicant")}
                        disabled={regeneratingCells.has("applicant")}
                      >
                        {regeneratingCells.has("applicant") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      建设地址
                    </div>
                    <div className="col-span-5 border-r border-gray-300 p-2 bg-gray-50 relative group">
                      <CommentableText
                        text={documentData.buildingLocation}
                        textId="buildingLocation"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("buildingLocation")}
                        disabled={regeneratingCells.has("buildingLocation")}
                      >
                        {regeneratingCells.has("buildingLocation") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      所属领域
                    </div>
                    <div className="col-span-4 p-2 bg-gray-50 text-xs relative group">
                      <CommentableText
                        text={documentData.leadingUnit}
                        textId="leadingUnit"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("leadingUnit")}
                        disabled={regeneratingCells.has("leadingUnit")}
                      >
                        {regeneratingCells.has("leadingUnit") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      联系人
                    </div>
                    <div className="col-span-5 border-r border-gray-300 p-2 bg-gray-50 relative group">
                      <CommentableText
                        text={documentData.contact}
                        textId="contact"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("contact")}
                        disabled={regeneratingCells.has("contact")}
                      >
                        {regeneratingCells.has("contact") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      联系方式
                    </div>
                    <div className="col-span-4 p-2 bg-gray-50 relative group">
                      <CommentableText
                        text={documentData.contactMethod}
                        textId="contactMethod"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("contactMethod")}
                        disabled={regeneratingCells.has("contactMethod")}
                      >
                        {regeneratingCells.has("contactMethod") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 投资信息表格 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      投资总额
                      <br />
                      (万元)
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      同类项目
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      资金需求
                      <br />
                      (万元)
                    </div>
                    <div className="col-span-2 bg-yellow-100 border-r border-gray-300 p-2 text-xs font-medium flex items-center justify-center">
                      待续，需确认
                      <br />
                      各注没写支持
                      <br />
                      比例的。
                    </div>
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      资本金(万
                      <br />
                      元)
                    </div>
                    <div className="col-span-1 bg-blue-100 p-2 text-sm font-medium flex items-center justify-center">
                      投资计划
                      <br />
                      (万元)
                    </div>
                  </div>

                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50 text-center relative group">
                      <CommentableText
                        text={documentData.investmentInfo.totalInvestment}
                        textId="totalInvestment"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("totalInvestment")}
                        disabled={regeneratingCells.has("totalInvestment")}
                      >
                        {regeneratingCells.has("totalInvestment") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50 relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("similarProject")}
                        disabled={regeneratingCells.has("similarProject")}
                      >
                        {regeneratingCells.has("similarProject") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50 text-center relative group">
                      <CommentableText
                        text={documentData.investmentInfo.fundingDemand}
                        textId="fundingDemand"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("fundingDemand")}
                        disabled={regeneratingCells.has("fundingDemand")}
                      >
                        {regeneratingCells.has("fundingDemand") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50 relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("ownCapital")}
                        disabled={regeneratingCells.has("ownCapital")}
                      >
                        {regeneratingCells.has("ownCapital") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-1 border-r border-gray-300 p-2 bg-gray-50 relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("capitalFund")}
                        disabled={regeneratingCells.has("capitalFund")}
                      >
                        {regeneratingCells.has("capitalFund") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-1 p-2 bg-gray-50 relative group">
                      <div className="text-xs space-y-1">
                        <div>第一年: {documentData.investmentInfo.investmentPlan.year1}</div>
                        <div>第二年: {documentData.investmentInfo.investmentPlan.year2}</div>
                        <div>第三年: {documentData.investmentInfo.investmentPlan.year3}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("investmentPlan")}
                        disabled={regeneratingCells.has("investmentPlan")}
                      >
                        {regeneratingCells.has("investmentPlan") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 申报材料表格 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      申报汇总
                      <br />表
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      单行材料
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      意见回复
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      主体三承
                      <br />诺
                    </div>
                    <div className="col-span-5 bg-blue-100 p-2 text-sm font-medium flex items-center justify-center">
                      其他材料
                    </div>
                  </div>

                  {/* 材料清单详细行 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      立项批复
                      <br />
                      (文号)
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      用地审批
                      <br />
                      (文号)
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      环评审批
                      <br />
                      (文号)
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      施工许可
                      <br />
                      (号)
                    </div>
                    <div className="col-span-3 bg-blue-100 p-2 text-sm font-medium flex items-center justify-center">
                      其他相关材料
                    </div>
                  </div>

                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      建规证
                      <br />
                      (文号)
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      可研批复
                      <br />
                      (文号)
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      环评批复
                      <br />
                      (文号)
                    </div>
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      概算批复
                      <br />
                      (文号)
                    </div>
                    <div className="col-span-3 bg-blue-100 p-2 text-sm font-medium flex items-center justify-center">
                      相关材料清单
                    </div>
                  </div>

                  {/* 主体单位提供情况 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-4 text-sm font-medium flex items-center justify-center">
                      主<br />体<br />单<br />位<br />提<br />供<br />情<br />况
                    </div>
                    <div className="col-span-11">
                      <div className="grid grid-cols-11">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          水保批复
                          <br />
                          (文号)
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          资金申请报
                          <br />告
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          稳评批复
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          三图
                        </div>
                        <div className="col-span-3 bg-blue-100 p-2 text-sm font-medium flex items-center justify-center">
                          其他材料
                        </div>
                      </div>
                      <div className="grid grid-cols-11 border-t border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          消防备案
                          <br />
                          案单
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          人防图备案
                          <br />单
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          施工图审备
                          <br />案
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          地勘报告/
                          <br />
                          备案单
                        </div>
                        <div className="col-span-3 bg-blue-100 p-2 text-sm font-medium flex items-center justify-center">
                          相关材料清单
                        </div>
                      </div>
                      <div className="grid grid-cols-11 border-t border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          招标备案
                          <br />
                          合同
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          物料报价/
                          <br />
                          对标合同
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          融资情况
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          节能批复
                        </div>
                        <div className="col-span-3 bg-blue-100 p-2 text-sm font-medium flex items-center justify-center">
                          相关材料清单
                        </div>
                      </div>
                      <div className="grid grid-cols-11 border-t border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          建设周期
                          <br />
                          (年)
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          开工时间
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          完工时间
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                          现场照片
                        </div>
                        <div className="col-span-3 bg-blue-100 p-2 text-sm font-medium flex items-center justify-center">
                          相关材料清单
                        </div>
                      </div>
                      <div className="grid grid-cols-11 border-t border-gray-300">
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50 text-center text-sm relative group">
                          1年
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCellRegenerate("constructionPeriod")}
                            disabled={regeneratingCells.has("constructionPeriod")}
                          >
                            {regeneratingCells.has("constructionPeriod") ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50 text-center text-sm relative group">
                          2025年6月
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCellRegenerate("startTime")}
                            disabled={regeneratingCells.has("startTime")}
                          >
                            {regeneratingCells.has("startTime") ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50 text-center text-sm relative group">
                          2026年5月
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCellRegenerate("completionTime")}
                            disabled={regeneratingCells.has("completionTime")}
                          >
                            {regeneratingCells.has("completionTime") ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50 text-center text-sm relative group">
                          ✓
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCellRegenerate("currentPhotos")}
                            disabled={regeneratingCells.has("currentPhotos")}
                          >
                            {regeneratingCells.has("currentPhotos") ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div className="col-span-3 p-2 bg-gray-50 relative group">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCellRegenerate("otherMaterials")}
                            disabled={regeneratingCells.has("otherMaterials")}
                          >
                            {regeneratingCells.has("otherMaterials") ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 补贴文件 */}
                  <div className="border-b border-gray-300 p-3 bg-gray-50 relative group">
                    <div className="text-sm">
                      <strong>补贴文件：</strong>
                      <CommentableText
                        text={documentData.subsidyDocument}
                        textId="subsidyDocument"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleCellRegenerate("subsidyDocument")}
                      disabled={regeneratingCells.has("subsidyDocument")}
                    >
                      {regeneratingCells.has("subsidyDocument") ? (
                        <RefreshCw className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                    </Button>
                  </div>

                  {/* 建设内容及规模 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium">
                      建设内容及规模（务必以真实内容呈现）：
                      <br />
                      <span className="text-red-600">同专项债</span>
                    </div>
                    <div className="col-span-7 border-r border-gray-300 p-2 bg-gray-50 text-sm relative group">
                      <CommentableText
                        text={documentData.constructionContent}
                        textId="constructionContent"
                        comments={comments}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("constructionContent")}
                        disabled={regeneratingCells.has("constructionContent")}
                      >
                        {regeneratingCells.has("constructionContent") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-3 p-2 bg-gray-50 relative group">
                      <div className="text-sm font-medium mb-2">背景备注：</div>
                      <div className="text-sm text-gray-600">
                        <CommentableText
                          text={documentData.backgroundNote || "暂无备注"}
                          textId="backgroundNote"
                          comments={comments}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("backgroundNote")}
                        disabled={regeneratingCells.has("backgroundNote")}
                      >
                        {regeneratingCells.has("backgroundNote") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 现状 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-4 text-sm font-medium flex items-center justify-center">
                      现<br />状
                    </div>
                    <div className="col-span-11">
                      <div className="p-3 space-y-2">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">性质：</span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                              <input type="checkbox" checked={documentData.currentStatus.nature === "新建"} readOnly />
                              <span className="text-sm">新建</span>
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={documentData.currentStatus.nature === "改扩建"}
                                readOnly
                              />
                              <span className="text-sm">改扩建</span>
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={documentData.currentStatus.nature === "提升改造"}
                                readOnly
                              />
                              <span className="text-sm">提升改造</span>
                            </label>
                          </div>
                        </div>
                        <div className="text-sm">
                          <strong>input: 来自《内联单》的项目性质</strong>
                        </div>
                        <div className="text-sm">
                          <strong>工程真实现状：</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 项目困难 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-4 text-sm font-medium flex items-center justify-center">
                      项<br />目<br />困<br />难
                    </div>
                    <div className="col-span-11 p-3 bg-gray-50 relative group">
                      <div className="text-sm text-red-600">
                        <strong>input: 来自《内联单》的项目难点</strong>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("projectDifficulties")}
                        disabled={regeneratingCells.has("projectDifficulties")}
                      >
                        {regeneratingCells.has("projectDifficulties") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 建设内容及规模 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-4 text-sm font-medium flex items-center justify-center">
                      亿<br />科<br />建<br />议
                    </div>
                    <div className="col-span-11 p-3 bg-gray-50 relative group">
                      <div className="text-sm">
                        <strong>建设内容及规模：</strong>
                        <br />
                        <span className="text-red-600">同专项债逻辑</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("yikeAdvice")}
                        disabled={regeneratingCells.has("yikeAdvice")}
                      >
                        {regeneratingCells.has("yikeAdvice") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 工作安排下一步指标 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-4 text-sm font-medium flex items-center justify-center">
                      工<br />作<br />安<br />排<br />下<br />一<br />步<br />指<br />标
                    </div>
                    <div className="col-span-7 border-r border-gray-300 p-3 bg-gray-50 relative group">
                      <div className="text-sm">
                        <strong>项目方：</strong>
                        <br />
                        <CommentableText
                          text={documentData.workArrangement.projectDirection}
                          textId="projectDirection"
                          comments={comments}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("projectDirection")}
                        disabled={regeneratingCells.has("projectDirection")}
                      >
                        {regeneratingCells.has("projectDirection") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="col-span-4 p-3 bg-gray-50 relative group">
                      <div className="text-sm">
                        <strong>亿科方时间计划：</strong>（<span className="text-red-600">同专项债</span>）<br />
                        <div className="space-y-1 mt-2">
                          <div>1. 报价截：{documentData.workArrangement.timeline.applicationDeadline}</div>
                          <div>2. 建议方：{documentData.workArrangement.timeline.recommendedTime}</div>
                          <div>3. 可研：{documentData.workArrangement.timeline.availableTime}</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("timeline")}
                        disabled={regeneratingCells.has("timeline")}
                      >
                        {regeneratingCells.has("timeline") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 价格信息 */}
                  <div className="grid grid-cols-12 border-b border-gray-300">
                    <div className="col-span-3 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      本案价格
                    </div>
                    <div className="col-span-3 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      合同目标节点
                    </div>
                    <div className="col-span-3 bg-blue-100 border-r border-gray-300 p-2 text-sm font-medium flex items-center justify-center">
                      付款方式
                    </div>
                    <div className="col-span-3 p-2 bg-gray-50 relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("casePrice")}
                        disabled={regeneratingCells.has("casePrice")}
                      >
                        {regeneratingCells.has("casePrice") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 备注 */}
                  <div className="border-b border-gray-300 p-4 bg-gray-50 relative group">
                    <div className="text-sm">
                      <strong>备注：</strong>
                      <div className="mt-2 whitespace-pre-line text-xs leading-relaxed">
                        <CommentableText
                          text={documentData.notes}
                          textId="notes"
                          comments={comments}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleCellRegenerate("notes")}
                      disabled={regeneratingCells.has("notes")}
                    >
                      {regeneratingCells.has("notes") ? (
                        <RefreshCw className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                    </Button>
                  </div>

                  {/* 签名区域 */}
                  <div className="grid grid-cols-2">
                    <div className="border-r border-gray-300 p-4 bg-gray-50 relative group">
                      <div className="text-sm space-y-2">
                        <div>
                          <strong>项目方：</strong>输入人（盖章）：___________
                        </div>
                        <div>
                          <strong>确认时间：</strong>___________
                        </div>
                        <div>
                          <strong>确认地点：</strong>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("projectSignature")}
                        disabled={regeneratingCells.has("projectSignature")}
                      >
                        {regeneratingCells.has("projectSignature") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="p-4 bg-gray-50 relative group">
                      <div className="text-sm space-y-2">
                        <div>
                          <strong>亿科方：</strong>经办人：___________
                        </div>
                        <div>
                          <strong>总点：</strong>___________
                        </div>
                        <div>
                          <strong>事业副总：</strong>___________
                        </div>
                        <div>
                          <strong>签发时间：</strong>
                        </div>
                        <div>
                          <strong>事业总经理：</strong>___________
                        </div>
                        <div>
                          <strong>经营部：</strong>___________
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCellRegenerate("yikeSignature")}
                        disabled={regeneratingCells.has("yikeSignature")}
                      >
                        {regeneratingCells.has("yikeSignature") ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 文本选择后的评论按钮 */}
                {showCommentButton && selectedText && (
                  <div
                    data-comment-button
                    className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-2"
                    style={{
                      left: selectedText.rect.left + selectedText.rect.width / 2 - 50,
                      top: selectedText.rect.bottom + 10,
                    }}
                  >
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setCommentDialogOpen(true)
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      添加评论
                    </Button>
                  </div>
                )}

                {/* 悬停显示评论内容 */}
                {showPopover && hoveredComment && (
                  <div
                    className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80"
                    style={{
                      left: popoverPosition.x - 160, // 居中显示
                      top: popoverPosition.y - 10,
                      transform: "translateY(-100%)",
                    }}
                    onMouseEnter={() => setShowPopover(true)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={hoveredComment.avatar || "/placeholder.svg"}
                          alt={hoveredComment.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{hoveredComment.author}</span>
                            <span className="text-xs text-gray-500">{hoveredComment.time}</span>
                          </div>
                          <div className="text-xs text-gray-600 mb-2 bg-gray-100 p-2 rounded">
                            选中文本: "{hoveredComment.selectedText}"
                          </div>
                          <p className="text-sm text-gray-700">{hoveredComment.content}</p>
                        </div>
                      </div>

                      {/* 回复列表 */}
                      {hoveredComment.replies.map((reply) => (
                        <div key={reply.id} className="ml-8 flex gap-3">
                          <img
                            src={reply.avatar || "/placeholder.svg"}
                            alt={reply.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-xs">{reply.author}</span>
                              <span className="text-xs text-gray-500">{reply.time}</span>
                            </div>
                            <p className="text-xs text-gray-700">{reply.content}</p>
                          </div>
                        </div>
                      ))}

                      {/* 追评输入框 */}
                      {replyingTo === hoveredComment.id ? (
                        <div className="ml-8 space-y-2">
                          <Textarea
                            placeholder="请输入回复..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            rows={2}
                            className="resize-none text-sm"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddReply(hoveredComment.id)}
                              disabled={!replyContent.trim()}
                            >
                              回复
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null)
                                setReplyContent("")
                              }}
                            >
                              取消
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="ml-8">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 h-6 px-2 text-xs"
                            onClick={() => setReplyingTo(hoveredComment.id)}
                          >
                            <Plus className="h-3 w-3" />
                            追评
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 添加评论对话框 */}
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加评论</DialogTitle>
            <DialogDescription>对选中文本添加评论: "{selectedText?.text}"</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="请输入您的评论..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAddComment} disabled={!newComment.trim()}>
              添加评论
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 重新生成确认对话框 */}
      <Dialog open={regenerateDialogOpen} onOpenChange={setRegenerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>重新生成外联单</DialogTitle>
            <DialogDescription>确定要重新生成外联单吗？这将覆盖当前内容。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegenerateDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleRegenerate}>确认重新生成</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
