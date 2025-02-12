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
  const [open, setOpen] = useState(false);
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
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
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger className="text-black" />
    </SidebarProvider>
  );
};

const History = () => {
  return (
    <SidebarProvider>
      <Sidebar side="right">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>History</SidebarGroupLabel>
            <SidebarGroupContent> </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export { SidebarComponent, History };
