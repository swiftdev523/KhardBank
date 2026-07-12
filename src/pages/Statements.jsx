import { FileText, Download } from "lucide-react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/layout/TopBar";
import PageContainer from "../components/layout/PageContainer";

export default function Statements() {
  const { statements } = useApp();

  return (
    <>
      <TopBar
        title="Statements"
        subtitle="Download your monthly account statements"
      />
      <PageContainer>
        <div className="card divide-y divide-slate/10">
          {statements.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-4 p-4 md:p-5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="rounded-lg bg-paper p-2.5 text-brass shrink-0">
                  <FileText size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{s.label}</p>
                  <p className="mono text-xs text-slate truncate">
                    {s.filename}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => console.log(`Downloading ${s.filename}`)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brass text-brass px-3 py-2 text-sm font-medium hover:bg-brass/10 transition-colors shrink-0">
                <Download size={15} aria-hidden="true" />
                Download
              </button>
            </div>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
