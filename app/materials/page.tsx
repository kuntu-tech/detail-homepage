import { MaterialsManagement } from "@/components/materials-management"
import { TopNavigation } from "@/components/top-navigation"

export default function MaterialsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavigation currentPath="/materials" />
      <div className="container mx-auto p-6 pt-24">
        <MaterialsManagement />
      </div>
    </div>
  )
}
