import { Link, useRouter } from "@tanstack/react-router";
import { AlertTriangle, Loader2 } from "lucide-react";

export function ExamBatchRoutePendingFallback() {
  return (
    <div className="flex min-h-[32vh] items-center justify-center px-4 py-8" role="status" aria-live="polite">
      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      <span className="sr-only">Loading Exam Batch…</span>
    </div>
  );
}

export function ExamBatchRouteErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const message = error?.message?.slice(0, 220) || "We couldn't load this Exam Batch page.";

  return (
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center gap-3 rounded-3xl border border-border/60 bg-background/60 p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">Exam Batch is momentarily unavailable</h2>
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            reset();
            void router.invalidate();
          }}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </button>
        <Link
          to="/exam-batch/sessions"
          className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-background/60 px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent"
        >
          Back to sessions
        </Link>
      </div>
    </div>
  );
}