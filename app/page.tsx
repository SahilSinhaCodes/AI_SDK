import Link from "next/link";
import {
  Github,
  Image as ImageIcon,
  Globe,
  Database,
  Activity,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">

      {/* Navigation Bar */}
      <header className="border-b border-zinc-200 dark:border-zinc-900 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">AI SDK Hub</div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-24 sm:py-32 flex flex-col items-center">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-24">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8">
            Next-Gen AI Agents, <br className="hidden sm:block" />
            <span className="text-zinc-500 dark:text-zinc-400">Powered by Groq</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
            Explore a suite of hyper-fast, specialized AI workflows featuring multimodal vision, live web search, and Model Context Protocol (MCP) integrations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ui/mcp-tools"
              className="w-full sm:w-auto px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              Try MCP Agent <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ui/multi-modal-chat"
              className="w-full sm:w-auto px-8 py-3 bg-transparent border border-zinc-300 dark:border-zinc-700 font-medium rounded-full hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors flex items-center justify-center"
            >
              Test Multimodal
            </Link>
          </div>
        </div>

        {/* Interactive Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          <Link href="/ui/multi-modal-chat" className="group block p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:shadow-sm">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multimodal Vision</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Analyze and chat about images instantly using Llama Vision models and automated base64 parsing.
            </p>
          </Link>

          <Link href="/ui/web-search-tool" className="group block p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:shadow-sm">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Web Search Agent</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Grant the LLM live internet access to fetch up-to-date answers and summarize current events.
            </p>
          </Link>

          <Link href="/ui/mcp-tools" className="group block p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:shadow-sm">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Database className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2">MCP Server Tools</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Connect to external Model Context Protocol databases to fetch live stock prices and weather data.
            </p>
          </Link>

          <Link href="/ui/message-metadata" className="group block p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:shadow-sm">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Token Metadata</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Track LLM latency, monitor chain-of-thought reasoning, and view total token usage in real-time.
            </p>
          </Link>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} AI Engineering Portfolio</p>
          <p className="flex items-center gap-2">
            Powered by Next.js & Vercel AI SDK
          </p>
        </div>
      </footer>
    </div>
  );
}