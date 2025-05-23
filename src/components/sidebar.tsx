"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
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
import Image from "next/image";

type ChatHistoryItem = {
  id: string;
  title: string;
  created_at: string; // ISO string from DB
};

const links = [
  { name: "Dashboard", href: "../dashboard" },
  { name: "Saved Visualizations", href: "../savedVisual" },
];

const SidebarComponent = () => {
  const [user, setUser] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchChatHistory = async () => {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("id, title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error fetching chat history:", error.message);
        return;
      }
      setChatHistory(data || []);
    };

    fetchChatHistory();
  }, [user]);

  const formatDate = (isoDate: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(isoDate));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton asChild>
                    <Link href={link.href} className="text-black hover:underline pt-5">
                      {link.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chat History Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Chat History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.length === 0 ? (
                <div className="px-3 py-2 text-xs text-gray-500 italic">No chat history yet.</div>
              ) : (
                chatHistory.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/chatbot/${chat.id}`}
                        className="flex justify-between items-center text-xs truncate hover:underline"
                      >
                        <span>{chat.title || "Untitled Chat"}</span>
                        <span className="ml-2 text-gray-400">{formatDate(chat.created_at)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-2 h-auto">
              <Link href="/dashboard">
                {user && (
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                        alt="User Avatar"
                        width={25}
                        height={25}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.user_metadata?.full_name || user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export { SidebarComponent };