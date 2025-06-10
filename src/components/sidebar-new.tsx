"use client";

import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";

type ChatSession = {
  id: string;
  title: string | null;
  created_at: string;
};

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Saved Visualizations", href: "/savedVisual" },
];

export const SidebarComponent = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Load chat sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      setChatSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  const createNewChat = async () => {
    const newChatId = uuidv4();
    const newSession: ChatSession = {
      id: newChatId,
      title: "New Chat",
      created_at: new Date().toISOString(),
    };

    setChatSessions((prev) => [newSession, ...prev]);
    router.push(`/chatbot/${newChatId}`);
  };

  const deleteChat = async (id: string) => {
    setChatSessions((prev) => prev.filter(chat => chat.id !== id));

    if (pathname.includes(id)) {
      const currentIndex = chatSessions.findIndex((chat) => chat.id === id);
      const remainingSessions = chatSessions.filter((chat) => chat.id !== id);

      if (remainingSessions.length > 0) {
        const nextIndex =
          currentIndex >= remainingSessions.length
            ? remainingSessions.length - 1
            : currentIndex;
        router.push(`/chatbot/${remainingSessions[nextIndex].id}`);
      } else {
        router.push("/chatbot");
      }
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex justify-between items-center w-full">
              <span>Chat History</span>
              <Button
                onClick={createNewChat}
                className="p-1 rounded-full hover:bg-gray-200"
                title="New Chat"
                variant="link"
              >
                <Plus size={16} />
              </Button>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {chatSessions.length === 0 ? (
              <div className="p-2 text-center text-sm text-gray-500">
                No chats yet
              </div>
            ) : (
              <SidebarMenu>
                {chatSessions.map(({ id, title }) => (
                  <SidebarMenuItem key={id}>
                    <div className="flex items-center justify-between group">
                      <SidebarMenuButton asChild>
                        <Link
                          href={`/chatbot/${id}`}
                          className={`flex-1 p-2 rounded truncate ${
                            pathname.includes(id)
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                          title={title || "New Chat"}
                        >
                          {title || "New Chat"}
                        </Link>
                      </SidebarMenuButton>
                      {chatSessions.length > 1 && (
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            deleteChat(id);
                          }}
                          className="p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                          title="Delete chat"
                          variant="link"
                        >
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded"
              >
                <span className="text-sm">Anonymous User</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
