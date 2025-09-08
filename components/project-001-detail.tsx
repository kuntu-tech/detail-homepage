"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Circle, Clock, FileText, UploadIcon, DownloadIcon, AlertTriangle, DollarSign, Flag } from 'lucide-react'
import { TopNavigation } from "@/components/top-navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// 项目001的专用数据
const project001Data = {
  id: "001",
  name: "南昌市新建区现代农业产业园建设项目",
  shortName: "南昌农业产业园",
  status: "construction",
  statusText: "建设中",
  priority: "高优先级",
  totalInvestment: "8.5亿元",
  approvedFunding: "6.2亿元",
  location: "南昌市新建区象山镇",
  startDate: "2024-03-15",
  expectedCompletion: "2026-12-30",
  actualProgress: 68,
  description:
    "建设集现代农业生产、农产品加工、冷链物流、科技研发、休闲观光于一体的现代农业产业园，总占地面积3000亩，包括智能温室、加工车间、冷库、科研中心等设施。",

  // 项目负责人和团队
  projectManager: {
    name: "李建国",
    title: "项目总经理",
    phone: "138****1234",
    email: "lijg@example.com",
    avatar: "/placeholder.svg?height=60&width=60",
  },

  team: [
    { name: "王技术", role: "技术总监", department: "技术部", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "张财务", role: "财务总监", department: "财务部", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "刘质量", role: "质量总监", department: "质量部", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "陈安全", role: "安全总监", department: "安全部", avatar: "/placeholder.svg?height=40&width=40" },
  ],

  // 建设内容
  constructionContent: [
    {
      category: "智能温室区",
      area: "800亩",
      investment: "2.1亿元",
      progress: 75,
      status: "建设中",
      description: "建设现代化智能温室50栋，配备自动化灌溉、施肥、环境控制系统",
    },
    {
      category: "加工车间区",
      area: "200亩",
      investment: "1.8亿元",
      progress: 60,
      status: "建设中",
      description: "建设农产品深加工车间，包括清洗、分拣、包装、冷藏等设施",
    },
    {
      category: "冷链物流区",
      area: "150亩",
      investment: "1.5亿元",
      progress: 45,
      status: "建设中",
      description: "建设大型冷库群和物流配送中心，保障农产品储存和运输",
    },
    {
      category: "科研中心区",
      area: "100亩",
      investment: "1.2亿元",
      progress: 80,
      status: "建设中",
      description: "建设农业科技研发中心，包括实验室、育种基地等",
    },
    {
      category: "配套设施区",
      area: "200亩",
      investment: "1.9亿元",
      progress: 55,
      status: "建设中",
      description: "建设办公楼、宿舍、食堂、道路、绿化等配套设施",
    },
  ],

  // 最新动态
  recentUpdates: [
    {
      date: "2024-07-08",
      title: "能温室区建设进展顺利",
      content: "第一批20栋智能温室主体结构已完成，正在进行设备安装调试工作。",
      type: "progress",
    },
    {
      date: "2024-07-05",
      title: "通过环保验收检查",
      content: "项目环保设施建设符合要求，顺利通过市环保局中期检查。",
      type: "approval",
    },
    {
      date: "2024-07-02",
      title: "科研中心设备采购完成",
      content: "农业科技研发中心实验设备采购招标完成，预计本月底安装到位。",
      type: "procurement",
    },
    {
      date: "2024-06-28",
      title: "获得质量安全奖",
      content: "项目获得省建设厅颁发的'安全文明工地'荣誉称号。",
      type: "award",
    },
  ],
}

// 示例文件数据
const exampleFiles = {
  项目可行性研究报告: {
    files: [
      { name: "可行性研究报告模板.pdf", size: "2.3MB" },
      { name: "可行性研究报告示例.docx", size: "1.8MB" },
    ],
    description:
      "项目可行性研究报告应包含项目背景、市场分析、技术方案、投资估算、财务分析、风险评估等内容。报告需要详细论证项目的技术可行性、经济合理性和实施的必要性。",
  },
  发改委可研批复文件: {
    files: [{ name: "发改委批复文件模板.pdf", size: "1.2MB" }],
    description:
      "发改委可研批复文件是项目立项的重要依据，需要包含项目基本信息、投资规模、建设内容、实施进度等关键要素的批复意见。",
  },
  项目立项相关批准文件: {
    files: [
      { name: "立项批准文件示例.pdf", size: "0.9MB" },
      { name: "备案文件模板.docx", size: "0.7MB" },
    ],
    description:
      "项目立项批准或备案文件是项目合法性的重要证明，应包含项目名称、建设单位、建设地点、建设规模、投资总额等基本信息。",
  },
  用地预审意见书及红线图: {
    files: [
      { name: "用地预审意见书示例.pdf", size: "1.5MB" },
      { name: "红线图标准格式.dwg", size: "3.2MB" },
    ],
    description:
      "用地预审与选址意见书应明确项目用地的合规性，红线图需要标注清楚项目用地边界、坐标点、用地面积等关键信息。",
  },
  建设用地规划许可证: {
    files: [{ name: "建设用地规划许可证示例.pdf", size: "1.1MB" }],
    description: "建设用地规划许可证是建设项目用地的法定许可文件，确认项目用地符合城乡规划要求。",
  },
  项目所在区域控制性详细规划: {
    files: [
      { name: "控制性详细规划图.pdf", size: "4.5MB" },
      { name: "规划说明书.docx", size: "2.1MB" },
    ],
    description: "区域控制性详细规划应体现项目所在区域的用地性质、建设强度、配套设施等规划控制要求。",
  },
  专项债券项目实施方案: {
    files: [{ name: "专项债券实施方案模板.docx", size: "1.8MB" }],
    description: "专项债券实施方案需要详细说明项目建设内容、资金使用计划、预期收益、还款源等关键信息。",
  },
  项目绩效评估表: {
    files: [{ name: "绩效评估表模板.xlsx", size: "0.5MB" }],
    description: "项目绩效评估表用于评估项目实施效果，包含经济效益、社会效益、环境效益等多维度指标。",
  },
  项目绩效目标表: {
    files: [{ name: "绩效目标表模板.xlsx", size: "0.4MB" }],
    description: "项目绩效目标表明确项目预期达到的各项目标指标，为项目实施和后期评价提供依据。",
  },
  企业法人营业执照: {
    files: [{ name: "营业执照示例.pdf", size: "0.8MB" }],
    description: "企业法人营业执照是企业合法经营的基本证明文件，需要确保在有效期内且经营范围符合项目要求。",
  },
  事业单位法人证书: {
    files: [{ name: "事业单位法人证书示例.pdf", size: "0.7MB" }],
    description: "事业单位法人证书是事业单位法人资格的证明文件，适用于事业单位作为项目实施主体的情况。",
  },
  相关执业资格证书: {
    files: [{ name: "执业资格证书示例.pdf", size: "0.6MB" }],
    description: "执业资格证书证明项目实施主体具备相应的专业技术能力和资质条件。",
  },
  项目实施主体确认函: {
    files: [{ name: "实施主体确认函模板.docx", size: "0.3MB" }],
    description: "项目实施主体确认函明确项目的具体实施单位，确保项目责任主体清晰明确。",
  },
  项目资金到位承诺函: {
    files: [{ name: "资金到位承诺函模板.docx", size: "0.4MB" }],
    description: "项目资金到位承诺函是项目实施主体对项目资金筹措和到位的书面承诺，保障项目资金来源。",
  },
  项目无抵押证明文件: {
    files: [{ name: "无抵押证明模板.docx", size: "0.3MB" }],
    description: "无抵押证明文件确认项目资产未设置抵押，保障专项债券资金安全。",
  },
  项目总平面图: {
    files: [
      { name: "总平面图示例.dwg", size: "5.2MB" },
      { name: "技术经济指标表.xlsx", size: "0.6MB" },
    ],
    description: "总平面图应标注指北针、主要建筑物位置、道路布局等，并附技术经济指标表说明项目建设规模。",
  },
  项目用地红线图: {
    files: [{ name: "红线图标准版.dwg", size: "2.8MB" }],
    description: "红线图需要准确标注项目用地四至边界、坐标点、用地面积、规划条件等关键信息。",
  },
  项目现状照片: {
    files: [{ name: "现状照片集.pdf", size: "8.5MB" }],
    description: "现状照片应全面反映项目建设地点的实际情况，包含不同角度和重点区域的照片。",
  },
  项目区位示意图: {
    files: [{ name: "区位示意图.pdf", size: "1.9MB" }],
    description: "区位示意图应清晰标示项目在城市或区域中的位置，以及与周边重要设施的关系。",
  },
  建筑设计图纸: {
    files: [
      { name: "平面图.dwg", size: "3.5MB" },
      { name: "立面图.dwg", size: "2.8MB" },
      { name: "剖面图.dwg", size: "2.2MB" },
    ],
    description: "建筑设计图纸包含平面图、立面图、剖面图等，应符合国家建筑设计规范要求。",
  },
  环境影响评价批复: {
    files: [{ name: "环评批复文件.pdf", size: "2.1MB" }],
    description: "环境影响评价批复是项目环保合规性的重要证明，确认项目符合环境保护要求。",
  },
  节能评估批复: {
    files: [{ name: "节能评估批复.pdf", size: "1.3MB" }],
    description: "节能评估批复确认项目符合国家节能政策要求，达到相应的节能标准。",
  },
  社会稳定风险评估批复: {
    files: [{ name: "稳评批复文件.pdf", size: "1.7MB" }],
    description: "社会稳定风险评估批复确认项目实施不会对社会稳定造成不良影响。",
  },
  项目收益相关证明材料: {
    files: [
      { name: "收益测算报告.xlsx", size: "1.2MB" },
      { name: "收益证明文件.pdf", size: "0.9MB" },
    ],
    description: "收益佐证材料应详细说明项目预期收益来源、测算依据和实现路径。",
  },
  项目成本相关证明材料: {
    files: [
      { name: "成本测算明细.xlsx", size: "1.5MB" },
      { name: "成本控制方案.docx", size: "0.8MB" },
    ],
    description: "成本证明材料应包含详细的成本构成分析和成本控制措施。",
  },
  项目相关情况说明: {
    files: [{ name: "项目情况说明书.docx", size: "1.1MB" }],
    description: "情况说明应全面介绍项目背景、必要性、实施条件等相关情况。",
  },
  入库预评审财务评价报告: {
    files: [{ name: "财务评价报告模板.docx", size: "2.5MB" }],
    description: "财务评价报告应含项目投资估算、资金筹措、财务效益分析等内容。",
  },
  发行前正式评审财务评价报告: {
    files: [{ name: "正式评审财务报告.docx", size: "2.8MB" }],
    description: "正式评审阶段的财务评价报告应更加详细和准确，为债券发行提供依据。",
  },
  入库预评审法律意见书: {
    files: [{ name: "法律意见书模板.docx", size: "1.6MB" }],
    description: "法律意见书应对项目的合法合规性进行专业评估和确认。",
  },
  发行前正式评审法律意见书: {
    files: [{ name: "正式评审法律意见书.docx", size: "1.8MB" }],
    description: "正式评审阶段的法律意见书应对项目法律风险进行全面评估。",
  },
  过往评审意见汇总: {
    files: [{ name: "评审意见汇总表.xlsx", size: "0.7MB" }],
    description: "过往评审意见汇总应整理历次评审中提出的问题和整改要求。",
  },
  项目单行材料文档: {
    files: [{ name: "项目单行材料.docx", size: "1.9MB" }],
    description: "项目单行材料应按照规定格式整理项目的关键信息和材料。",
  },
  地方专债申报汇总表: {
    files: [{ name: "申报汇总表模板.xlsx", size: "0.8MB" }],
    description: "地方专债申报汇总表应完整填写项目申报的各项信息和数据。",
  },
}

