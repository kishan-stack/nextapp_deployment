import * as React from "react"
import  { useEffect, useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items: newMembers,
  ...props
}) {
  const [currentMembers, setCurrentMembers] = useState(newMembers);

  // Update currentMembers only when newMembers changes
  useEffect(() => {
    if (newMembers.length > 0) {
      setCurrentMembers(newMembers);
    }
  }, [newMembers]);
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
        {currentMembers.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
