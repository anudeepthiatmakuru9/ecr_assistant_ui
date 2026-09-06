import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import Header from "./components/Header";
import SearchCard from "./components/SearchCard";
import AnalysisResult from "./components/AnalysisResult";
import { mockUser, getMockAnalysis } from "./mock";

const DEFAULT_ID = "ECR-2025-10432";

const Home = () => {
  const [ecrId, setEcrId] = useState(DEFAULT_ID);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(() => getMockAnalysis(DEFAULT_ID));
  const [resultKey, setResultKey] = useState(0);

  const analyze = () => {
    const id = ecrId.trim();
    if (!id) {
      toast.error("Please enter an ECR ID");
      return;
    }
    if (!/^ECR-\d{4}-\d{3,6}$/i.test(id)) {
      toast.error("Invalid format. Use ECR-YYYY-NNNNN, e.g. ECR-2025-10432");
      return;
    }
    setLoading(true);
    setResult(null);
    // Simulated retrieval + AI correlation (mocked)
    setTimeout(() => {
      setResult(getMockAnalysis(id));
      setResultKey((k) => k + 1);
      setLoading(false);
      toast.success(`Analysis ready for ${id.toUpperCase()}`);
    }, 1300);
  };

  return (
    <div className="ecr-page">
      <Header user={mockUser} />

      <main className="ecr-main">
        <div className="ecr-hero">
          <h1 className="ecr-hero-title">ECR Assistant</h1>
          <p className="ecr-hero-sub">Get a complete analysis of any ECR in seconds</p>
          <p className="ecr-hero-desc">
            We retrieve information from across enterprise systems, correlate it, and use AI to
            give you a clear, source-backed answer.
          </p>
        </div>

        <SearchCard value={ecrId} onChange={setEcrId} onSubmit={analyze} loading={loading} />

        {loading && (
          <div className="ecr-loading" data-testid="loading-state">
            <div className="ecr-loading-bar" />
            <div className="ecr-loading-steps">
              <span>Retrieving from ECR System</span>
              <span>Correlating requirements &amp; tests</span>
              <span>Generating AI summary</span>
            </div>
          </div>
        )}

        {result && !loading && (
          <AnalysisResult key={resultKey} data={result} onRefresh={analyze} />
        )}
      </main>

      <Toaster position="bottom-right" richColors />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
