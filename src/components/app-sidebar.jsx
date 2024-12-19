"use client";
import {  Search, Swords,Handshake, GraduationCap, UsersRoundIcon, CommandIcon, User, AirplayIcon, HomeIcon } from "lucide-react";
import { NavMain } from "./nav-main";
import { useSidebar } from "@/components/ui/sidebar";

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarFooter,
   
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

const dashboardUrls = [
    { name: "Home", url: "/", icon: HomeIcon },
    { name: "Dashboard", url: "/dashboard", icon: AirplayIcon },
    { name: "Find Members", url: "/dashboard/find-members", icon: Search },
    { name: "Build Team", url: "/dashboard/buildTeam", icon: Handshake },
    {
        name: "Teams",
        url: "/dashboard/teams",
        icon: UsersRoundIcon,
        items: [
            {
                title: "Team 1",
                url: "/dashboard/teams/team1",
                
            },
            {
                title: "Team 2",
                url: "/dashboard/teams/team2",
                
            },
        ],
    },
    { name: "Hackathons", url: "/dashboard/hackathons", icon: Swords },
    { name: "Internships", url: "/dashboard/internships", icon: GraduationCap },
];


export function AppSidebar({ ...props }) {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const {idToken}=useKindeAuth()
    useEffect(() => {
        if (idToken?.email) {
          setEmail(idToken.email); 
          setUsername(idToken.name)// Set email from idToken
        }
      }, [idToken]);
    const user = {
        user: {
            name:username,
            email: email,
            avatar: "/superman.jpg",
          },
    }
    // Close dropdown on route change
    const {}=useSidebar()
    return (
        <Sidebar variant="floating" side="left" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <CommandIcon className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Collab.io</span>
                                    <span className="truncate text-xs">Dashboard</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator/>
            <SidebarContent>
                <NavMain
                    items={dashboardUrls}
                     // Pass function to handle team selection
                />
            </SidebarContent>
            <SidebarSeparator/>
            {/* Sidebar Footer with Dropdown for Team Members */}
            <SidebarFooter>
                <NavUser user={user.user}/>
            </SidebarFooter>
        </Sidebar>
    );
}
