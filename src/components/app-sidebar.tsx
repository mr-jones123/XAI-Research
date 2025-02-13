import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
  } from "@/components/ui/sidebar"
  
  export default function AppSidebar() {
    return (
      <Sidebar >
        <SidebarContent>
          <SidebarGroup >
            <SidebarGroupLabel>
                Your Conversations
            </SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  