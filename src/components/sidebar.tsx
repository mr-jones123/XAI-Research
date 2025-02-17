"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

const links = [
  { name: "Dashboard", href: "../dashboard" },
  { name: "Saved Visualizations", href: "../savedVisual" },
];

const SidebarComponent = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel> Tasks </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={link.href}
                      className="text-black hover:underline pt-5"
                    >
                      {link.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          {/*implement history chatbot backend*/}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { SidebarComponent };
