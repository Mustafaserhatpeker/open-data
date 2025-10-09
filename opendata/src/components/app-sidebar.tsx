"use client"

import * as React from "react"
import {
  Bot,
  Frame,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Organizasyonlarım",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "A Organizasyon",
          url: "#",
        },
        {
          title: "B Organizasyon",
          url: "#",
        },
        {
          title: "C Organizasyon",
          url: "#",
        },
      ],
    },
    {
      title: "Tüm Kategoriler",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "A Kategori",
          url: "#",
        },
        {
          title: "B Kategori",
          url: "#",
        },
        {
          title: "C Kategori",
          url: "#",
        },
      ],
    },

  ],
  projects: [
    {
      name: "Veri İstekleri",
      url: "#",
      icon: Frame,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
