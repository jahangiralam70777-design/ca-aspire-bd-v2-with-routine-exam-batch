import { createFileRoute } from "@tanstack/react-router";
import { StudentLeaderboard } from "@/components/exam-batch/student-pages";
import { ExamBatchRouteErrorFallback, ExamBatchRoutePendingFallback } from "@/components/exam-batch/route-fallback";

export const Route = createFileRoute("/_student/exam-batch/leaderboard")({
  component: StudentLeaderboard,
  pendingComponent: ExamBatchRoutePendingFallback,
  errorComponent: ExamBatchRouteErrorFallback,
});