export default function Project001Detail() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("management")
  const [expandedSections, setExpandedSections] = useState<string[]>(["external", "report", "materials"])
  const [newTaskInputs, setNewTaskInputs] = useState<{ [key: string]: string }>({})

  // 材料状态
  const [materialIssues, setMaterialIssues] = useState<{ [key: string]: string }>({})
  const [notificationSent, setNotificationSent] = useState<{ [key: string]: boolean }>({})

  // 文件上传状态管理
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [exampleDialogOpen, setExampleDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [selectedExample, setSelectedExample] = useState<any>(null)
  const [uploadingFile, setUploadingFile] = useState<string>("")

  // 新增材料相关状态
  const [addMaterialDialogOpen, setAddMaterialDialogOpen] = useState(false)
  const [newMaterialName, setNewMaterialName] = useState("")
  const [materialList, setMaterialList] = useState([
    { name: "项目可行性研究报告", hasExample: true, uploaded: true, updateTime: "2024-07-15" },
    { name: "可研批复", hasExample: true, uploaded: false, updateTime: "2024-07-20" },
    { name: "项目立项的批准或备案文件", hasExample: true, uploaded: false, updateTime: "2024-07-20" },
    { name: "用地预审与选址意见书及红线图", hasExample: true, uploaded: false, updateTime: "2024-07-25" },
    { name: "建设用地规划许可证", hasExample: true, uploaded: false, updateTime: "2024-07-25" },
    { name: "项目所在区域控制性详细规划", hasExample: true, uploaded: false, updateTime: "2024-07-25" },
    { name: "专项债券项目实施方案", hasExample: true, uploaded: false, updateTime: "2024-07-30" },
    { name: "项目绩效评估表", hasExample: true, uploaded: false, updateTime: "2024-07-30" },
    { name: "项目绩效目标表", hasExample: true, uploaded: false, updateTime: "2024-07-30" },
    { name: "企业法人营业执照", hasExample: true, uploaded: false, updateTime: "2024-08-01" },
    { name: "事业单位法人证书", hasExample: true, uploaded: false, updateTime: "2024-08-01" },
    { name: "相关执业资格证书", hasExample: true, uploaded: false, updateTime: "2024-08-01" },
    { name: "项目实施主体确认函", hasExample: true, uploaded: false, updateTime: "2024-08-01" },
    { name: "项目资金到位承诺函", hasExample: true, uploaded: false, updateTime: "2024-08-01" },
    { name: "项目无抵押证明文件", hasExample: true, uploaded: false, updateTime: "2024-08-01" },
  ])

  // 在现有状态后添加
  const [showReasonInput, setShowReasonInput] = useState(false)
  const [uploadReason, setUploadReason] = useState("")
  const [fileReasons, setFileReasons] = useState<{ [key: string]: string }>({})

  // 在现有状态后添加
  const [provincialFeedback, setProvincialFeedback] = useState(false) // 省评是否有反馈
  const [nationalFeedback, setNationalFeedback] = useState(false) // 国评是否有反馈
  const [governmentFeedback, setGovernmentFeedback] = useState(false) // 政府反馈是否有反馈
  const [reportFeedback, setReportFeedback] = useState(false) // 报告反馈是否有反馈

  // 项目管理相关状态
  const [currentStage, setCurrentStage] = useState(0)
  const [showTerminateDialog, setShowTerminateDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [terminateReason, setTerminateReason] = useState("")
  const [canSwitchToProvincial, setCanSwitchToProvincial] = useState(false) // 新增状态
  const [canSwitchToNational, setCanSwitchToNational] = useState(false) // 新增状态
  const [canEnterCompletion, setCanEnterCompletion] = useState(false) // 新增状态
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null)
  const [previewFileType, setPreviewFileType] = useState<string | null>(null)
  const [paymentRecords, setPaymentRecords] = useState([
    {
      id: "1",
      milestoneName: "合同签署",
      percentage: "30",
      amount: "",
      date: "",
      proof: "",
      proofUrl: "",
      commission: "",
      commissionUrl: "",
      status: "pending",
    },
  ])

  // 完成交付相关状态
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [feedbackType, setFeedbackType] = useState("")
  const [feedbackContent, setFeedbackContent] = useState("")
  const [feedbackFile, setFeedbackFile] = useState(null)

  // 建档信息相关状态
  const [showFilingDialog, setShowFilingDialog] = useState(false)
  const [milestones, setMilestones] = useState([{ id: 1, name: "", percentage: "" }])
  
  // 回款记录对话框状态
  const [paymentDialogOpen, setPaymentDialogOpen] = useState<{ [key: string]: boolean }>({})

  const stages = [
    {
      id: "wailiandan",
      title: "外联单阶段",
      status: currentStage > 0 ? "completed" : currentStage === 0 ? "in-progress" : "pending",
      description: "商务查收外联单，查看并下载最终版外联单",
      actions: ["外联单审核中","下载外联单"],
    },
    {
      id: "government-feedback",
      title: "政府反馈",
      status: currentStage > 1 ? "completed" : currentStage === 1 ? "in-progress" : "pending",
      description: "上传政府反馈意见",
      actions: ["上传政府反馈"],
    },
    {
      id: "contract",
      title: "合同谈判阶段",
      status: currentStage > 2 ? "completed" : currentStage === 2 ? "in-progress" : "pending",
      description: "合同谈判结果处理：成功则上传已签合同PDF，失败则中止项目",
      actions: ["上传合同"],
    },
    {
      id: "filing",
      title: "回款建档阶段",
      status: currentStage > 3 ? "completed" : currentStage === 3 ? "in-progress" : "pending",
      description: "手动录入回款建档信息",
      actions: ["录入建档信息"],
    },
    {
      id: "report",
      title: "报告阶段",
      status: currentStage > 4 ? "completed" : currentStage === 4 ? "in-progress" : "pending",
      description: "商务查收报告，查看并下载最终版报告",
      actions: ["下载报告"],
    },
    {
      id: "report-feedback",
      title: "政府反馈",
      status: currentStage > 5 ? "completed" : currentStage === 5 ? "in-progress" : "pending",
      description: "上传政府报告反馈意见",
      actions: ["上传政府反馈"],
    },
    {
      id: "provincial",
      title: "省评阶段",
      status: currentStage > 6 ? "completed" : currentStage === 6 ? "in-progress" : "pending",
      description: "上传省评结果：通过则切换到国评，不通过则上传修改意见",
      actions: ["上传反馈", "切换到国评"],
    },
    {
      id: "national",
      title: "国评阶段",
      status: currentStage > 7 ? "completed" : currentStage === 7 ? "in-progress" : "pending",
      description: "上传国评结果：通过则完成交付，不通过则上传修改意见",
      actions: ["上传反馈"],
    },
    {
      id: "completion",
      title: "项目结项",
      status: currentStage > 8 ? "completed" : currentStage === 8 ? "in-progress" : "pending",
      description: "确认项目结项",
      actions: ["完成交付"],
    },
  ]

  // 处理文件上传
  const handleFileUpload = (fileName: string) => {
    setUploadingFile(fileName)
    setUploadDialogOpen(true)
  }

  // 处理文件查看
  const handleFileView = (fileName: string) => {
    setSelectedFile({
      name: fileName,
      content: `这是 ${fileName} 的内容预览...`,
      uploadTime: "2024-07-08 14:30",
      uploader: "张三",
      size: "2.3MB",
    })
    setViewDialogOpen(true)
  }

  // 处理文件替换
  const handleFileReplace = (fileName: string) => {
    setUploadingFile(fileName)
    setUploadDialogOpen(true)
  }

  // 处理示例文件查看
  const handleExampleView = (exampleKey: string) => {
    const example = exampleFiles[exampleKey as keyof typeof exampleFiles]
    if (example) {
      setSelectedExample({
        title: exampleKey,
        files: example.files,
        description: example.description,
      })
      setExampleDialogOpen(true)
    }
  }

  // 确认上传
  const handleConfirmUpload = () => {
    if (selectedFile?.file) {
      const isReplacement = selectedFile.isReplacement
    
      // Simulate file upload process
      console.log(`${isReplacement ? '替换' : '上传'}文件: ${selectedFile.name} 到 ${uploadingFile}`)
      
      // Update material list to mark as uploaded
      setMaterialList(prev => prev.map(material => 
        material.name === uploadingFile 
          ? { 
              ...material, 
              uploaded: true, 
              updateTime: new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              }).replace(/\//g, '-')
            }
          : material
      ))
      
      // Show success message
      alert(`文件 "${selectedFile.name}" ${isReplacement ? '替换' : '上传'}成功！`)
    }
    
    setUploadDialogOpen(false)
    setUploadingFile("")
    setSelectedFile(null)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case "progress":
        return "bg-blue-100 text-blue-800"
      case "approval":
        return "bg-green-100 text-green-800"
      case "procurement":
        return "bg-purple-100 text-purple-800"
      case "award":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSectionColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500"
      case "orange":
        return "bg-orange-500"
      case "gray":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "外联单":
        return "bg-blue-100 text-blue-800"
      case "报告":
        return "bg-orange-100 text-orange-800"
      case "商务收集材料":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddTask = (sectionId: string) => {
    const taskName = newTaskInputs[sectionId]
    if (taskName && taskName.trim()) {
      // 这里可以添加实际的任务添加逻辑
      console.log(`添加任务: ${taskName} 到 ${sectionId}`)
      setNewTaskInputs({ ...newTaskInputs, [sectionId]: "" })
    }
  }

  const handleNewTaskInputChange = (sectionId: string, value: string) => {
    setNewTaskInputs({ ...newTaskInputs, [sectionId]: value })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "failed":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status, stageTitle, hasFeedback) => {
    const statusConfig = {
      pending: { label: "待处理", className: "bg-gray-100 text-gray-800" },
      completed: { label: "已完成", className: "bg-green-100 text-green-800" },
      failed: { label: "已失败", className: "bg-red-100 text-red-800" },
    }

    // 处理进行中状态，根据阶段标题显示不同的描述
    if (status === "in-progress" && stageTitle) {
      let label = "进行中"
      
      switch (stageTitle) {
        case "外联单阶段":
          // 检查是否有政府反馈需要修改
          label = governmentFeedback ? "外联单修改中" : "外联单审核中"
          break
        case "政府反馈":
          // 政府反馈阶段的特殊处理
          if (hasFeedback === true) {
            label = "外联单修改中"
          } else if (hasFeedback === false) {
            // 无意见时显示已完成
            return <Badge className="bg-green-100 text-green-800">等待政府反馈中</Badge>
          } else {
            label = "已完成"
          }
          break
        case "合同谈判阶段":
          label = "合同谈判中"
          break
        case "回款建档阶段":
          label = "回款建档中"
          break
        case "报告阶段":
          // 检查是否有报告反馈需要修改，或者是否从后续阶段回退到报告阶段
          label = reportFeedback || provincialFeedback || nationalFeedback ? "报告修改中" : "报告审核中"
          break
        case "省评阶段":
          label = hasFeedback ? "省评修改意见处理中" : "等待省评结果中"
          break
        case "国评阶段":
          label = hasFeedback ? "国评修改意见处理中" : "等待国评结果中"
          break
        case "完成交付":
          label = "交付确认中"
          break
        default:
          label = "进行中"
      }
      
      return <Badge className="bg-blue-100 text-blue-800">{label}</Badge>
    }

    const config = statusConfig[status]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const handleStageAction = (stageId, action) => {
    if (action === "上传政府反馈") {
      setShowFeedbackDialog(true)
      return
    }
    if (action === "上传反馈") {
      setShowFeedbackDialog(true)
      return
    }
    if (action === "下载外联单") {
      // 创建一个虚拟的下载链接
      const link = document.createElement("a")
      link.href = "/placeholder.pdf" // 这里应该是实际的外联单文件URL
      link.download = `${project001Data.name}_外联单.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("下载外联单:", `${project001Data.name}_外联单.pdf`)
      
      // 下载完成后，外联单阶段完成，进入政府反馈阶段
      setCurrentStage(1)
      return
    }
    if (action === "下载报告") {
      // 创建一个虚拟的下载链接
      const link = document.createElement("a")
      link.href = "/placeholder.pdf" // 这里应该是实际的报告文件URL
      link.download = `${project001Data.name}_报告.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("下载报告:", `${project001Data.name}_报告.pdf`)
      
      // 下载完成后，报告阶段完成，进入政府反馈阶段
      setCurrentStage(5)
      return
    }
    if (action === "上传合同") {
      // 创建文件输入元素
      const fileInput = document.createElement("input")
      fileInput.type = "file"
      fileInput.accept = ".pdf,.doc,.docx"
      fileInput.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          console.log(`上传合同文件: ${file.name}`)
          // 模拟上传成功后自动进入下一阶段
          setCurrentStage((prev) => prev + 1)
        }
      }
      fileInput.click()
      return
    }
    if (action === "录入建档信息") {
      setShowFilingDialog(true)
      return
    }
    if (action === "切换到国评" || action === "完成交付") {
      setCurrentStage((prev) => prev + 1)
    }
    if (action === "完成交付") {
      alert("报告已交付")
      return
    }
    console.log(`执行操作: ${action} 在阶段: ${stageId}`)
  }

  const handleTerminateProject = () => {
    if (terminateReason.trim()) {
      console.log("项目中止原因:", terminateReason)
      setShowTerminateDialog(false)
      setTerminateReason("")
    }
  }

  const addPaymentRecord = (amount, proof, commission) => {
    const newRecord = {
      id: Date.now().toString(),
      amount,
      date: new Date().toISOString().split("T")[0],
      proof: proof?.name || "",
      proofUrl: proof?.url || "",
      commission: commission?.name || "",
      commissionUrl: commission?.url || "",
      status: "pending",
    }
    setPaymentRecords([...paymentRecords, newRecord])
    setShowPaymentDialog(false)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavigation currentPath="/projects/001" />

      <div className="h-[calc(100vh-4rem)] overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                返回项目列表
              </Button>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{project001Data.name}</h1>
                </div>
              </div>
            </div>

            {/* 添加关联访问记录信息 */}
          </div>

          {/* 标签页内容 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="management">项目管理</TabsTrigger>
              <TabsTrigger value="tasks">关键材料收集</TabsTrigger>
              <TabsTrigger value="overview">项目概览</TabsTrigger>
            </TabsList>

            {/* 项目概览 */}
            <TabsContent value="overview" className="space-y-6">
              <div className="max-w-7xl mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <div className="grid grid-cols-2 gap-4">
                      <CardTitle className="text-xl font-bold">江西省南昌市新建区</CardTitle>
                      <div className="text-xl font-bold flex items-center justify-center gap-2">
                        第
                        <div className="w-16 h-8 border border-gray-300 rounded flex items-center justify-center text-center bg-gray-50">
                          1
                        </div>
                        稿 共
                        <div className="w-16 h-8 border border-gray-300 rounded flex items-center justify-center text-center bg-gray-50">
                          1
                        </div>
                        稿
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* 主表格 */}
                    <div className="border border-gray-300">
                      {/* 第一行 - 项目信息和时间计划 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 flex items-center justify-center font-medium">
                          项目名称
                        </div>
                        <div className="col-span-4 border-r border-gray-300 p-2 bg-gray-50">
                          南昌市新建区蛋鸡养殖基地建设项目
                        </div>
                        <div className="col-span-6 grid grid-cols-6">
                          <div className="bg-blue-100 border-r border-gray-300 p-1 text-xs flex items-center justify-center">
                            立项时间
                          </div>
                          <div className="border-r border-gray-300 p-1 bg-gray-50 text-xs flex items-center justify-center">
                            {project001Data?.planningInputDate}
                          </div>
                          <div className="bg-blue-100 border-r border-gray-300 p-1 text-xs flex items-center justify-center">
                            谋划输出计划
                          </div>
                          <div className="p-1 bg-gray-50 text-xs flex items-center justify-center">
                            {project001Data?.repaymentDate}
                          </div>
                        </div>
                      </div>

                      {/* 第二行 - 可研报告计划 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 flex items-center justify-center font-medium">
                          可研报告输出时间
                        </div>
                        <div className="col-span-4 border-r border-gray-300 p-2 bg-gray-50">2025年6月4日</div>
                        <div className="col-span-6 grid grid-cols-6">
                          <div className="bg-blue-100 border-r border-gray-300 p-1 text-xs flex items-center justify-center">
                            申报计划
                          </div>
                          <div className="border-r border-gray-300 p-1 bg-gray-50 text-xs flex items-center justify-center">
                            5月20日20时
                          </div>
                          <div className="bg-blue-100 border-r border-gray-300 p-1 text-xs flex items-center justify-center">
                            合同计划
                          </div>
                          <div className="border-r border-gray-300 p-1 bg-gray-50 text-xs flex items-center justify-center">
                            9月30日18时
                          </div>
                          <div className="bg-blue-100 border-r border-gray-300 p-1 text-xs flex items-center justify-center">
                            回款计划
                          </div>
                          <div className="p-1 bg-gray-50 text-xs flex items-center justify-center">12月30日18时</div>
                        </div>
                      </div>

                      {/* 商务访问回执情况 标题行 */}
                      <div className="bg-blue-200 border-b border-gray-300 p-2 text-center font-medium">
                        商务访问回执情况
                      </div>

                      {/* 项目分类表格 */}
                      <div className="grid grid-cols-2">
                        {/* 左侧列 */}
                        <div className="border-r border-gray-300">
                          {/* 1. 交通基础设施 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">1. 交通基础设施</div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">铁路</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">收费公路</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">农村公路（不含通村工程）</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">水运</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">民航交通枢纽</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">城市内部交通</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">城市停车场</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">天然气管道和储气设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">煤炭储备设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">
                                  综合物流枢纽、国家物流枢纽、城市配送、应急物流及网络货运服务设施
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">大型风电光伏基地</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">抽水蓄能电站</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">村镇再生能源供热</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">沿边沿海及边远地区工程</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">新能源汽车充电桩</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">其它新能源项目</label>
                              </div>
                            </div>
                          </div>

                          {/* 2. 能源 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">2. 能源</div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" checked disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">农业</label>
                              </div>
                            </div>
                          </div>

                          {/* 3. 农林水利 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">3. 农林水利</div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">农业</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">水利</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">林业</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">城镇供水收费处理</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">城镇垃圾收费处理</label>
                              </div>
                            </div>
                          </div>

                          {/* 4. 生态环保 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">4. 生态环保</div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">城镇生活水处理利用</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">固体废弃物综合利用和资源循环利用</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">其它生态环保项目</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">
                                  卫生健康（含应急医疗救治设施、公共卫生设施等）
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">教育（学前教育和义务教育）</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">养老</label>
                              </div>
                            </div>
                          </div>

                          {/* 5. 社会事业 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">5. 社会事业</div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">托育</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">文化</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">旅游</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">其他社会事业</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">公共链物流设施</label>
                              </div>
                            </div>
                          </div>

                          {/* 6. 城乡冷链等物流基础设施 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">
                              6. 城乡冷链等物流基础设施
                            </div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">国家物流枢纽等物流基础设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">应急全链物流设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">
                                  应急物流枢纽物流设施（应急物流中转站、生活物资储备大仓基地）
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">农产品批发市场</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 右侧列 */}
                        <div>
                          {/* 7. 市政和产业园区基础设施 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">
                              7. 市政和产业园区基础设施
                            </div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">供水</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label classNameclassName="text-sm text-gray-600">排水</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">供热</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">供气</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">地下管廊</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">国家级、省级产业园区基础设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">其他产业园区基础设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">完善基础设施发展</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">长江经济带发展</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">"一带一路"建设</label>
                              </div>
                            </div>
                          </div>

                          {/* 8. 国家重大战略项目 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">
                              8. 国家重大战略项目
                            </div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">黄河流域高质量发展</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">长三角一体化发展</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">推进长江全流域改革开放</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">黄河流域生态保护和高质量发展</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">城镇群协同发展</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">
                                  国产化改造（主要支持在建和续建项目，适度支持新开工项目）
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">城市群发展</label>
                              </div>
                            </div>
                          </div>

                          {/* 9. 城市更新 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">9. 城市更新</div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">老旧小区改造</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">老旧厂房改造</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">
                                  城市公共空间功能提升及其他城市更新类的设施建设
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* 10. 保障性安居工程 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">
                              10. 保障性安居工程
                            </div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">保障性住房</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">公共租赁住房</label>
                              </div>
                            </div>
                          </div>

                          {/* 11. 新基建设施 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">11. 新基建设施</div>
                            <div className="p-2 space-y-1 text-sm text-gray-600">
                              市政、公共服务等生态领域数字化
                              <br />
                              云计算、数据中心、工业互联网、人工智能、算力设备及相关配套设施
                              <br />
                              铁路、港口、高速公路、机场等传统基础设施智能化改造
                              <br />
                              国家级、省级大数据中心和服务器机房等数字基础设施
                              <br />
                              符合国家产业政策的新兴产业基础设施及其他基础设施
                            </div>
                          </div>

                          {/* 12. 创新链、战略性新兴产业链基础设施 */}
                          <div className="border-b border-gray-300">
                            <div className="bg-blue-100 p-2 font-medium border-b border-gray-300">
                              12. 创新链、战略性新兴产业链基础设施
                            </div>
                            <div className="p-2 space-y-1">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">信息技术、数字经济相关产业基础设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">生物制药、生命科学相关产业基础设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">新材料科学相关产业基础设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">高端装备、战略性新兴产业基础设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">电子科技相关产业基础设施</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" disabled className="w-4 h-4" />
                                <label className="text-sm text-gray-600">北斗相关产业基础设施</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 备注行 */}
                      <div className="border-b border-gray-300 p-2 text-center text-red-600 text-sm">
                        备注：以上领域只能单选
                      </div>

                      {/* 联系人信息表格 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          申报主体：
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50">新建区国控集团</div>
                        <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm">联系人：</div>
                        <div className="col-span-1 border-r border-gray-300 p-2 bg-gray-50">雷政权</div>
                        <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm">职务：</div>
                        <div className="col-span-1 border-r border-gray-300 p-2 bg-gray-50">部长</div>
                        <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm">联系电话：</div>
                        <div className="col-span-3 p-2 bg-gray-50">13870074010</div>
                      </div>

                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          实施主体：
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50">新建区国控集团</div>
                        <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm">联系人：</div>
                        <div className="col-span-1 border-r border-gray-300 p-2 bg-gray-50">雷政权</div>
                        <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm">职务：</div>
                        <div className="col-span-1 border-r border-gray-300 p-2 bg-gray-50">部长</div>
                        <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 text-sm">联系电话：</div>
                        <div className="col-span-3 p-2 bg-gray-50">13870074010</div>
                      </div>

                      {/* 项目性质行 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          项目性质：
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50">新建</div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          建筑规模：
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50"></div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          占地面积（㎡）：
                        </div>
                        <div className="col-span-2 p-2 bg-gray-50">287亩</div>
                      </div>

                      {/* 建设地址行 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          建设地址：
                        </div>
                        <div className="col-span-10 p-2 text-black bg-gray-50">
                          南昌市新建区西山镇石堎村，（以规划证信息为准）
                        </div>
                      </div>

                      {/* 项目需求（资金类型）行 - 黄色背景 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          项目需求（资金类型）：
                        </div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          开/竣工计划：
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50">2025年6月2026年5月</div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          建设周期：
                        </div>
                        <div className="col-span-4 p-2 bg-gray-50"></div>
                      </div>

                      {/* 项目是否已有融资行 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          项目是否已有融资：
                        </div>
                        <div className="col-span-1 border-r border-gray-300 p-2 text-center bg-gray-50">否</div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          项目起始时间：
                        </div>
                        <div className="col-span-2 border-r border-gray-300 p-2 bg-gray-50">2025年6月30日</div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          重要时间节点
                        </div>
                        <div className="col-span-3 p-2 grid grid-cols-6 gap-1 items-center bg-gray-50">
                          <div className="border border-gray-300 rounded text-center p-1"></div>
                          <span className="text-center text-sm">年</span>
                          <div className="border border-gray-300 rounded text-center p-1"></div>
                          <span className="text-center text-sm">月</span>
                          <div className="border border-gray-300 rounded text-center p-1"></div>
                          <span className="text-center text-sm">备注：</span>
                        </div>
                      </div>

                      {/* 项目总投资行 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          项目总投资（万元）
                        </div>
                        <div className="col-span-1 border-r border-gray-300 p-2 text-black bg-gray-50">43000</div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">资金需求</div>
                        <div className="col-span-1 border-r border-gray-300 p-2 text-black bg-gray-50">34000</div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          商务建议资金需求
                        </div>
                        <div className="col-span-1 border-r border-gray-300 p-2 text-black bg-gray-50">34000</div>
                        <div className="col-span-1 bg-blue-100 border-r border-gray-300 p-2 font-medium">报价建议</div>
                        <div className="col-span-1 p-2 text-black bg-gray-50">10万</div>
                      </div>

                      {/* 付款方式和转账行 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-8"></div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">付款方式</div>
                        <div className="col-span-2 p-2 font-medium bg-gray-50">转账</div>
                      </div>

                      {/* 项目建设内容行 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          项目建设内容
                        </div>
                        <div className="col-span-10 p-2 bg-gray-50">
                          本项目拟建设占地面积约287亩，含建筑面积约2000平方米，项目建设内容为建设160万羽蛋鸡及40万羽育雏智慧养殖基地，配套建设综合楼、管理楼、饲养系统、饮水系统、集蛋系统、清粪系统、环控系统等。项目建设内容本项目拟建设占地面积约287亩，含建筑面积约2000平方米，项目建设内容为建设160万羽蛋鸡及40万羽育雏智慧养殖基地，配套建设综合楼、管理楼、饲养系统、饮水系统、集蛋系统、清粪系统、环控系统等。项目建设内容

                        </div>
                      </div>
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">收益点</div>
                        <div className="col-span-10 p-2 bg-gray-50"></div>
                      </div>

                      {/* 甲方诉求点行 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          甲方诉求点
                        </div>
                        <div className="col-span-4 p-2 bg-gray-50"></div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">
                          项目风险点
                        </div>
                        <div className="col-span-4 p-2 bg-gray-50"></div>
                      </div>

                      {/* 项目难点行 */}
                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">项目难点</div>
                        <div className="col-span-4 p-2 bg-gray-50"></div>
                        <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-2 font-medium">商务建议</div>
                        <div className="col-span-4 p-2 bg-gray-50"></div>
                      </div>

                      {/* 项目驱动方式行 */}
                      <div className="border-b border-gray-300">
                        <div className="grid grid-cols-12">
                          <div className="col-span-2 bg-blue-100 border-r border-gray-300 p-4 font-medium ">
                            项目驱动方式：
                          </div>
                          <div className="col-span-10 grid grid-cols-2">
                            <div className="border-r border-gray-300">
                              <div className="grid grid-cols-2 border-b border-gray-300">
                                <div className="bg-blue-100 p-2 font-medium">主动拜访对象：</div>
                              </div>
                              <div className="p-2 bg-gray-50">中标 2条线 3个部门1 4财政 5发改 省发改委财政厅__5</div>
                            </div>
                            <div>
                              <div className="bg-blue-100 border-b border-gray-300 p-2 font-medium">
                                项目现场调研次数：
                              </div>
                              <div className="p-2 grid grid-cols-3 gap-2 items-center bg-gray-50">
                                <div className="border border-gray-300 rounded text-center p-1"></div>
                                <span className="text-center">次</span>
                                <div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 任务进展 */}
            <TabsContent value="tasks" className="space-y-6">
              <div className="space-y-6">
                {/* 材料收集 */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      材料收集 ({materialList.filter(material => material.uploaded).length}/{materialList.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-3 font-medium text-sm text-gray-700">文件名</th>
                              <th className="text-left py-2 px-3 font-medium text-sm text-gray-700">示例文件及说明</th>
                              <th className="text-left py-2 px-3 font-medium text-sm text-gray-700">最后更新时间</th>
                              <th className="text-left py-2 px-3 font-medium text-sm text-gray-700">操作</th>
                            </tr>
                          </thead>
                          <tbody>
                            {materialList.map((material, index) => (
                              <tr key={index} className="hover:bg-gray-50 border-b">
                                <td className="py-1.5 px-3">
                                  <span className="text-sm">{material.name}</span>
                                </td>
                                <td className="py-1.5 px-3">
                                  {material.hasExample ? (
                                    <Button
                                      variant="link"
                                      className="p-0 h-auto text-blue-600 hover:text-blue-800 text-sm"
                                      onClick={() => handleExampleView(material.name)}
                                    >
                                      查看示例文件及说明
                                    </Button>
                                  ) : (
                                    <span className="text-sm text-gray-400">无示例文件</span>
                                  )}
                                </td>
                                <td className="py-1.5 px-3">
                                  <span className="text-sm text-gray-500">{material.updateTime}</span>
                                </td>
                                <td className="py-1.5 px-3">
                                  <div className="flex gap-2">
                                    {material.uploaded ? (
                                      <>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="gap-1 bg-transparent"
                                          onClick={() => {
                                            // Set file details for viewing
                                            setSelectedFile({
                                              name: material.name,
                                              content: `这是 ${material.name} 的详细内容预览。\n\n文件包含以下信息：\n- 文件类型：${material.name.includes('PDF') ? 'PDF文档' : material.name.includes('Excel') ? 'Excel表格' : '文档文件'}\n- 上传时间：${material.updateTime}\n- 文件状态：已上传\n- 文件大小：约2.3MB\n\n注意：这是一个示例预览，实际应用中会显示真实的文件内容。`,
                                              uploadTime: material.updateTime,
                                              uploader: "张三",
                                              size: "2.3MB",
                                              type: material.name.includes('PDF') ? 'application/pdf' : material.name.includes('Excel') ? 'application/vnd.ms-excel' : 'application/msword'
                                            })
                                            setViewDialogOpen(true)
                                          }}
                                        >
                                          查看
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="gap-1 bg-transparent"
                                          onClick={() => {
                                            // Create file input element for replacement
                                            const fileInput = document.createElement("input")
                                            fileInput.type = "file"
                                            fileInput.accept = ".pdf,.doc,.docx,.jpg,.png,.xlsx"
                                            fileInput.onchange = (e) => {
                                              const file = (e.target as HTMLInputElement).files?.[0]
                                              if (file) {
                                                // Show replacement confirmation dialog
                                                setUploadingFile(material.name)
                                                setSelectedFile({
                                                  name: file.name,
                                                  size: (file.size / 1024 / 1024).toFixed(2) + "MB",
                                                  type: file.type,
                                                  file: file,
                                                  isReplacement: true // Flag to indicate this is a replacement
                                                })
                                                setUploadDialogOpen(true)
                                              }
                                            }
                                            fileInput.click()
                                          }}
                                        >
                                          替换
                                        </Button>
                                      </>
                                    ) : fileReasons[material.name] ? (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                                        disabled
                                      >
                                        暂时无法提供
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1 bg-transparent"
                                        onClick={() => {
                                          // Create file input element
                                          const fileInput = document.createElement("input")
                                          fileInput.type = "file"
                                          fileInput.accept = ".pdf,.doc,.docx,.jpg,.png,.xlsx"
                                          fileInput.onchange = (e) => {
                                            const file = (e.target as HTMLInputElement).files?.[0]
                                            if (file) {
                                              // Show upload confirmation dialog
                                              setUploadingFile(material.name)
                                              setSelectedFile({
                                                name: file.name,
                                                size: (file.size / 1024 / 1024).toFixed(2) + "MB",
                                                type: file.type,
                                                file: file
                                              })
                                              setUploadDialogOpen(true)
                                            }
                                          }
                                          fileInput.click()
                                        }}
                                      >
                                        上传
                                      </Button>
                                    )}
                                    {fileReasons[material.name] && (
                                      <div className="mt-1">
                                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                          备注: {fileReasons[material.name]}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 项目谋划 
                <Card>
                  <CardHeader>
                    <CardTitle>项目谋划</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-4 gap-4 py-2 border-b text-sm font-medium text-gray-700">
                        <div>外联单名称</div>
                        <div>checker</div>
                        <div>状态</div>
                        <div>操作</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 py-2 items-center">
                        <div className="text-sm">{project001Data.name}外联单</div>
                        <div>
                          <span className="text-sm">张三</span>
                        </div>
                        <div>
                          <span className="text-sm text-green-600">checker已批准</span>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 bg-transparent h-8"
                            onClick={() => {
                              // 创建一个虚拟的下载链接
                              const link = document.createElement("a")
                              link.href = "/placeholder.pdf" // 这里应该是实际的外联单文件URL
                              link.download = `${project001Data.name}_外联单.pdf`
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                              console.log("下载外联单:", `${project001Data.name}_外联单.pdf`)
                            }}
                          >
                            下载
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 生成报告 
                <Card>
                  <CardHeader>
                    <CardTitle>报告</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-4 gap-4 py-2 border-b text-sm font-medium text-gray-700">
                        <div>报告名称</div>
                        <div>技术人员</div>
                        <div>状态</div>
                        <div>操作</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 py-2 items-center">
                        <div className="text-sm">{project001Data.name}报告</div>
                        <div>
                          <span className="text-sm">王技术</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">checker审核中</span>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 bg-transparent h-8 text-gray-400 cursor-not-allowed"
                            disabled
                          >
                            下载
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>*/}
              </div>
            </TabsContent>

            {/* 项目管理 */}
            <TabsContent value="management" className="space-y-6">
              <div className="space-y-6">
                {/* 项目流程进度 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="h-5 w-5" />
                      项目流程管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stages.map((stage, index) => (
                        <div key={stage.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="flex flex-col items-center">
                            {getStatusIcon(stage.status)}
                            {index < stages.length - 1 && <div className="w-px h-8 bg-gray-300 mt-2" />}
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{stage.title}</h3>
                              {getStatusBadge(stage.status, stage.title, 
                                stage.title === "政府反馈" && stage.id === "government-feedback" ? governmentFeedback : 
                                stage.title === "政府反馈" && stage.id === "report-feedback" ? reportFeedback :
                                stage.title === "省评阶段" ? provincialFeedback : 
                                stage.title === "国评阶段" ? nationalFeedback : undefined
                              )}
                            </div>

                            <p className="text-sm text-gray-600">{stage.description}</p>

                            {stage.status === "in-progress" && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {stage.actions.map((action) => (
                                  <Button
                                    key={action}
                                    size="sm"
                                    variant={action.includes("切换") || action.includes("进入") ? "default" : "outline"}
                                    onClick={() => handleStageAction(stage.id, action)}
                                    disabled={
                                      (action === "切换到省评" && !canSwitchToProvincial) ||
                                      (action === "切换到国评" && !canSwitchToNational) ||
                                      (action === "完成交付" && !canEnterCompletion)
                                    }
                                  >
                                    {action.includes("上传") && <UploadIcon className="h-4 w-4 mr-1" />}
                                    {action.includes("下载") && <DownloadIcon className="h-4 w-4 mr-1" />}
                                    {action.includes("查看") && <FileText className="h-4 w-4 mr-1" />}
                                    {action}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 回款管理 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      回款管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {paymentRecords.map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="space-y-1 flex-1">
                            <div className="font-medium">{record.milestoneName} ({record.percentage}%)</div>
                            {record.amount ? (
                              <>
                                <div className="text-sm text-gray-600">¥{record.amount}</div>
                                <div className="text-sm text-gray-600">{record.date}</div>
                                <div className="text-xs text-gray-500">
                                  证明: {record.proof} | 提成: {record.commission}
                                </div>
                              </>
                            ) 
                            : (
                              <div className="text-sm text-gray-500">未添加回款记录</div>
                            )
                            }
                          </div>
                          <div className="flex items-center gap-2">
                            <Dialog open={paymentDialogOpen[record.id]} onOpenChange={(open) => setPaymentDialogOpen(prev => ({ ...prev, [record.id]: open }))}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  {record.proof && record.commission ? (
                                    <>
                                      <FileText className="h-4 w-4 mr-1" />
                                      查看回款记录
                                    </>
                                  ) : (
                                    <>
                                      <UploadIcon className="h-4 w-4 mr-1" />
                                      上传回款记录
                                    </>
                                  )}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{record.proof && record.commission ? "回款记录详情" : "上传回款记录"}</DialogTitle>
                                </DialogHeader>
                                {record.proof && record.commission ? (
                                  <div className="space-y-4">
                                    <div>
                                      <Label>回款证明</Label>
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        <span
                                          className="text-blue-600 underline cursor-pointer"
                                          onClick={() => {
                                            setPreviewFileUrl(record.proofUrl)
                                            setPreviewFileType(record.proofUrl?.endsWith('.pdf') ? 'pdf' : 'img')
                                          }}
                                        >
                                          {record.proof}
                                        </span>
                                        {/* 可加下载/预览逻辑 */}
                                      </div>
                                    </div>
                                    <div>
                                      <Label>商务提成证明</Label>
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        <span
                                          className="text-blue-600 underline cursor-pointer"
                                          onClick={() => {
                                            setPreviewFileUrl(record.commissionUrl)
                                            setPreviewFileType(record.commissionUrl?.endsWith('.pdf') ? 'pdf' : 'img')
                                          }}
                                        >
                                          {record.commission}
                                        </span>
                                        {/* 可加下载/预览逻辑 */}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor={`proof-${record.id}`}>回款证明</Label>
                                      <Input id={`proof-${record.id}`} type="file" accept=".pdf,.jpg,.png" />
                                    </div>
                                    <div>
                                      <Label htmlFor={`commission-${record.id}`}>商务提成证明</Label>
                                      <Input id={`commission-${record.id}`} type="file" accept=".pdf,.jpg,.png" />
                                    </div>
                                    <Button
                                      onClick={() => {
                                        const proofInput = document.getElementById(`proof-${record.id}`) as HTMLInputElement
                                        const commissionInput = document.getElementById(`commission-${record.id}`) as HTMLInputElement
                                        if (!proofInput || !commissionInput) return
                                        const proofFile = proofInput.files?.[0]
                                        const commissionFile = commissionInput.files?.[0]
                                        const updatedRecords = paymentRecords.map(r =>
                                          r.id === record.id
                                            ? {
                                                ...r,
                                                date: new Date().toISOString().split("T")[0],
                                                proof: proofFile?.name || "",
                                                proofUrl: proofFile ? URL.createObjectURL(proofFile) : "",
                                                commission: commissionFile?.name || "",
                                                commissionUrl: commissionFile ? URL.createObjectURL(commissionFile) : "",
                                                status: "pending"
                                              }
                                            : r
                                        )
                                        setPaymentRecords(updatedRecords)
                                        toast({
                                          title: "提交成功",
                                          description: "回款证明已提交",
                                          duration: 3000,
                                        })
                                        setPaymentDialogOpen(prev => ({ ...prev, [record.id]: false }))
                                      }}
                                      className="w-full"
                                    >
                                      提交
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            {/*
                            <Badge
                              className={
                                record.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : record.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {record.status === "approved"
                                ? "已批准"
                                : record.status === "rejected"
                                  ? "已驳回"
                                  : "待审核"}
                            </Badge>*/}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 特殊操作 */}
               
                    <div className="flex justify-end">
                      <Dialog open={showTerminateDialog} onOpenChange={setShowTerminateDialog}>
                        <DialogTrigger asChild>
                          <Button variant="destructive">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            中止项目
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>中止项目</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="reason">中止原因</Label>
                              <Textarea
                                id="reason"
                                placeholder="请详细说明项目中止的原因..."
                                value={terminateReason}
                                onChange={(e) => setTerminateReason(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="destructive"
                                onClick={handleTerminateProject}
                                disabled={!terminateReason.trim()}
                              >
                                确认中止
                              </Button>
                              <Button variant="outline" onClick={() => setShowTerminateDialog(false)}>
                                取消
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                

                {/* 政府反馈对话框 */}
                <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>政府反馈处理</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>反馈类型</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="has-feedback"
                              name="feedback-type"
                              value="has-feedback"
                              checked={feedbackType === "has-feedback"}
                              onChange={(e) => setFeedbackType(e.target.value)}
                            />
                            <label htmlFor="has-feedback" className="text-sm">
                              有意见
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="no-feedback"
                              name="feedback-type"
                              value="no-feedback"
                              checked={feedbackType === "no-feedback"}
                              onChange={(e) => setFeedbackType(e.target.value)}
                            />
                            <label htmlFor="no-feedback" className="text-sm">
                              无意见
                            </label>
                          </div>
                        </div>
                      </div>

                      {feedbackType === "has-feedback" && (
                        <div className="space-y-4">
                        
                          <div>
                            <Label htmlFor="feedback-content">请输入反意见</Label>
                            <Textarea
                              id="feedback-content"
                              placeholder="请输入政府反馈意见..."
                              value={feedbackContent}
                              onChange={(e) => setFeedbackContent(e.target.value)}
                              rows={4}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            if (feedbackType === "no-feedback") {
                              if (currentStage === 1) {
                                // 政府反馈阶段：无意见，设置反馈状态为false并进入下一阶段
                                setGovernmentFeedback(false)
                                setCurrentStage(2) // 进入合同谈判阶段
                                console.log("政府无意见，进入合同签署阶段")
                              } else if (currentStage === 5) {
                                // 报告反馈阶段：无意见，设置反馈状态为false并启用切换到省评按钮
                                setReportFeedback(false)
                                setCanSwitchToProvincial(true)
                                setCurrentStage(6) // 进入省评阶段
                                console.log("政府无意见，进入省评阶段")
                              } else if (currentStage === 6) {
                                // 省评阶段：无意见，清除省评反馈状态并进入下一阶段
                                setProvincialFeedback(false)
                                setCurrentStage(7) // 进入国评阶段
                                console.log("省评无意见，进入国评阶段")
                              } else if (currentStage === 7) {
                                // 国评阶段：无意见，清除国评反馈状态并进入下一阶段
                                setNationalFeedback(false)
                                setCurrentStage(8) // 进入项目结项阶段
                                console.log("国评无意见，进入项目结项阶段")
                              }
                            } else if (feedbackType === "has-feedback") {
                              // 有意见的处理逻辑
                              if (currentStage === 1) {
                                // 政府反馈阶段有意见，设置反馈状态为true，回退到外联单阶段
                                setGovernmentFeedback(true)
                                setCurrentStage(0) // 回退到外联单阶段
                                console.log("政府反馈有意见，回退到外联单阶段:", feedbackContent || feedbackFile?.name)
                              } else if (currentStage === 5) {
                                // 报告反馈阶段有意见，设置反馈状态为true，回退到报告阶段
                                setReportFeedback(true)
                                setCurrentStage(4) // 回退到报告阶段
                                console.log("报告反馈有意见，回退到报告阶段:", feedbackContent || feedbackFile?.name)
                              } else if (currentStage === 6) {
                                // 省评阶段有意见，设置省评反馈状态并返回到报告阶段
                                setProvincialFeedback(true)
                                setCurrentStage(4) // 返回报告阶段
                                console.log("省评有意见，返回报告阶段:", feedbackContent || feedbackFile?.name)
                              } else if (currentStage === 7) {
                                // 国评阶段有意见，设置国评反馈状态并返回到报告阶段
                                setNationalFeedback(true)
                                setCurrentStage(4) // 返回报告阶段
                                console.log("国评有意见，返回报告阶段:", feedbackContent || feedbackFile?.name)
                              }
                            }
                            setShowFeedbackDialog(false)
                            setFeedbackType("")
                            setFeedbackContent("")
                            setFeedbackFile(null)
                          }}
                          disabled={
                            !feedbackType || (feedbackType === "has-feedback" && !feedbackContent && !feedbackFile)
                          }
                          className="flex-1"
                        >
                          确认
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowFeedbackDialog(false)
                            setFeedbackType("")
                            setFeedbackContent("")
                            setFeedbackFile(null)
                          }}
                          className="flex-1"
                        >
                          取消
                        </Button>
                      </div>
                    </div>
                  </DialogContent>

                </Dialog>

                {/* 建档信息对话框 */}
                <Dialog open={showFilingDialog} onOpenChange={setShowFilingDialog}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>录入建档信息</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium">项目里程碑和回款比例</Label>
                        <p className="text-sm text-gray-600 mt-1">请设置项目的关键里程碑节点和对应的回款比例</p>
                      </div>

                      <div className="space-y-4">
                        {milestones.map((milestone, index) => (
                          <div key={milestone.id} className="flex items-center gap-4 p-4 border rounded-lg">
                            <div className="flex-1">
                              <Label htmlFor={`milestone-${milestone.id}`} className="text-sm">
                                里程碑 {index + 1}
                              </Label>
                              <Input
                                id={`milestone-${milestone.id}`}
                                placeholder="请输入里程碑名称，如：合同签署、项目启动、中期验收等"
                                value={milestone.name}
                                onChange={(e) => {
                                  const newMilestones = [...milestones]
                                  newMilestones[index].name = e.target.value
                                  setMilestones(newMilestones)
                                }}
                                className="mt-1"
                              />
                            </div>
                            <div className="w-32">
                              <Label htmlFor={`percentage-${milestone.id}`} className="text-sm">
                                回款比例
                              </Label>
                              <div className="flex items-center mt-1">
                                <Input
                                  id={`percentage-${milestone.id}`}
                                  type="number"
                                  min="0"
                                  max="100"
                                  placeholder="30"
                                  value={milestone.percentage}
                                  onChange={(e) => {
                                    const newMilestones = [...milestones]
                                    newMilestones[index].percentage = e.target.value
                                    setMilestones(newMilestones)
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-500">%</span>
                              </div>
                            </div>
                            {milestones.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newMilestones = milestones.filter((_, i) => i !== index)
                                  setMilestones(newMilestones)
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                删除
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const newId = Math.max(...milestones.map((m) => m.id)) + 1
                            setMilestones([...milestones, { id: newId, name: "", percentage: "" }])
                          }}
                        >
                          + 添加里程碑
                        </Button>

                        <div className="text-sm text-gray-600">
                          总计: {milestones.reduce((sum, m) => sum + (Number.parseInt(m.percentage) || 0), 0)}%
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            const totalPercentage = milestones.reduce(
                              (sum, m) => sum + (Number.parseInt(m.percentage) || 0),
                              0,
                            )
                            const hasEmptyFields = milestones.some((m) => !m.name.trim() || !m.percentage.trim())

                            if (hasEmptyFields) {
                              alert("请填写所有里程碑名称和回款比例")
                              return
                            }

                            if (totalPercentage !== 100) {
                              alert("回款比例总计必须为100%")
                              return
                            }

                            // 根据里程碑生成回款记录
                            const newPaymentRecords = milestones.map((milestone, index) => ({
                              id: (index + 1).toString(),
                              milestoneName: milestone.name,
                              percentage: milestone.percentage,
                              amount: "",
                              date: "",
                              proof: "",
                              proofUrl: "",
                              commission: "",
                              commissionUrl: "",
                              status: "pending",
                            }))
                            setPaymentRecords(newPaymentRecords)

                            console.log("建档信息:", milestones)
                            setCurrentStage((prev) => prev + 1) // 进入下一阶段
                            setShowFilingDialog(false)
                          }}
                          className="flex-1"
                        >
                          确认录入
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowFilingDialog(false)
                            // 重置为初始状态
                            setMilestones([{ id: 1, name: "", percentage: "" }])
                          }}
                          className="flex-1"
                        >
                          取消
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedFile?.isReplacement ? '替换文件' : '上传文件'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>文件类型</Label>
              <p className="text-sm text-gray-600">{uploadingFile}</p>
              {selectedFile?.isReplacement && (
                <p className="text-sm text-orange-600 mt-1">
                  将替换现有文件: {uploadingFile}
                </p>
              )}
            </div>
            
            {selectedFile && (
              <div className="space-y-2">
                <Label>选中的文件</Label>
                <div className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">大小: {selectedFile.size}</p>
                    </div>
                  </div>
                  {selectedFile.isReplacement && (
                    <div className="mt-2 p-2 bg-orange-50 rounded border-l-4 border-orange-200">
                      <p className="text-sm text-orange-700 font-medium">
                        替换操作
                      </p>
                      <p className="text-sm text-orange-600">
                        此操作将替换现有文件: <span className="font-medium">{uploadingFile}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {showReasonInput && (
              <div>
                <Label htmlFor="upload-reason">无法提供原因</Label>
                <Textarea
                  id="upload-reason"
                  placeholder="请说明暂时无法提供此文件的原因..."
                  value={uploadReason}
                  onChange={(e) => setUploadReason(e.target.value)}
                  rows={3}
                />
              </div>
            )}
            
            <div className="flex gap-2">
              {selectedFile ? (
                <Button onClick={handleConfirmUpload} className="flex-1">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  {selectedFile.isReplacement ? '确认替换' : '确认上传'}
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setShowReasonInput(!showReasonInput)}
                  className="flex-1"
                >
                  暂时无法提供
                </Button>
              )}
              
              {showReasonInput && (
                <Button 
                  onClick={() => {
                    if (uploadReason.trim()) {
                      setFileReasons(prev => ({
                        ...prev,
                        [uploadingFile]: uploadReason
                      }))
                      setUploadDialogOpen(false)
                      setShowReasonInput(false)
                      setUploadReason("")
                      setUploadingFile("")
                    }
                  }}
                  disabled={!uploadReason.trim()}
                >
                  提交原因
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setUploadDialogOpen(false)
                  setUploadingFile("")
                  setSelectedFile(null)
                  setShowReasonInput(false)
                  setUploadReason("")
                }}
              >
                取消
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* File View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] w-[210mm] h-[297mm]">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              文件预览
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            {selectedFile && (
              <div className="h-full flex flex-col">
                {/* File Info Header */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{selectedFile.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        大小: {selectedFile.size} | 上传时间: {selectedFile.uploadTime} | 上传者: {selectedFile.uploader}
                      </p>
                    </div>
                    <Button 
                      onClick={() => {
                        // Create download link
                        const link = document.createElement("a")
                        link.href = "/placeholder.pdf" // In real app, this would be the actual file URL
                        link.download = selectedFile.name
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        console.log(`下载文件: ${selectedFile.name}`)
                      }}
                      size="sm"
                    >
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      下载文件
                    </Button>
                  </div>
                </div>
                
                {/* File Content Preview - A4 sized content area */}
                <div className="flex-1 border rounded-lg bg-white shadow-inner overflow-auto">
                  <div className="p-8 min-h-full" style={{ width: '210mm', minHeight: '297mm' }}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedFile.content}
                    </div>
                  </div>
                </div>
                
                {/* Footer Actions */}
           
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
      {/* 文件预览 Dialog */}
      <Dialog open={!!previewFileUrl} onOpenChange={() => setPreviewFileUrl(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>文件预览</DialogTitle>
          </DialogHeader>
          {previewFileUrl && previewFileType === 'img' && (
            <img src={previewFileUrl} alt="预览" style={{ maxWidth: '100%', maxHeight: '60vh' }} />
          )}
          {previewFileUrl && previewFileType === 'pdf' && (
            <embed src={previewFileUrl} type="application/pdf" width="100%" height="600px" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
