"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Chatbot from "@/components/chatbot";
import { insertChatSession } from "@/lib/chatApi";

export default function ChatPage() {
  const params = useParams();
  const [chatid, setChatid] = useState<string | null>(null); // Use null to distinguish between "not set" and "invalid"

  useEffect(() => {
    // FIX: Changed params.chatid to params.chatId to match the actual parameter name
    const paramId = typeof params.chatId === "string" ? params.chatId : null;
    console.log("Params from useParams():", params);
    console.log("Extracted chatid:", paramId);

    setChatid(paramId); // Will be either valid string or null
  }, [params.chatId]); // FIX: Updated dependency to params.chatId

  useEffect(() => {
    if (!chatid) {
      console.log("chatid is undefined, not saving session.");
      return;
    }

    async function saveChatSession() {
      console.log("Attempting to save chat session with ID:", chatid);
      try {
        await insertChatSession(chatid!);
        console.log("Chat session saved.");
      } catch (error) {
        console.error("Failed to save chat session:", error);
      }
    }

    saveChatSession();
  }, [chatid]);

  // Still loading chatid from params
  if (chatid === null) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full pt-16 pr-4">
      <div className="w-full px-4 sm:px-12">
        <Chatbot chatId={chatid} />
      </div>
    </div>
  );
}
