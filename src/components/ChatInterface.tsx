"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";

interface Message {
  sender: "user" | "ai"; //"user for now because wala pang user auth and wala pang login"
  text: string;
}

interface ChatInterfaceProps {
  onSubmit: (input: string) => Promise<string>;
  loading: boolean;
}

export default function ChatInterface({
  onSubmit,
  loading,
}: ChatInterfaceProps) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      const ai_Response = await onSubmit(input);
      const ai_Message: Message = { sender: "ai", text: ai_Response };
      setMessages((prev) => [...prev, ai_Message]);
    } catch (error) {
      const errorMessage: Message = {
        sender: "ai",
        text: `Sorry, something went wrong. ${error}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSend();
    }
  };

  const inputComponent = (
    <div className="relative">
      <Input
        className="w-full p-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
      />
      <Button
        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 z-5 w-8 h-8 rounded-full"
        onClick={handleSend}
        disabled={loading || !input.trim()}
      >
        <Send className="w-4 h-4"></Send>
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col h-[100dvh]">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-start flex-1 p-4 md:p-6 pt-16">
          <div className="w-full max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-3">Welcome to XAI</h1>
            <p className="text-gray-500 mb-10">Simulate your Outputs...</p>

            <div className="max-w-xl mx-auto mt-6">{inputComponent}</div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-4 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div id="message-end" />
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <div className="max-w-3xl mx-auto">{inputComponent}</div>
          </div>
        </>
      )}
    </div>
  );
}
