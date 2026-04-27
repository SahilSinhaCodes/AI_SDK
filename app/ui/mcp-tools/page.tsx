"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { ChatMessage } from "@/app/api/mcp-tools/route";

export default function MCPToolsChatPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: "/api/mcp-tools",
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error.message}</div>}

      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div className="font-semibold">
            {message.role === "user" ? "You:" : "AI:"}
          </div>

          {message.parts.map((part, index) => {

            const partType = part.type as string;


            if (partType === "step-start" || partType === "step-finish" || partType === "reasoning") {
              return null;
            }


            if (part.type === "text") {
              return (
                <div key={`${message.id}-${index}`} className="whitespace-pre-wrap mt-2">
                  {part.text}
                </div>
              );
            }


            if ('state' in part) {
              return (
                <div key={`${message.id}-${index}`} className="bg-zinc-800/50 border border-zinc-700 p-3 rounded mt-2 mb-2 shadow-sm">

                  {/* Status Header */}
                  <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                    {part.state === "output-available" ? (
                      <span className="text-emerald-400">✅ Tool Executed: {part.type}</span>
                    ) : part.state === "output-error" ? (
                      <span className="text-red-400">❌ Tool Failed: {part.type}</span>
                    ) : (
                      <span className="text-zinc-400">⚙️ Running Tool: {part.type}...</span>
                    )}
                  </div>

                  {/* Show Input Data when loading */}
                  {(part.state === "input-streaming" || part.state === "input-available") && (
                    <pre className="text-xs text-zinc-500 overflow-x-auto bg-zinc-900/50 p-2 rounded">
                      {JSON.stringify(part.input, null, 2)}
                    </pre>
                  )}

                  {/* Show Output Data when finished (This is the payload from your MockMCP server!) */}
                  {part.state === "output-available" && (
                    <pre className="text-xs text-zinc-300 overflow-x-auto bg-zinc-900/50 p-2 rounded border border-emerald-900/50">
                      {JSON.stringify(part.output, null, 2)}
                    </pre>
                  )}

                  {/* Show Error if it crashed */}
                  {part.state === "output-error" && (
                     <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded">
                       {part.errorText}
                     </div>
                  )}

                </div>
              );
            }


            return (
              <div key={`${message.id}-${index}`} className="bg-orange-900/20 p-2 text-xs text-orange-400 rounded mt-2">
                Unknown part type received: {JSON.stringify(part)}
              </div>
            );
          })}
        </div>
      ))}

      {/* Loading Spinner */}
      {(status === "submitted" || status === "streaming") && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about weather or stocks..."
          />
          {status === "submitted" || status === "streaming" ? (
            <button
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status !== "ready"}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}