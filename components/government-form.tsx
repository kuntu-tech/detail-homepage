"use client"

import { Input } from "@/components/ui/input"

interface GovernmentFormProps {
  formData: {
    projectName: string
    constructionContent: string
    projectDuration: string
    totalInvestment: string
    debtRequirement: string
  }
  onFormDataChange: (field: string, value: string) => void
}

export function GovernmentForm({ formData, onFormDataChange }: GovernmentFormProps) {
  return (
    <div className="bg-white border border-gray-300 max-w-6xl mx-auto">
      {/* Header Table */}
      <table className="w-full border-collapse border border-gray-400 text-sm">
        <tbody>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-20">项目名称</td>
            <td className="border border-gray-400 px-2 py-1 w-60">
              <Input
                value={formData.projectName}
                onChange={(e) => onFormDataChange("projectName", e.target.value)}
                placeholder="请输入项目名称"
                className="border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                required
              />
              <span className="text-red-500 text-xs">*必填</span>
            </td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-20">内部输入时间</td>
            <td className="border border-gray-400 px-2 py-1 w-24">5月8日14:30 时</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-20">外部输入计划</td>
            <td className="border border-gray-400 px-2 py-1 w-24">5月1日18 时</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-20">外部输出计划</td>
            <td className="border border-gray-400 px-2 py-1 w-24">5月1日18 时</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">可研报告审计</td>
            <td className="border border-gray-400 px-2 py-1">2025 年 5月4日</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">申报计划</td>
            <td className="border border-gray-400 px-2 py-1">5月20日09 时</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">合同计划</td>
            <td className="border border-gray-400 px-2 py-1">8月30日09时</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">回款计划</td>
            <td className="border border-gray-400 px-2 py-1">12月30日18时</td>
          </tr>
        </tbody>
      </table>

      {/* Main Content Section */}
      <div className="bg-blue-100 text-center py-2 font-bold text-lg border-x border-gray-400">商务访问团执情报</div>

      {/* Two Column Layout */}
      <div className="flex border-x border-gray-400">
        {/* Left Column */}
        <div className="w-1/2 border-r border-gray-400">
          <table className="w-full border-collapse text-xs">
            <tbody>
              {/* 1. 交通基础设施 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium w-4">1.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium w-20">交通基础设施</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>铁路</div>
                    <div>收费公路</div>
                    <div>民用机场（不含通用工程）</div>
                    <div>水运</div>
                    <div>综合交通枢纽</div>
                    <div>城市轨道交通</div>
                    <div>城市停车场</div>
                    <div>天然气管网和储气设施</div>
                    <div>煤炭储备设施</div>
                    <div>城乡电网（农村电网改造升级、城市配电网、边远地区农网供电能源微电网）</div>
                    <div>大型风光电基地</div>
                  </div>
                </td>
              </tr>

              {/* 2. 能源 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">2.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">能源</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>抽水蓄能电站</div>
                    <div>村镇可再生能源供热</div>
                    <div>深远海风电及其送出工程</div>
                    <div>新能源汽车充电桩</div>
                    <div>其它新能源项目</div>
                  </div>
                </td>
              </tr>

              {/* 3. 农林水利 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">3.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">农林水利</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>农业</div>
                    <div>水利</div>
                    <div>林业</div>
                    <div>城镇污水收集处理</div>
                    <div>城镇生活收集处理</div>
                  </div>
                </td>
              </tr>

              {/* 4. 生态环保 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">4.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">生态环保</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>城镇排污水收集利用</div>
                    <div>固体废弃物综合利用和资源循环利用</div>
                    <div>其它生态环保类项目</div>
                    <div>卫生健康（含���疗废物处置设施、公共卫生设施等）</div>
                    <div>教育（���前教育和职业教育）</div>
                    <div>养老</div>
                  </div>
                </td>
              </tr>

              {/* 5. 社会事业 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">5.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">社会事业</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>托育</div>
                    <div>文化</div>
                    <div>旅游</div>
                    <div>其他社会事业</div>
                    <div>城乡冷链物流设施</div>
                  </div>
                </td>
              </tr>

              {/* 6. 城乡冷链物流基础设施 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">6.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">城乡冷链物流基础设施</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>国家物流枢纽物流基础设施</div>
                    <div>粮食仓储物流设施</div>
                    <div>应急物资综合物流设施（含应急物资中转站、生活物资调度大仓基地）</div>
                    <div>农���品批发市场</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column */}
        <div className="w-1/2">
          <table className="w-full border-collapse text-xs">
            <tbody>
              {/* 7. 市政和产业园区基础设施 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium w-4">7.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium w-24">市政和产业园区基础设施</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>供水</div>
                    <div>排水</div>
                    <div>供热</div>
                    <div>供气</div>
                    <div>地下管廊</div>
                    <div>园区热、省级产业园区基础设施</div>
                    <div>其他产业园区基础设施</div>
                    <div>京津冀协同发展</div>
                    <div>长江经济带发展</div>
                    <div>"一带一路"建设</div>
                  </div>
                </td>
              </tr>

              {/* 8. 国家重大战略区 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">8.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">国家重大战略区</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>粤港澳大湾区建设</div>
                    <div>长三角一体化发展</div>
                    <div>��进��南全面深化改革开放</div>
                    <div>黄河流域生态保护和高质量发展</div>
                    <div>城镇老旧小区改造</div>
                    <div>园区改造（主要支持在建改造项目，适度支持新开工项目）</div>
                  </div>
                </td>
              </tr>

              {/* 9. 城市更新 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">9.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">城市更新</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>城中村改造</div>
                    <div>老旧园区改造</div>
                    <div>老旧厂房改造</div>
                    <div>城市公共空间功能提升及其他城市更新基础设施配套建设</div>
                  </div>
                </td>
              </tr>

              {/* 10. 保障性安居工程 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">10.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">保障性安居工程</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>保障性住房</div>
                    <div>公共租赁住房</div>
                    <div>市政、公共服务等配套生活基础设施化</div>
                  </div>
                </td>
              </tr>

              {/* 11. 新型基础设施 */}
              <tr>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">11.</td>
                <td className="border-b border-gray-300 px-2 py-1 font-medium">新型基础设施</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  <div className="space-y-0.5">
                    <div>云计算、数据中心、工业互联网、人工智能、算力设施及智能应用等基础设施</div>
                    <div>5G站、港口、高速公路、机场等传统基础设施数字化、智能化改造</div>
                    <div>园区级、省级公共技术服务和数字化转型促进中心</div>
                  </div>
                </td>
              </tr>

              {/* 12. 前沿性、战略性新兴产业基础设施 */}
              <tr>
                <td className="px-2 py-1 font-medium">12.</td>
                <td className="px-2 py-1 font-medium">前沿性、战略性新兴产业基础设施</td>
                <td className="px-2 py-1">
                  <div className="space-y-0.5">
                    <div>合成生物产业政策的重大基础设施产业配套基础设施</div>
                    <div>信���技术、数字经济相关产业基础设施</div>
                    <div>生物制药、生命科学相关产业基础设施</div>
                    <div>新材料相关产业基础设施</div>
                    <div>商业航天、卫星经济相关产业���础设施</div>
                    <div>量子技术相关产业基础设施</div>
                    <div>北斗相关产业基础设施</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-right text-red-600 text-xs px-2 py-1 border-b border-gray-300">
            备注：以上领域内容仅供参考
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <table className="w-full border-collapse border-t border-gray-400 text-sm">
        <tbody>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-16">申报主体:</td>
            <td className="border border-gray-400 px-2 py-1 w-32">新建区国控集团</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-16">联系人:</td>
            <td className="border border-gray-400 px-2 py-1 w-20">徐院欣</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-12">职务:</td>
            <td className="border border-gray-400 px-2 py-1 w-16">部长</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-16">联系电话:</td>
            <td className="border border-gray-400 px-2 py-1">13870074110</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">实施主体:</td>
            <td className="border border-gray-400 px-2 py-1">新建区国控集团</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">联系人:</td>
            <td className="border border-gray-400 px-2 py-1">徐院欣</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">职务:</td>
            <td className="border border-gray-400 px-2 py-1">部长</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">联系电话:</td>
            <td className="border border-gray-400 px-2 py-1">13870074110</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">项目性质:</td>
            <td className="border border-gray-400 px-2 py-1">新建</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">建设规模:</td>
            <td className="border border-gray-400 px-2 py-1" colSpan={5}>
              占地面积（m²）: 287亩
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">建设地址:</td>
            <td className="border border-gray-400 px-2 py-1" colSpan={7}>
              南昌市新建区西山镇石堎村（以规划部门确定为准）
            </td>
          </tr>
        </tbody>
      </table>

      {/* Project Details Section */}
      <table className="w-full border-collapse border-t border-gray-400 text-sm">
        <tbody>
          <tr className="bg-yellow-100">
            <td className="border border-gray-400 px-2 py-1 font-medium">项目概要（简要类型）:</td>
            <td className="border border-gray-400 px-2 py-1">
              <Input
                value={formData.projectDuration}
                onChange={(e) => onFormDataChange("projectDuration", e.target.value)}
                placeholder="开/竣工计划: 2025年6月2026年5月"
                className="border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                required
              />
              <span className="text-red-500 text-xs">*必填</span>
            </td>
            <td className="border border-gray-400 px-2 py-1 font-medium">建设期限:</td>
            <td className="border border-gray-400 px-2 py-1" colSpan={4}></td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1 font-medium">���目资金已筹备数:</td>
            <td className="border border-gray-400 px-2 py-1">
              <div>总</div>
              <div>投 资金额合数XX万元</div>
            </td>
            <td className="border border-gray-400 px-2 py-1">
              <div>项目起始时间: 2025年6月30日</div>
            </td>
            <td className="border border-gray-400 px-2 py-1">
              <div>重要时间节点</div>
              <div className="ml-8">年 月 日 备注:</div>
            </td>
            <td className="border border-gray-400 px-2 py-1" colSpan={4}></td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">项目总投资</td>
            <td className="border border-gray-400 px-2 py-1">
              <Input
                value={formData.totalInvestment}
                onChange={(e) => onFormDataChange("totalInvestment", e.target.value)}
                placeholder="43000"
                className="border-0 p-0 h-auto bg-transparent focus-visible:ring-0 mb-1"
                required
              />
              <span className="text-red-500 text-xs">*必填</span>
              <br />
              <span className="text-xs">(万元)</span>
            </td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">资金来源</td>
            <td className="border border-gray-400 px-2 py-1">34000</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">商务建议资金来源</td>
            <td className="border border-gray-400 px-2 py-1">34000</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">资价建议</td>
            <td className="border border-gray-400 px-2 py-1">
              <Input
                value={formData.debtRequirement}
                onChange={(e) => onFormDataChange("debtRequirement", e.target.value)}
                placeholder="10万"
                className="border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                required
              />
              <span className="text-red-500 text-xs">*必填</span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1" colSpan={4}></td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">付款方式</td>
            <td className="border border-gray-400 px-2 py-1">转账</td>
            <td className="border border-gray-400 px-2 py-1" colSpan={2}></td>
          </tr>
        </tbody>
      </table>

      {/* Project Content Section */}
      <table className="w-full border-collapse border-t border-gray-400 text-sm">
        <tbody>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-20">项目建设内容</td>
            <td className="border border-gray-400 px-2 py-1">
              <Input
                value={formData.constructionContent}
                onChange={(e) => onFormDataChange("constructionContent", e.target.value)}
                placeholder="本项目拟建设占地面积约287亩，含建筑面积约2000平方米，项目建设内容为建设160万羽蛋鸡及40万羽育雏智慧养殖基地，配套建设综合楼、管理楼、饲养系统、饮水系统、集蛋系统、清粪系统、环控系统等。本项目拟建设占地面积约287亩，含建筑面积约2000平方米，项目建设内容为建设160万羽蛋鸡及40万羽育雏智慧养殖基地，配套建设综合楼、管理楼、饲养系统、饮水系统、集蛋系统、清粪系统、环控系统等。"
                className="border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                required
              />
              <span className="text-red-500 text-xs">*必填</span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">地方承诺</td>
            <td className="border border-gray-400 px-2 py-1">收益性</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium">项目效益</td>
            <td className="border border-gray-400 px-2 py-1">商务建议</td>
          </tr>
        </tbody>
      </table>

      {/* Project Implementation Section */}
      <table className="w-full border-collapse border-t border-gray-400 text-sm">
        <tbody>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-20">项目实施方案:</td>
            <td className="border border-gray-400 px-2 py-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium">主动</div>
                  <div className="mt-2">被动</div>
                </div>
                <div>
                  <div>
                    <span className="font-medium">开办对象:</span>
                    <div className="mt-1">1中位 2县区 3行政部门 4部级 5改区清理精神子___5</div>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium">项目县级管理:</span>
                    <div className="mt-1">1中位 2县区 3行政部门 4部级 5改区清理精神子___5</div>
                  </div>
                </div>
              </div>
            </td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-24">项目县级管理次数:</td>
            <td className="border border-gray-400 px-2 py-1 w-16">___次</td>
          </tr>
        </tbody>
      </table>

      {/* Final Section */}
      <table className="w-full border-collapse border-t border-gray-400 text-sm">
        <tbody>
          <tr>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-32">是否需要进行技术改造台账</td>
            <td className="border border-gray-400 px-2 py-1 w-32">需要项目设备台账管理</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-32">
              申万资金内容规模数据整合台账
            </td>
            <td className="border border-gray-400 px-2 py-1 w-32">其它支持</td>
            <td className="border border-gray-400 px-2 py-1 bg-gray-100 font-medium w-16">备注:</td>
            <td className="border border-gray-400 px-2 py-1"></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
