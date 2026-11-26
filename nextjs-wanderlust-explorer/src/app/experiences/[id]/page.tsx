'use client';

import { useParams, notFound } from 'next/navigation';
import ExperienceDetail from '@/components/ExperienceDetail';
import { useMemo, Suspense } from 'react';
import { experiences } from '@/data/experiences';

export default function ExperienceDetailPage() {
  return (
    <Suspense>
      <ExperienceDetailContent />
    </Suspense>
  );
}

function ExperienceDetailContent() {
  const params = useParams();
  const id = useMemo(() => (typeof params.id === 'string' ? params.id : ''), [params.id]);

  const experience = useMemo(() => {
    return experiences.find((exp) => exp.id === id) || null;
  }, [id]);

  if (!experience) {
    notFound();
  }

  return <ExperienceDetail experience={experience} />;
}
