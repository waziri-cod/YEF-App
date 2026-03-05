import { useState, useRef, useEffect } from "react";
import { AIChatMessage } from "@/services/aiService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AIChat() {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // load previous sessions once
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/ai/history");
        if (res.ok) {
          const hist = await res.json();
          if (Array.isArray(hist)) {
            setSessions(hist);
            if (hist.length > 0) {
              const latest = hist[0];
              setCurrentSessionId(latest._id);
              setMessages(latest.messages || []);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    }
    loadHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: AIChatMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    // call backend with session id
    try {
      const res = await fetch(
        "/api/ai/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages, sessionId: currentSessionId }),
        }
      );
      const data = await res.json();
      if (data.sessionId) {
        setCurrentSessionId(data.sessionId);
        // if it's a new session, prepend to sessions list
        if (!sessions.find((s) => s._id === data.sessionId)) {
          setSessions((prev) => [
            { _id: data.sessionId, createdAt: new Date().toISOString(), messages: [] },
            ...prev,
          ]);
        }
      }
      const aiMsg: AIChatMessage = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat request failed", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* session selector */}
      {sessions.length > 0 && (
        <div className="mb-2">
          <label className="text-sm mr-2">Previous sessions:</label>
          <select
            className="p-1 border rounded"
            value={currentSessionId || ""}
            onChange={(e) => {
              const id = e.target.value;
              setCurrentSessionId(id);
              const sel = sessions.find((s) => s._id === id);
              if (sel) setMessages(sel.messages || []);
            }}
          >
            {sessions.map((s) => (
              <option key={s._id} value={s._id}>
                {new Date(s.createdAt).toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-background rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }
          >
            <div
              className={
                msg.role === "user"
                  ? "inline-block bg-primary text-white px-4 py-2 rounded-lg"
                  : "inline-block bg-secondary text-white px-4 py-2 rounded-lg"
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-2 flex items-end space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about loans, budgeting, or business..."
          className="flex-1"
          rows={2}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
