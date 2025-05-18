"use client";

import { Bell, Monitor, Palette, Settings, User } from "lucide-react";
import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "Company",
    icon: User,
    href: "/dashboard/company",
    isActive: true,
  },
  {
    title: "Experience",
    icon: Settings,
    href: "/dashboard/experience",
  },
  {
    title: "Project",
    icon: Palette,
    href: "/dashboard/project",
  },
  {
    title: "Skill",
    icon: Bell,
    href: "/dashboard/skill",
  },
  {
    title: "Social",
    icon: Monitor,
    href: "/dashboard/social",
  },
  {
    title: "Tag",
    icon: Monitor,
    href: "/dashboard/tag",
  },
  {
    title: "User",
    icon: Monitor,
    href: "/dashboard/user",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  return (
    <ScrollArea className="h-full bg-background">
      <SidebarProvider>
        <div className="w-full">
          <div className="h-full relative w-full">
            <div className="p-6 border-b sticky">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <div className="flex flex-col md:flex-row h-full bg-transparent">
              <Sidebar
                className="md:w-64 border-r bg-transparent sticky"
                collapsible="none"
              >
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {navItems.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={item.href === pathname}
                              className="text-muted-foreground hover:bg-muted-foreground/40"
                            >
                              <a
                                href={item.href}
                                className="flex items-center gap-3 text-muted-foreground px-4"
                              >
                                {/* <item.icon className="h-4 w-4" /> */}
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <div className="flex-1 py-6 container mx-auto">{children}</div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ScrollArea>
  );
}
