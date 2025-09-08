"use client"

import { useState } from "react"
import { ProjectManagement } from "./project-management"

const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "项目概览" },
    { id: "progress", label: "任务进展" },
    { id: "management", label: "项目管理" },
    { id: "documents", label: "文档管理" },
    { id: "meetings", label: "会议记录" },
  ]

  return (
    <div className="project-detail">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === "overview" && <div className="space-y-6">{/* 项目概览内容 */}</div>}
        {activeTab === "progress" && <div className="space-y-6">{/* 任务进展内容 */}</div>}
        {activeTab === "management" && (
          <div className="space-y-6">
            <ProjectManagement />
          </div>
        )}
        {activeTab === "documents" && <div className="space-y-6">{/* 文档管理内容 */}</div>}
        {activeTab === "meetings" && <div className="space-y-6">{/* 会议记录内容 */}</div>}
      </div>
    </div>
  )
}

export default ProjectDetail
