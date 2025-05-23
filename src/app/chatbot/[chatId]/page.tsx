"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Chatbot from "@/components/chatbot";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [chatId, setChatId] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    const initializeChat = async () => {
      try {
        setStatus("loading");
        const paramId = Array.isArray(params.chatId)
          ? params.chatId[0]
          : params.chatId;

        if (!paramId) {
          const response = await fetch("/api/chat_sessions/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          if (response.ok && data.chatId) {
            router.replace(`/chatbot/${data.chatId}`);
            return;
          }
          throw new Error(data.error || "Failed to create chat");
        }

        const saveResponse = await fetch("/api/chat_sessions/insert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId: paramId }),
        });

        if (!saveResponse.ok) {
          throw new Error("Failed to verify chat session");
        }

        setChatId(paramId);
        setStatus("ready");
      } catch (error) {
        console.error("Initialization error:", error);
        setStatus("error");
      }
    };

    initializeChat();
  }, [params.chatId, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-gray-500">Initializing chat...</div>
      </div>
    );
  }

  if (status === "error") {
    router.replace("/error");
  }

  return (
    <div className="w-full px-4 sm:px-12">
      {chatId && <Chatbot chatId={chatId} />}
    </div>
  );
}
