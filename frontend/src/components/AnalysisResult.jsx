import React from "react";
import {
  CheckCircle2,
  Sparkles,
  FileText,
  ListChecks,
  ClipboardCheck,
  MessageCircle,
  Paperclip,
  BarChart3,
  Link2,
  MoreVertical,
  Copy,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

const ICONS = { FileText, ListChecks, ClipboardCheck, MessageCircle, Paperclip };

const AnalysisResult = ({ data, onRefresh }) => {
  const handleCopy = async () => {
    const text = [
      `ECR Analysis - ${data.id}`,
      "",
      data.summary,
      "",
      ...data.highlights.map((h) => `${h.label}: ${h.value}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Analysis copied to clipboard");
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  return (
    <section className="ecr-result" data-testid="analysis-result">
      {/* Header */}
      <div className="ecr-result-head">
        <div className="ecr-result-head-left">
          <div className="ecr-check">
            <CheckCircle2 size={26} strokeWidth={2} />
          </div>
          <div>
            <h2 className="ecr-result-title">ECR Analysis</h2>
            <p className="ecr-result-sub">
              Here's a consolidated view of{" "}
              <span data-testid="result-ecr-id">{data.id}</span> based on all
              available sources.
            </p>
          </div>
        </div>
        <div className="ecr-result-head-right">
          <span className="ecr-generated">
            Generated on <span className="ecr-generated-date">{data.generatedOn}</span>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ecr-icon-btn" aria-label="More options" data-testid="result-menu">
                <MoreVertical size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={handleCopy}>
                <Copy size={15} className="mr-2" /> Copy analysis
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast("Export coming soon")}>
                <Download size={15} className="mr-2" /> Export PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRefresh}>
                <RefreshCw size={15} className="mr-2" /> Re-analyze
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Summary */}
      <div className="ecr-summary" data-testid="summary-block">
        <div className="ecr-summary-icon">
          <Sparkles size={22} fill="currentColor" strokeWidth={0} />
        </div>
        <div>
          <h3 className="ecr-summary-title">Summary</h3>
          <p className="ecr-summary-text">{data.summary}</p>
        </div>
      </div>

      {/* Category cards */}
      <div className="ecr-cards" data-testid="category-cards">
        {data.categories.map((c, i) => {
          const Icon = ICONS[c.icon] || FileText;
          return (
            <div
              key={c.key}
              className={`ecr-card ecr-card--${c.color}`}
              style={{ animationDelay: `${120 + i * 60}ms` }}
              data-testid={`category-card-${c.key}`}
            >
              <div className="ecr-card-icon">
                <Icon size={22} strokeWidth={1.9} />
              </div>
              <div className="ecr-card-body">
                <div className="ecr-card-top">
                  <span className="ecr-card-title">{c.title}</span>
                  <span className="ecr-card-count">{c.count}</span>
                </div>
                <p className="ecr-card-desc">{c.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key highlights */}
      <div className="ecr-section" data-testid="key-highlights">
        <div className="ecr-section-head">
          <BarChart3 size={20} className="text-[#3b6fd0]" />
          <h3 className="ecr-section-title">Key Highlights</h3>
        </div>
        <ul className="ecr-highlights">
          {data.highlights.map((h) => (
            <li key={h.label} className="ecr-highlight">
              <span className="ecr-dot" />
              <span>
                <strong>{h.label}:</strong> {h.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sources */}
      <div className="ecr-sources" data-testid="sources">
        <div className="ecr-sources-label">
          <Link2 size={18} className="text-slate-500" />
          <span>Sources</span>
        </div>
        <div className="ecr-chips">
          {data.sources.map((s) => (
            <span key={s} className="ecr-chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalysisResult;
