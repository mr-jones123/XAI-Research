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
import { useRouter, usePathname } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import { Button } from "./ui/button";

type ChatSession = {
  id: string;
  title: string | null;
  created_at: string;
};

const supabase = createClient();

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Saved Visualizations", href: "/savedVisual" },
];

export const SidebarComponent = () => {
  const [user, setUser] = useState<any>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState({
    user: true,
    chats: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  // Fetch user once on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading((prev) => ({ ...prev, user: true }));
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      }
      setUser(user);
      setLoading((prev) => ({ ...prev, user: false }));
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("chat_sessions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_sessions",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Realtime chat_sessions change:", payload);
          fetchChatSessions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchChatSessions = async () => {
    if (!user) return;

    setLoading((prev) => ({ ...prev, chats: true }));
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("id, title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error fetching chat sessions:", error);
      } else {
        setChatSessions(data || []);
      }
    } finally {
      setLoading((prev) => ({ ...prev, chats: false }));
    }
  };

  useEffect(() => {
    if (user) {
      fetchChatSessions();
    }
  }, [user]);

  const createNewChat = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("chat_sessions")
      .insert([
        {
          user_id: user.id,
          title: "New Chat",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating new chat:", error);
      return;
    }

    if (data) {
      setChatSessions((prev) => [data, ...prev]);
      router.push(`/chatbot/${data.id}`);
    }
  };

  const deleteChat = async (id: string) => {
    const { error } = await supabase
      .from("chat_sessions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting chat:", error);
      return;
    }

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

    setChatSessions((prev) => prev.filter((chat) => chat.id !== id));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map(({ name, href }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={href}
                      className={`flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                        pathname === href ? "bg-gray-100 font-medium" : ""
                      }`}
                    >
                      {name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

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
            {loading.chats ? (
              <div className="p-2 text-center text-sm text-gray-500">
                Loading...
              </div>
            ) : chatSessions.length === 0 ? (
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
                {loading.user ? (
                  <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
                ) : user ? (
                  <>
                    <Image
                      src={
                        user.user_metadata?.avatar_url || "/default-avatar.png"
                      }
                      alt="User Avatar"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm truncate max-w-[140px]">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-red-500">Not logged in</span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
