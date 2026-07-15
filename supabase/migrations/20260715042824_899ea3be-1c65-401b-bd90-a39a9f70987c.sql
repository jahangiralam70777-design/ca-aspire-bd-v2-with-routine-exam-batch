-- Fix: student-side Exam Batch subject picker showed "No subjects configured yet"
-- because the SELECT policy on exam_batch_session_subjects required an approved
-- enrollment. The picker runs BEFORE enrollment (it is the subject-selection
-- step of the enrollment flow), so no authenticated non-admin could ever see
-- the assigned subject list. Loosen SELECT to any authenticated user for
-- sessions that are visible/enrollable, while keeping admin access.

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname='public' AND tablename='exam_batch_session_subjects') THEN
    EXECUTE 'DROP POLICY IF EXISTS exam_batch_session_subjects_read ON public.exam_batch_session_subjects';
    EXECUTE $p$
      CREATE POLICY exam_batch_session_subjects_read
        ON public.exam_batch_session_subjects
        FOR SELECT TO authenticated
        USING (
          public.has_permission(auth.uid(), 'manage_content')
          OR EXISTS (
            SELECT 1 FROM public.exam_batch_sessions s
             WHERE s.id = exam_batch_session_subjects.session_id
               AND s.is_archived = false
               AND s.is_hidden   = false
               AND s.status      = 'active'
          )
        )
    $p$;
  END IF;
END $$;