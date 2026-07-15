// Client-side prewarm cache for the Exam Batch "Continue Exam" flow.
//
// When a student taps "Continue" (or "Start Exam") we kick off the initial
// server calls IMMEDIATELY — in parallel with the route-chunk download and
// the actual navigation — instead of waiting until the ExamInterface
// component mounts and its bootstrap useEffect runs. On mobile / slow
// networks this removes one full server round-trip from the perceived
// critical path between click and the first question rendering.
//
// The cache is a module-level Map keyed by attemptId (or a synthetic
// "start:<examId>" key for the start case). ExamInterface's bootstrap
// consumes the promise if present; if it's missing (direct URL entry,
// refresh) the bootstrap falls back to fetching itself. No behaviour
// change on failure — errors from the prewarm are re-thrown by the
// consumer exactly as if the fetch had happened in the component.

import {
  getExamBatchAttemptState,
  startOrResumeExamBatchAttempt,
} from "@/lib/exam-batch";
import type { AttemptStateView } from "@/lib/exam-batch";

type StartResult = { attemptId: string; resumed: boolean };

const stateCache = new Map<string, Promise<AttemptStateView>>();
const startCache = new Map<string, Promise<StartResult>>();

/**
 * Kick off `getExamBatchAttemptState({attemptId, index:0})` in the
 * background and remember the promise. Safe to call multiple times —
 * subsequent calls reuse the in-flight promise.
 */
export function prewarmExamState(attemptId: string): Promise<AttemptStateView> {
  const existing = stateCache.get(attemptId);
  if (existing) return existing;
  const p = getExamBatchAttemptState({ data: { attemptId, index: 0 } }).catch(
    (err: unknown) => {
      // Drop the cache entry on error so a subsequent retry re-fetches
      // instead of surfacing a stale rejection.
      stateCache.delete(attemptId);
      throw err;
    },
  );
  stateCache.set(attemptId, p);
  return p;
}

/**
 * Consume (and clear) any prewarmed state promise for an attempt.
 * ExamInterface calls this once during bootstrap.
 */
export function consumeExamState(
  attemptId: string,
): Promise<AttemptStateView> | null {
  const p = stateCache.get(attemptId);
  if (p) stateCache.delete(attemptId);
  return p ?? null;
}

/**
 * Kick off `startOrResumeExamBatchAttempt({examId})` in the background.
 * The RPC is idempotent (resumes any in-progress attempt for this
 * exam/user, otherwise creates one), so it is safe to fire on click
 * before navigating.
 */
export function prewarmExamStart(examId: string): Promise<StartResult> {
  const existing = startCache.get(examId);
  if (existing) return existing;
  const p = startOrResumeExamBatchAttempt({ data: { examId } }).catch(
    (err: unknown) => {
      startCache.delete(examId);
      throw err;
    },
  );
  startCache.set(examId, p);
  return p;
}

export function consumeExamStart(
  examId: string,
): Promise<StartResult> | null {
  const p = startCache.get(examId);
  if (p) startCache.delete(examId);
  return p ?? null;
}
