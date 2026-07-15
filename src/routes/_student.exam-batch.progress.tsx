import { createFileRoute } from "@tanstack/react-router";
import { StudentProgress } from "@/components/exam-batch/student-pages";
import { ExamBatchRouteErrorFallback, ExamBatchRoutePendingFallback } from "@/components/exam-batch/route-fallback";

export const Route = createFileRoute("/_student/exam-batch/progress")({
  component: StudentProgress,
  pendingComponent: ExamBatchRoutePendingFallback,
  errorComponent: ExamBatchRouteErrorFallback,
});
