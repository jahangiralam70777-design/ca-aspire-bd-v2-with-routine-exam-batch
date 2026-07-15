import { createFileRoute } from "@tanstack/react-router";
import { StudentSubjects } from "@/components/exam-batch/student-pages";
import { ExamBatchRouteErrorFallback, ExamBatchRoutePendingFallback } from "@/components/exam-batch/route-fallback";

export const Route = createFileRoute("/_student/exam-batch/subjects")({
  component: StudentSubjects,
  pendingComponent: ExamBatchRoutePendingFallback,
  errorComponent: ExamBatchRouteErrorFallback,
});
