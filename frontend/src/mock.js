// Mock data for ECR Assistant - to be replaced by backend API later

export const mockUser = {
  name: "Anu",
  initial: "A",
};

export const mockEcrDatabase = {
  "ECR-2025-10432": {
    id: "ECR-2025-10432",
    generatedOn: "6 Sep 2025, 5:12 PM",
    summary:
      "ECR-2025-10432 addresses a defect in the payment service where duplicate transactions are created under high load conditions. The issue has been reproduced, root cause is identified, and a fix is currently in development. Target release is v2.5.1.",
    categories: [
      {
        key: "details",
        title: "ECR Details",
        description: "Basic information, status, owners",
        count: 1,
        icon: "FileText",
        color: "blue",
      },
      {
        key: "requirements",
        title: "Requirements",
        description: "Linked business & functional requirements",
        count: 3,
        icon: "ListChecks",
        color: "green",
      },
      {
        key: "tests",
        title: "Test Cases",
        description: "Linked test cases and results",
        count: 5,
        icon: "ClipboardCheck",
        color: "purple",
      },
      {
        key: "comments",
        title: "Comments",
        description: "Key discussion points and decisions",
        count: 12,
        icon: "MessageCircle",
        color: "orange",
      },
      {
        key: "evidence",
        title: "Evidence",
        description: "Logs, screenshots, attachments",
        count: 4,
        icon: "Paperclip",
        color: "gray",
      },
    ],
    highlights: [
      { label: "Current Status", value: "In Development" },
      { label: "Priority", value: "High" },
      { label: "Impact", value: "Payment failures and duplicate transactions for some users" },
      { label: "Root Cause", value: "Race condition in transaction idempotency check" },
      { label: "Fix Details", value: "Code changes committed (PR #5678), under QA validation" },
      { label: "Target Release", value: "v2.5.1" },
      { label: "Related Systems", value: "Payment Service, Order Management, Notification Service" },
    ],
    sources: [
      "ECR System",
      "Requirements Management",
      "Test Management",
      "Collaboration Tool",
      "Document Repository",
    ],
  },
  "ECR-2025-10871": {
    id: "ECR-2025-10871",
    generatedOn: "12 Sep 2025, 11:04 AM",
    summary:
      "ECR-2025-10871 tracks intermittent login failures in the identity service caused by expired refresh tokens not being rotated correctly. The defect has been triaged, a patch is under code review, and regression tests are being extended. Target release is v3.1.0.",
    categories: [
      { key: "details", title: "ECR Details", description: "Basic information, status, owners", count: 1, icon: "FileText", color: "blue" },
      { key: "requirements", title: "Requirements", description: "Linked business & functional requirements", count: 2, icon: "ListChecks", color: "green" },
      { key: "tests", title: "Test Cases", description: "Linked test cases and results", count: 8, icon: "ClipboardCheck", color: "purple" },
      { key: "comments", title: "Comments", description: "Key discussion points and decisions", count: 7, icon: "MessageCircle", color: "orange" },
      { key: "evidence", title: "Evidence", description: "Logs, screenshots, attachments", count: 6, icon: "Paperclip", color: "gray" },
    ],
    highlights: [
      { label: "Current Status", value: "In Code Review" },
      { label: "Priority", value: "Critical" },
      { label: "Impact", value: "Users randomly logged out; ~2% of daily sessions affected" },
      { label: "Root Cause", value: "Refresh token rotation skipped when clock skew exceeds 30s" },
      { label: "Fix Details", value: "Token rotation logic hardened (PR #6021), awaiting approval" },
      { label: "Target Release", value: "v3.1.0" },
      { label: "Related Systems", value: "Identity Service, API Gateway, Mobile App" },
    ],
    sources: ["ECR System", "Requirements Management", "Test Management", "Collaboration Tool"],
  },
};

// Generic fallback for any other ECR ID so the demo always returns something
export const buildGenericAnalysis = (id) => {
  const now = new Date();
  const generatedOn = now.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).replace(",", ",");
  return {
    ...mockEcrDatabase["ECR-2025-10432"],
    id,
    generatedOn,
    summary: `${id} addresses a reported defect that is currently being investigated by the engineering team. Initial triage is complete, reproduction steps are documented, and root cause analysis is in progress. A target release will be assigned once the fix scope is confirmed.`,
    highlights: [
      { label: "Current Status", value: "Under Investigation" },
      { label: "Priority", value: "Medium" },
      { label: "Impact", value: "Limited to a subset of users; no data loss reported" },
      { label: "Root Cause", value: "Pending root cause analysis" },
      { label: "Fix Details", value: "Not yet started" },
      { label: "Target Release", value: "TBD" },
      { label: "Related Systems", value: "To be determined" },
    ],
  };
};

export const getMockAnalysis = (id) => {
  const normalized = id.trim().toUpperCase();
  return mockEcrDatabase[normalized] || buildGenericAnalysis(normalized);
};
