"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { MessageSquare, Plus, Trash2, MoreVertical } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Define a type for chat history items
type ChatHistoryItem = {
  id: string
  title: string
  createdAt: Date
}

const links = [
  { name: "Dashboard", href: "../dashboard" },
  { name: "Saved Visualizations", href: "../savedVisual" },
]

// Color palette from the provided image
const colors = {
  darkBlue: "#45b8fe",
  mediumBlue: "#6ac5fe",
  lightBlue: "#8fd3fe",
  veryLightBlue: "#b5e2ff",
  paleBlue: "#daf0ff",
  darkText: "#3f3f3f",
}

const SidebarComponent = () => {
  const router = useRouter()
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([])

  // Function to handle creating a new chat
  const handleNewChat = () => {
    const newChatId = uuidv4()

    // Create a new chat history item
    const newChat = {
      id: newChatId,
      title: `Chat ${chatHistory.length + 1}`,
      createdAt: new Date(),
    }

    // Add to chat history
    const updatedHistory = [newChat, ...chatHistory]
    setChatHistory(updatedHistory)

    // Save to localStorage
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory))

    console.log("Generating new chat ID:", newChatId)
    router.push(`/chatbot/${newChatId}`)
  }

  // Function to delete a chat session
  const handleDeleteChat = async (chatId: string, event: React.MouseEvent) => {
    event.preventDefault() // Prevent navigation when clicking delete
    event.stopPropagation()

    try {
      // Remove from local state
      const updatedHistory = chatHistory.filter((chat) => chat.id !== chatId)
      setChatHistory(updatedHistory)

      // Update localStorage
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory))

      // If you're using Supabase, also delete from database
      // await deleteChatFromDatabase(chatId);

      console.log(`Chat ${chatId} deleted successfully`)

      // If the user is currently viewing the deleted chat, redirect to a new chat
      if (window.location.pathname.includes(chatId)) {
        router.push("/chatbot")
      }
    } catch (error) {
      console.error("Error deleting chat:", error)
    }
  }

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory")
    if (savedHistory) {
      try {
        // Parse the saved history and convert string dates back to Date objects
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }))
        setChatHistory(parsedHistory)
      } catch (error) {
        console.error("Error parsing chat history:", error)
      }
    }
  }, [])

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Sidebar style={{ backgroundColor: colors.paleBlue, borderColor: colors.veryLightBlue }}>
      <SidebarContent>
        {/* New Chat Button Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <button
              onClick={handleNewChat}
              className="w-auto px-3 py-1.5 text-xs font-medium rounded-md shadow-sm
                         transition-all duration-200 ease-in-out flex items-center justify-center gap-1
                         focus:outline-none focus:ring-2 focus:ring-opacity-50 mx-auto"
              style={{
                backgroundColor: colors.darkBlue,
                color: "white",
                boxShadow: `0 1px 2px rgba(0, 0, 0, 0.05)`,
                borderRadius: "4px",
              }}
            >
              <Plus className="h-3 w-3" /> New Chat
            </button>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chat History Group */}
        <SidebarGroup>
          <SidebarGroupLabel style={{ color: colors.darkBlue, fontWeight: 500 }}>Chat History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.length > 0 ? (
                chatHistory.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <div className="flex items-center w-full group">
                      <SidebarMenuButton
                        asChild
                        className="flex-1 hover:bg-opacity-70 data-[active=true]:font-medium"
                        style={
                          {
                            "--hover-bg": colors.veryLightBlue,
                            "--active-bg": colors.lightBlue,
                            "--active-text": colors.darkText,
                          } as React.CSSProperties
                        }
                      >
                        <Link
                          href={`/chatbot/${chat.id}`}
                          className="flex items-center gap-2 text-xs truncate"
                          style={{ color: colors.darkText }}
                        >
                          <div
                            className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: colors.mediumBlue }}
                          >
                            <MessageSquare className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="truncate">{chat.title}</span>
                          <span className="ml-auto text-xs opacity-70">{formatDate(chat.createdAt)}</span>
                        </Link>
                      </SidebarMenuButton>

                      {/* Delete dropdown - only visible on hover */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1"
                            style={{ color: colors.darkBlue }}
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          <DropdownMenuItem
                            onClick={(e) => handleDeleteChat(chat.id, e)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </SidebarMenuItem>
                ))
              ) : (
                <div
                  className="px-3 py-2 text-xs rounded-md mx-2"
                  style={{ backgroundColor: colors.veryLightBlue, color: colors.darkBlue }}
                >
                  No chat history yet
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tasks Group */}
        <SidebarGroup>
          <SidebarGroupLabel style={{ color: colors.darkBlue, fontWeight: 500 }}>Tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-opacity-70"
                    style={
                      {
                        "--hover-bg": colors.veryLightBlue,
                        "--active-bg": colors.lightBlue,
                        "--active-text": colors.darkText,
                      } as React.CSSProperties
                    }
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: colors.darkText }}
                    >
                      <div
                        className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: colors.mediumBlue }}
                      >
                        {link.name === "Dashboard" ? (
                          <svg
                            className="h-2.5 w-2.5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="7" height="9" x="3" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="3" rx="1" />
                            <rect width="7" height="9" x="14" y="12" rx="1" />
                            <rect width="7" height="5" x="3" y="16" rx="1" />
                          </svg>
                        ) : (
                          <svg
                            className="h-2.5 w-2.5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        )}
                      </div>
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export { SidebarComponent }
