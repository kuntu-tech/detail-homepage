"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { TopNavigation } from "./top-navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function ProjectCreation() {
  const [formData, setFormData] = useState({
    projectName: "南昌市新建区蛋鸡养殖基地建设项目",
    establishmentDate: "2025年6月4日",
    planningInputDate: "5月8日14:30时",
    planningOutputDate: "5月11日18时",
    feasibilityDate: "5月20日20时",
    applicationDate: "9月30日18时",
    contractDate: "12月30日18时",
    repaymentDate: "5月1日18��",
  })

  const [projectCategories, setProjectCategories] = useState({
    transportation: {
      railway: false,
      highway: false,
      ruralRoads: false,
      waterTransport: false,
      civilAviation: false,
      urbanTransit: false,
      comprehensiveTransport: false,
      smartTransport: false,
      logistics: false,
      emergencyLogistics: false,
      airportExpansion: false,
      portConstruction: false,
      villageRoadConstruction: false,
      bridgeConstruction: false,
      newEnergyCharging: false,
      other: false,
    },
    energy: {
      coalMining: false,
      oilGas: false,
      powerGrid: false,
      cleanEnergy: false,
      energyStorage: false,
      other: false,
    },
    agricultureWater: {
      agriculture: false,
      forestry: false,
      waterConservancy: false,
      irrigation: false,
      floodControl: false,
      drinkingWater: false,
      other: false,
    },
    ecology: {
      pollutionControl: false,
      ecologicalRestoration: false,
      wasteManagement: false,
      hazardousWaste: false,
      carbonNeutral: false,
      healthEnvironment: false,
      other: false,
    },
    socialServices: {
      education: false,
      culture: false,
      tourism: false,
      socialServices: false,
      elderCare: false,
      other: false,
    },
    logistics: {
      coldChain: false,
      comprehensiveLogistics: false,
      emergencyLogistics: false,
      other: false,
    },
  })

  const [contactInfo, setContactInfo] = useState({
    applicant: "新建区国控集团",
    applicantContact: "雷政权",
    applicantPosition: "部长",
    applicantPhone: "13870074010",
    implementer: "新建区国控集团",
    implementerContact: "雷政权",
    implementerPosition: "部长",
    implementerPhone: "13870074010",
    projectManager: "新建",
  })

  const [investmentInfo, setInvestmentInfo] = useState({
    totalInvestment: "43000",
    governmentInvestment: "34000",
    commercialInvestment: "34000",
    debtRequirement: "1075",
    constructionPeriod: "2025年6月到2026年5月",
    startYear: "",
    startMonth: "",
    startDay: "",
  })

  const [projectDetails, setProjectDetails] = useState({
    constructionContent:
      "本项目拟建设占地面积约287亩，含建筑面积约2000平方米，项目建设内容为建���160万羽蛋鸡及40万羽育雏智慧养殖基地，配套建设综合楼、管理楼、饲养系统、饮水系统、集蛋系统、清粪系统、环控系统等。",
    fundingSource: "",
    projectNature: "",
    implementationMethod: "",
    managementLevel: "",
  })

  const [showGovernmentForm, setShowGovernmentForm] = useState(false)
  const [generationProcessOpen, setGenerationProcessOpen] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")

  const { toast } = useToast()

  // 检查是否从会议记录页面跳转过来
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const meetingId = urlParams.get("meetingId")
    const action = urlParams.get("action")

    if (meetingId === "001" && action === "establish") {
      setShowGovernmentForm(true)
    }
  }, [])

  const handleCancel = () => {
    window.history.back()
  }

  const handleCreateProject = () => {
    // 校验必填项
    const content = projectDetails.constructionContent?.trim()
    if (!content) {
      toast ? toast({ title: "请填写项目建设内容", duration: 2000, variant: "destructive" }) : alert("请填写项目建设内容")
      return
    }
    // 开始创建过程可视化
    setGenerationProcessOpen(true)
    setGenerationProgress(0)
    setGenerationStep("生成所需材料清单中...")

    const steps = [
      { progress: 25, step: "生成所需材料清单中..." },
      { progress: 50, step: "正在谋划外联单..." },
      { progress: 75, step: "正在分配Checker..." },
      { progress: 100, step: "项目创建完成！" },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setGenerationProgress(steps[currentStep].progress)
        setGenerationStep(steps[currentStep].step)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setGenerationProcessOpen(false)
          // 跳转到项目详情页面
          window.location.href = `/projects/001`
        }, 1000)
      }
    }, 1500)
  }

  const handleCategoryChange = (category: string, subcategory: string, checked: boolean) => {
    setProjectCategories((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: checked,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation currentPath="/projects/create" />

      <div className="container mx-auto p-6 pt-24">
        {/* 返回按钮 */}
        <Button variant="ghost" className="mb-6" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="grid grid-cols-2 gap-4">
                <CardTitle className="text-xl font-bold">江西省南昌市新建区</CardTitle>
                <div className="text-xl font-bold flex items-center justify-center gap-2">
                  第
                  <Input className="w-16 h-8 text-center border border-gray-200" placeholder="" />稿 共
                  <Input className="w-16 h-8 text-center border border-gray-200" placeholder="" />稿
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* 主表格 */}
              <div className="border border-gray-200">
                {/* 第一行 - 项目信息和时间计划 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 flex items-center justify-center font-medium">
                    项目名称
                  </div>
                  <div className="col-span-4 border-r border-gray-200 p-2">
                    <Input
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                  <div className="col-span-6 grid grid-cols-4">
                    <div className="bg-gray-100 border-r border-gray-200 p-1 text-xs flex items-center justify-center">
                      立项时间
                    </div>
                    <div className="border-r border-gray-200 p-1">
                      <Input
                        value={formData.planningInputDate}
                        onChange={(e) => setFormData({ ...formData, planningInputDate: e.target.value })}
                        className="border-0 p-0 h-auto bg-transparent text-xs"
                      />
                    </div>
                    <div className="bg-gray-100 border-r border-gray-200 p-1 text-xs flex items-center justify-center">
                      谋划输出计划
                    </div>
                    <div className="p-1">
                      <Input
                        value={formData.repaymentDate}
                        onChange={(e) => setFormData({ ...formData, repaymentDate: e.target.value })}
                        className="border-0 p-0 h-auto bg-transparent text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 第二行 - 可研报告计划 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 flex items-center justify-center font-medium">
                    可研报告输出时间
                  </div>
                  <div className="col-span-4 border-r border-gray-200 p-2">
                    <Input
                      value={formData.establishmentDate}
                      onChange={(e) => setFormData({ ...formData, establishmentDate: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                  <div className="col-span-6 grid grid-cols-6">
                    <div className="bg-gray-100 border-r border-gray-200 p-1 text-xs flex items-center justify-center">
                      申报计划
                    </div>
                    <div className="border-r border-gray-200 p-1">
                      <Input
                        value={formData.feasibilityDate}
                        onChange={(e) => setFormData({ ...formData, feasibilityDate: e.target.value })}
                        className="border-0 p-0 h-auto bg-transparent text-xs"
                      />
                    </div>
                    <div className="bg-gray-100 border-r border-gray-200 p-1 text-xs flex items-center justify-center">
                      合同计划
                    </div>
                    <div className="border-r border-gray-200 p-1">
                      <Input
                        value={formData.applicationDate}
                        onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                        className="border-0 p-0 h-auto bg-transparent text-xs"
                      />
                    </div>
                    <div className="bg-gray-100 border-r border-gray-200 p-1 text-xs flex items-center justify-center">
                      回款计划
                    </div>
                    <div className="p-1">
                      <Input
                        value={formData.contractDate}
                        onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })}
                        className="border-0 p-0 h-auto bg-transparent text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 商务访问回执情况 标题行 */}
                <div className="bg-gray-200 border-b border-gray-200 p-2 text-center font-medium">商务访问回执情况</div>

                {/* 项目分类表格 */}
                <div className="grid grid-cols-2">
                  {/* 左侧列 */}
                  <div className="border-r border-gray-200">
                    {/* 1. 交通基础设施 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">1. 交通基础设施</div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "railway", label: "铁路" },
                          { key: "highway", label: "收费公路" },
                          { key: "ruralRoads", label: "农村公路（不含通村工程）" },
                          { key: "waterTransport", label: "水运" },
                          { key: "civilAviation", label: "民航交通枢纽" },
                          { key: "urbanTransit", label: "城市内部交通" },
                          { key: "comprehensiveTransport", label: "城市停车场" },
                          { key: "smartTransport", label: "天然气管道和储气设施" },
                          { key: "logistics", label: "煤炭储备设施" },
                          {
                            key: "emergencyLogistics",
                            label: "综合物流枢纽、国家物流枢纽、城市配送、应急物流及网络货运服务设施",
                          },
                          { key: "airportExpansion", label: "大型风电光伏基地" },
                          { key: "portConstruction", label: "抽水蓄能电站" },
                          { key: "villageRoadConstruction", label: "村镇可再生能源供热" },
                          { key: "bridgeConstruction", label: "沿边沿海及边远地区工程" },
                          { key: "newEnergyCharging", label: "新能源汽车充电桩" },
                          { key: "other", label: "其它新能源项目" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`transport-${item.key}`}
                              checked={
                                projectCategories.transportation[
                                  item.key as keyof typeof projectCategories.transportation
                                ]
                              }
                              onChange={(e) => handleCategoryChange("transportation", item.key, e.target.checked)}
                              className="w-4 h-4"
                            />
                            <label htmlFor={`transport-${item.key}`} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. 能源 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">2. 能源</div>
                      <div className="p-2 space-y-1">
                        {[{ key: "coalMining", label: "农业" }].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`energy-${item.key}`}
                              checked={projectCategories.energy[item.key as keyof typeof projectCategories.energy]}
                              onChange={(e) => handleCategoryChange("energy", item.key, e.target.checked)}
                              className="w-4 h-4"
                            />
                            <label htmlFor={`energy-${item.key}`} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. 农林水利 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">3. 农林水利</div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "agriculture", label: "农业" },
                          { key: "forestry", label: "水利" },
                          { key: "waterConservancy", label: "林业" },
                          { key: "irrigation", label: "城镇供水收费处理" },
                          { key: "floodControl", label: "城镇垃圾收费处理" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`agri-${item.key}`}
                              checked={
                                projectCategories.agricultureWater[
                                  item.key as keyof typeof projectCategories.agricultureWater
                                ]
                              }
                              onChange={(e) => handleCategoryChange("agricultureWater", item.key, e.target.checked)}
                              className="w-4 h-4"
                            />
                            <label htmlFor={`agri-${item.key}`} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. 生态环保 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">4. 生态环保</div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "pollutionControl", label: "城镇生活水处理利用" },
                          { key: "ecologicalRestoration", label: "固体废弃物综合利用和资源循环利用" },
                          { key: "wasteManagement", label: "其它生态环保项目" },
                          { key: "hazardousWaste", label: "卫生健康（含应急医疗救治设施、公共卫生设施等）" },
                          { key: "carbonNeutral", label: "教育（学前教育和义务教育）" },
                          { key: "healthEnvironment", label: "养老" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`eco-${item.key}`}
                              checked={projectCategories.ecology[item.key as keyof typeof projectCategories.ecology]}
                              onChange={(e) => handleCategoryChange("ecology", item.key, e.target.checked)}
                              className="w-4 h-4"
                            />
                            <label htmlFor={`eco-${item.key}`} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. 社会事业 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">5. 社会事业</div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "education", label: "托育" },
                          { key: "culture", label: "文化" },
                          { key: "tourism", label: "旅游" },
                          { key: "socialServices", label: "其他社会事业" },
                          { key: "elderCare", label: "公共冷链物流设施" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`social-${item.key}`}
                              checked={
                                projectCategories.socialServices[
                                  item.key as keyof typeof projectCategories.socialServices
                                ]
                              }
                              onChange={(e) => handleCategoryChange("socialServices", item.key, e.target.checked)}
                              className="w-4 h-4"
                            />
                            <label htmlFor={`social-${item.key}`} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 6. 城乡冷链等物流基础设施 */}
                    <div>
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">
                        6. 城乡冷链等物流基础设施
                      </div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "coldChain", label: "国家物流枢纽等物流基础设施" },
                          { key: "comprehensiveLogistics", label: "应急全链物流设施" },
                          {
                            key: "emergencyLogistics",
                            label: "应急物流枢纽物流设施（含应急物流中转站、生活物资储备大仓基地）",
                          },
                          { key: "other", label: "农产品批发市场" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`logistics-${item.key}`}
                              checked={
                                projectCategories.logistics[item.key as keyof typeof projectCategories.logistics]
                              }
                              onChange={(e) => handleCategoryChange("logistics", item.key, e.target.checked)}
                              className="w-4 h-4"
                            />
                            <label htmlFor={`logistics-${item.key}`} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 右侧列 */}
                  <div>
                    {/* 7. 市政和产业园区基础设施 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">
                        7. 市政和产业园区基础设施
                      </div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "municipal1", label: "供水" },
                          { key: "municipal2", label: "排水" },
                          { key: "municipal3", label: "供热" },
                          { key: "municipal4", label: "供气" },
                          { key: "municipal5", label: "地下管廊" },
                          { key: "municipal6", label: "国家级、省级产业园区基础设施" },
                          { key: "municipal7", label: "其他产业园区基础设施" },
                          { key: "municipal8", label: "完善基础设施发展" },
                          { key: "municipal9", label: "长江经济带发展" },
                          { key: "municipal10", label: '"一带一路"建设' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input type="checkbox" id={item.key} className="w-4 h-4" />
                            <label htmlFor={item.key} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 8. 国家重大战略项目 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">8. 国家重大战略项目</div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "strategy1", label: "黄河流域高质量发展" },
                          { key: "strategy2", label: "长三角一体化发展" },
                          { key: "strategy3", label: "推进长江全流域改革开放" },
                          { key: "strategy4", label: "黄河流域生态保护和高质量发展" },
                          { key: "strategy5", label: "城镇群协同发展" },
                          { key: "strategy6", label: "国产化改造（主要支持在建和续建项目，适度支持新开工项目）" },
                          { key: "strategy7", label: "城市群发展" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input type="checkbox" id={item.key} className="w-4 h-4" />
                            <label htmlFor={item.key} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 9. 城市更新 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">9. 城市更新</div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "urban1", label: "老旧小区改造" },
                          { key: "urban2", label: "老旧厂房改造" },
                          { key: "urban3", label: "城市公共空间功能提升及其他城市更新类的设施建设" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input type="checkbox" id={item.key} className="w-4 h-4" />
                            <label htmlFor={item.key} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 10. 保障性安居工程 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">10. 保障性安居工程</div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "housing1", label: "保障性住房" },
                          { key: "housing2", label: "公共租赁住房" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input type="checkbox" id={item.key} className="w-4 h-4" />
                            <label htmlFor={item.key} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 11. 新基建设施 */}
                    <div className="border-b border-gray-200">
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">11. 新基建设施</div>
                      <div className="p-2 space-y-1 text-sm">
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
                    <div>
                      <div className="bg-gray-100 p-2 font-medium border-b border-gray-200">
                        12. 创新链、战略性新兴产业链基础设施
                      </div>
                      <div className="p-2 space-y-1">
                        {[
                          { key: "innovation1", label: "信息技术、数字经济相关产业基础设施" },
                          { key: "innovation2", label: "生物制药、生命科学相关产业基础设施" },
                          { key: "innovation3", label: "新材料科学相关产业基础设施" },
                          { key: "innovation4", label: "高端装备、战略性新兴产业基础设施" },
                          { key: "innovation5", label: "电子科技相关产业基础设施" },
                          { key: "innovation6", label: "北斗相关产业基础设施" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <input type="checkbox" id={item.key} className="w-4 h-4" />
                            <label htmlFor={item.key} className="text-sm">
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 备注行 */}
                <div className="border-b border-gray-200 p-2 text-center text-red-600 text-sm">
                  备注：以上项目可重复选择
                </div>

                {/* 联系人信息表格 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">申报主体：</div>
                  <div className="col-span-2 border-r border-gray-200 p-2">
                    <Input
                      value={contactInfo.applicant}
                      onChange={(e) => setContactInfo({ ...contactInfo, applicant: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                  <div className="col-span-1 bg-gray-100 border-r border-gray-200 p-2 text-sm">联系人：</div>
                  <div className="col-span-1 border-r border-gray-200 p-2">
                    <Input
                      value={contactInfo.applicantContact}
                      onChange={(e) => setContactInfo({ ...contactInfo, applicantContact: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                  <div className="col-span-1 bg-gray-100 border-r border-gray-200 p-2 text-sm">职务：</div>
                  <div className="col-span-1 border-r border-gray-200 p-2">
                    <Input
                      value={contactInfo.applicantPosition}
                      onChange={(e) => setContactInfo({ ...contactInfo, applicantPosition: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                  <div className="col-span-1 bg-gray-100 border-r border-gray-200 p-2 text-sm">联系电话：</div>
                  <div className="col-span-3 p-2">
                    <Input
                      value={contactInfo.applicantPhone}
                      onChange={(e) => setContactInfo({ ...contactInfo, applicantPhone: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">实施主体：</div>
                  <div className="col-span-2 border-r border-gray-200 p-2">
                    <Input
                      value={contactInfo.implementer}
                      onChange={(e) => setContactInfo({ ...contactInfo, implementer: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                  <div className="col-span-1 bg-gray-100 border-r border-gray-200 p-2 text-sm">联系人：</div>
                  <div className="col-span-1 border-r border-gray-200 p-2">
                    <Input
                      value={contactInfo.implementerContact}
                      onChange={(e) => setContactInfo({ ...contactInfo, implementerContact: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                  <div className="col-span-1 bg-gray-100 border-r border-gray-200 p-2 text-sm">职务：</div>
                  <div className="col-span-1 border-r border-gray-200 p-2">
                    <Input
                      value={contactInfo.implementerPosition}
                      onChange={(e) => setContactInfo({ ...contactInfo, implementerPosition: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                  <div className="col-span-1 bg-gray-100 border-r border-gray-200 p-2 text-sm">联系电话：</div>
                  <div className="col-span-3 p-2">
                    <Input
                      value={contactInfo.implementerPhone}
                      onChange={(e) => setContactInfo({ ...contactInfo, implementerPhone: e.target.value })}
                      className="border-0 p-0 h-auto bg-transparent"
                    />
                  </div>
                </div>

                {/* 项目性质行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">项目性质：</div>
                  <div className="col-span-2 border-r border-gray-200 p-2">
                    <Input value="新建" className="border-0 p-0 h-auto bg-transparent" />
                   
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">建筑规模：</div>
                  <div className="col-span-2 border-r border-gray-200 p-2">
                    <Input className="border-0 p-0 h-auto bg-transparent" placeholder="请输入建筑规模" />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">
                    占地面积（㎡）：
                  </div>
                  <div className="col-span-2 p-2">
                    <Input value="287亩" className="border-0 p-0 h-auto bg-transparent" />
                  </div>
                </div>

                {/* 建设地址行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium flex items-center">建设地址</div>
                  <div className="col-span-10 p-2 text-black">南昌市新建区西山镇石堎村，（以规划证信息为准）</div>
                </div>

                {/* 项目需求（资金类型）行 - 黄色背景 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">
                    项目需求（资金类型）：
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">开/竣工计划：</div>
                  <div className="col-span-2 border-r border-gray-200 p-2">
                    <Input value="2025年6月2026年5月" className="border-0 p-0 h-auto bg-transparent" />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">建设周期：</div>
                  <div className="col-span-4 p-2">
                    <Input className="border-0 p-0 h-auto bg-transparent" placeholder="请输入建设周期" />
                  </div>
                </div>

                {/* 项目是否已有融资行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">
                    项目是否已有融资：
                  </div>
                  <div className="col-span-1 border-r border-gray-200 p-2 text-center">否</div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">项目起始时间：</div>
                  <div className="col-span-2 border-r border-gray-200 p-2">
                    <Input value="2025年6月30日" className="border-0 p-0 h-auto bg-transparent" />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">重要时间节点</div>
                  <div className="col-span-3 p-2 grid grid-cols-6 gap-1 items-center">
                    <Input className="border-0 p-0 h-auto bg-transparent text-center" placeholder="年" />
                    <span className="text-center text-sm">年</span>
                    <Input className="border-0 p-0 h-auto bg-transparent text-center" placeholder="月" />
                    <span className="text-center text-sm">月</span>
                    <Input className="border-0 p-0 h-auto bg-transparent text-center" placeholder="日" />
                    <span className="text-center text-sm">备注：</span>
                  </div>
                </div>

                {/* 项目总投资行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium flex items-center">项目总投资（万元）</div>
                  <div className="col-span-1 border-r border-gray-200 p-2">
                    <Input value="43000" className="border-0 p-0 h-auto bg-transparent text-black" />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">资金需求</div>
                  <div className="col-span-1 border-r border-gray-200 p-2">
                    <Input value="34000" className="border-0 p-0 h-auto bg-transparent text-black" />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">
                    商务建议资金需求
                  </div>
                  <div className="col-span-1 border-r border-gray-200 p-2">
                    <Input value="34000" className="border-0 p-0 h-auto bg-transparent text-black" />
                  </div>
                  <div className="col-span-1 bg-gray-100 border-r border-gray-200 p-2 font-medium">报价建议</div>
                  <div className="col-span-1 p-2">
                    <Input value="10万" className="border-0 p-0 h-auto bg-transparent text-black" />
                  </div>
                </div>

                {/* 付款方式和转账行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-8"></div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">付款方式</div>
                  <div className="col-span-2 p-2 font-medium">转账</div>

                  
                </div>

                {/* 项目建设内容行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium flex items-center">项目建设内容<span className="text-red-500 ml-1">*</span></div>
                  <div className="col-span-10 p-2">
                    <Textarea
                      value="本项目拟建设占地面积约287亩，含建筑面积约2000平方米，项目建设内容为建设160万羽蛋鸡及40万羽育雏智慧养殖基地，配套建设综合楼、管理楼、饲养系统、饮水系统、集蛋系统、清粪系统、环控系统等。"
                      className="border-0 p-0 bg-transparent resize-none min-h-[60px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">收益点</div>
                  <div className="col-span-10 p-2">
                    <Textarea
                      className="border-0 p-0 bg-transparent resize-none min-h-[60px]"
                      placeholder="请输入收益点信息"
                    />
                  </div>
                </div>

                {/* 甲方诉求点行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">甲方诉求点</div>
                  <div className="col-span-4 p-2">
                    <Textarea
                      className="border-0 p-0 bg-transparent resize-none min-h-[40px]"
                      placeholder="请输入甲方诉求点"
                    />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">项目风险点</div>
                  <div className="col-span-4 p-2">
                    <Textarea
                      className="border-0 p-0 bg-transparent resize-none min-h-[40px]"
                      placeholder="请输入项目风险点"
                    />
                  </div>
                </div>

                {/* 项目难点行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">项目难点</div>
                  <div className="col-span-4 p-2">
                    <Textarea
                      className="border-0 p-0 bg-transparent resize-none min-h-[40px]"
                      placeholder="请输入项目难点"
                    />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">商务建议</div>
                  <div className="col-span-4 p-2">
                    <Textarea
                      className="border-0 p-0 bg-transparent resize-none min-h-[40px]"
                      placeholder="请输入商务建议"
                    />
                  </div>
                </div>

                {/* 项目驱动方式行 */}
                <div className="border-b border-gray-200">
                  <div className="grid grid-cols-12">
                    <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-4 font-medium ">
                      项目驱动方式：
                    </div>
                    <div className="col-span-10 grid grid-cols-2">
                      <div className="border-r border-gray-200">
                        <div className="grid grid-cols-2 border-b border-gray-200">
                          <div className="bg-gray-100 p-2 font-medium">主动拜访对象：</div>
                        </div>
                        <div className="p-2">
                          <Input
                            value="中标 2条线 3个部门1 4财政 5发改 省发改委财政厅__5"
                            className="border-0 p-0 h-auto bg-transparent text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="bg-gray-100 border-b border-gray-200 p-2 font-medium">项目现场调研次数：</div>
                        <div className="p-2 grid grid-cols-3 gap-2 items-center">
                          <Input className="border-0 p-0 h-auto bg-transparent text-center" placeholder="输入次数" />
                          <span className="text-center">次</span>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-2"></div>
                    <div className="col-span-10 grid grid-cols-2">
                      <div className="border-r border-gray-200">
                        <div className="grid grid-cols-2 border-b border-gray-200">
                          <div className="bg-gray-100 p-2 font-medium">被动项目提供者：</div>
                        </div>

                        <div className="col-span-1 p-2">
                          <Input
                            value="中标 2条线 3个部门1 4财政 5发改 省发改委财政厅"
                            className="border-0 p-0 h-auto bg-transparent text-sm"
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>

                {/* 是否需要进行成本收益台账行 */}
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">
                    是否需要进行成本收益台账
                  </div>
                  <div className="col-span-1 p-2">
                    <Input className="border-0 p-0 h-auto bg-transparent" placeholder="请填写" />
                  </div>

                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">
                    需要工程造价估算
                  </div>
                  <div className="col-span-1 p-2">
                    <Input className="border-0 p-0 h-auto bg-transparent" placeholder="请填写" />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">
                    需要项目收益估算
                  </div>
                  <div className="col-span-1 p-2">
                    <Input className="border-0 p-0 h-auto bg-transparent" placeholder="请填写" />
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-gray-200">
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">
                    申请资金内容规模数据整合台账
                  </div>
                  <div className="col-span-1 p-2">
                    <Input className="border-0 p-0 h-auto bg-transparent" placeholder="请填写" />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">其它支持</div>
                  <div className="col-span-1 p-2">
                    <Input className="border-0 p-0 h-auto bg-transparent" placeholder="请填写" />
                  </div>
                  <div className="col-span-2 bg-gray-100 border-r border-gray-200 p-2 font-medium">备注</div>
                  <div className="col-span-1 p-2">
                    <Input className="border-0 p-0 h-auto bg-transparent" placeholder="请填写" />
                  </div>
                </div>

               
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end gap-4 p-6">
                <Button variant="outline" onClick={handleCancel} size="lg">
                  取消
                </Button>
                <Button onClick={handleCreateProject} size="lg" className="bg-black hover:bg-gray-800 text-white">
                  创建项目
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 创建过程可视化对话框 */}
      <Dialog open={generationProcessOpen} onOpenChange={setGenerationProcessOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>项目创建中</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {generationStep}
            <progress value={generationProgress} max="100" className="w-full h-2 mt-4"></progress>
          </DialogDescription>
        </DialogContent>
      </Dialog>




    
    </div>
  )
}
