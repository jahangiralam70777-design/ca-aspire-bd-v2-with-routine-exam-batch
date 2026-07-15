import { createFileRoute } from "@tanstack/react-router";
import { StudentEnrollment } from "@/components/exam-batch/student-pages";
import { ExamBatchRouteErrorFallback, ExamBatchRoutePendingFallback } from "@/components/exam-batch/route-fallback";

export const Route = createFileRoute("/_student/exam-batch/enrollment")({
  component: StudentEnrollment,
  pendingComponent: ExamBatchRoutePendingFallback,
  errorComponent: ExamBatchRouteErrorFallback,
});
