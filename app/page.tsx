import { TopNavigation } from "@/components/top-navigation"
import { ProjectList } from "@/components/project-list"
import { Dashboard } from "@/components/dashboard"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation currentPath="/" />

      <main className="pt-16">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          
        </div>

        {/* Project List Section */}
        <div className="container mx-auto px-4 leading-4 py-0">
          <div className="mb-6">
            
            
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <ProjectList />
          </div>
        </div>

        {/* Dashboard Overview Section */}
        
      </main>
    </div>
  )
}
