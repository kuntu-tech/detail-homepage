import { MeetingDetail } from "@/components/meeting-detail"

export default function MeetingDetailPage({ params }: { params: { id: string } }) {
  return <MeetingDetail meetingId={params.id} />
}
