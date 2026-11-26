import { Suspense } from "react";
import ExperiencesExplorer from "@/components/ExperiencesExplorer";

export default function ExperiencesPage() {
  return (
    <main>
      <Suspense fallback={<p role="status">Cargando experiencias...</p>}>
        <ExperiencesExplorer />
      </Suspense>
    </main>
  );
}
