/**
 * SystemArchitecture.js
 * Technical blueprint for the Portfolio Infrastructure
 */

export const SYSTEM_NODES = {
  CLIENT: {
    engine: "React 18 (Vite)",
    rendering: "Concurrent Mode / Suspense",
    state: "Zustand / React Context",
    styling: "Responsive Engine (CSS Variables)"
  },
  IA_LAYER: {
    orchestration: "Antigravity Agent",
    context_server: "MCP (Model Context Protocol)",
    knowledge_db: "Persistent Context Archives"
  },
  BACKEND: {
    infra: "PostgreSQL (Supabase/BaaS)",
    security: "RLS (Row Level Security)",
    realtime: "WebSockets / Broadcast Channels"
  }
};

export const WORKFLOW_MAP = [
  { step: 1, action: "User Request", target: "UI Shell" },
  { step: 2, action: "Context Retrieval", target: "MCP Server" },
  { step: 3, action: "Inference & Planning", target: "IA Agent" },
  { step: 4, action: "Execution", target: "System Filesystem" },
  { step: 5, action: "Validation", target: "Lighthouse/Test Suite" }
];

export default { SYSTEM_NODES, WORKFLOW_MAP };
