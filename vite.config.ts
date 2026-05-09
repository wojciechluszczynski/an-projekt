import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const cloudUrl = process.env.VITE_SUPABASE_URL || "https://rpdhnvnwxtzekpnlrvju.supabase.co";
const cloudPublishableKey =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIc3VwYWJhc2UiLCJyZWYiOiJycGRobnZud3h0emVrcG5scnZqdSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc0NjQzMDUwLCJleHAiOjIwOTAyMTkwNTB9.tsXJRY_PKRjMtqUHL1yrotb2frA8il4MmWb0QniNtmY";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(cloudUrl),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(cloudPublishableKey),
  },
}));
