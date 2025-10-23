import { ProjectList } from "@/components/project-list"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6 pt-6">
        <div className="mb-8">
          {/*
          <h1 className="text-3xl font-bold tracking-tight">我的项目</h1>
          <p className="text-muted-foreground">管理和跟踪所有项目进展</p>*/}
        </div>

        <ProjectList />
      </div>
    </div>
  )
}
