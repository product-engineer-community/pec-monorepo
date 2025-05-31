import { getAuthSession } from "@packages/supabase";
import { redirect } from "next/navigation";

import { getAssignmentList } from "@/entities/assignment/action";
import { AssignmentGuideModal } from "@/entities/assignment/ui/AssignmentGuideModal";

interface InterceptedAssignmentPageProps {
  params: Promise<{ week: string; title: string }>;
}

export default async function InterceptedAssignmentPage({
  params,
}: InterceptedAssignmentPageProps) {
  const { week, title } = await params;
  const weekNum = parseInt(week);
  const parsedTitle = decodeURIComponent(title);

  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const assignments = await getAssignmentList(weekNum);

  const assignment = assignments.find(
    (assignment) => assignment.title === parsedTitle,
  );

  if (!assignment) {
    redirect(`/dashboard/${weekNum}`);
  }

  return (
    <AssignmentGuideModal
      userId={session.user.id}
      assignment={assignment}
      week={weekNum}
    />
  );
}
