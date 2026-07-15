import { createFileRoute } from "@tanstack/react-router";
import { StudentLeaderboardPdfPreview } from "@/components/exam-batch/student-pages";
import { ExamBatchRouteErrorFallback, ExamBatchRoutePendingFallback } from "@/components/exam-batch/route-fallback";

export const Route = createFileRoute("/_student/exam-batch/leaderboard/preview")({
  component: StudentLeaderboardPdfPreview,
  pendingComponent: ExamBatchRoutePendingFallback,
  errorComponent: ExamBatchRouteErrorFallback,
  head: () => ({
    meta: [
      { title: "Leaderboard PDF Preview · Exam Batch" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content: "Printable leaderboard preview for the current Exam Batch session.",
      },
    ],
  }),
});