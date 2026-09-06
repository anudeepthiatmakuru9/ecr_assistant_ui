import React from "react";
import { FileText, Sparkles, Loader2 } from "lucide-react";

const SearchCard = ({ value, onChange, onSubmit, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <section className="ecr-search" data-testid="search-card">
      <div className="ecr-search-icon">
        <FileText size={22} strokeWidth={1.75} />
      </div>
      <div className="ecr-search-body">
        <label htmlFor="ecr-id" className="ecr-search-label">
          Enter ECR ID
        </label>
        <div className="ecr-search-row">
          <input
            id="ecr-id"
            data-testid="ecr-id-input"
            className="ecr-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ECR-2025-10432"
            autoComplete="off"
          />
          <button
            className="ecr-btn-primary"
            onClick={onSubmit}
            disabled={loading}
            data-testid="analyze-button"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
            <span>{loading ? "Analyzing…" : "Analyze ECR"}</span>
          </button>
        </div>
        <div className="ecr-search-hint">Example: ECR-2025-10432</div>
      </div>
    </section>
  );
};

export default SearchCard;
