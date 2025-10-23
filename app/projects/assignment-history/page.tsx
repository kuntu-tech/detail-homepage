import { AssignmentHistory } from "@/components/assignment-history"
import { TopNavigation } from "@/components/top-navigation"

export default function AssignmentHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavigation currentPath="/projects/assignment-history" />
      <div className="container mx-auto p-6 pt-24">
        <AssignmentHistory />
      </div>
    </div>
  )
}
