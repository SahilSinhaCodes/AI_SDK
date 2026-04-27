# AI Agent Hub 🚀

A modern **Next.js** application demonstrating advanced AI agent workflows using the [Vercel AI SDK](https://sdk.vercel.ai/docs) and [Groq](https://groq.com/).

This project serves as a comprehensive playground for building fast, specialized AI features including multimodal vision, live tool calling, and Model Context Protocol (MCP) integration.

---

## ✨ Features

- 👁️ **Multimodal Vision** — Chat with images using Llama 3.2 Vision and automated base64 parsing.
- 🌐 **Web Search Agent** — LLM tool calling with live internet access to fetch up-to-date answers.
- 🔌 **MCP Server Integration** — Connect to external Model Context Protocol databases to fetch live data dynamically.
- 📊 **Token Metadata Tracking** — Monitor LLM latency, reasoning steps, and token usage in real-time.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Styling | Tailwind CSS & Lucide Icons |
| AI Core | Vercel AI SDK v6 |
| LLM Provider | Groq (`llama-3.3-70b-versatile`, `llama-3.2-90b-vision-preview`) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SahilSinhaCodes/AI_SDK.git
cd AI_SDK
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your API keys:

```env
# Groq API Key (required)
GROQ_API_KEY="gsk_your_groq_api_key_here"

# Weather API (if using the external weather tool)
WEATHER_API_KEY="your_weather_api_key_here"

# MCP Server Credentials (for the /mcp-tools route)
MCP_URL="https://app.mockmcp.com/servers/YOUR_SERVER_ID/mcp"
Bearer_Link="Bearer mcp_m2m_YOUR_SECRET_TOKEN"
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

Navigate to the different `/ui/` routes to test individual AI agents.

---

## 🌍 Deployment

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/).

> ⚠️ **Important:** Before deploying, add all environment variables from your `.env.local` file into your Vercel project's **Environment Variables** settings.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 📁 Project Structure

```
├── app/
│   ├── ui/              # Individual AI agent routes
│   ├── api/             # API route handlers
│   └── page.tsx         # Landing page
├── components/          # Reusable UI components
├── lib/                 # Utility functions & AI configs
├── public/              # Static assets
└── .env.local           # Environment variables (not committed)
```