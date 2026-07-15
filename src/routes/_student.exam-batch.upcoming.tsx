import { createFileRoute } from "@tanstack/react-router";
import { StudentUpcoming } from "@/components/exam-batch/student-pages";
import { ExamBatchRouteErrorFallback, ExamBatchRoutePendingFallback } from "@/components/exam-batch/route-fallback";

export const Route = createFileRoute("/_student/exam-batch/upcoming")({
  component: StudentUpcoming,
  pendingComponent: ExamBatchRoutePendingFallback,
  errorComponent: ExamBatchRouteErrorFallback,
});
