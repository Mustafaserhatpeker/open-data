"use client"

import * as React from "react"
import {
  Bot,
  Frame,
  SquareTerminal,
} from "lucide-react"
import LLogo from "@/assets/llogo.png"

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
import { useQuery } from "@tanstack/react-query"
import { getMyOrganizations } from "@/services/organization.service"


function LogoIcon() {
  return <img src={LLogo} alt="Logo" width={16} height={16} />
}

const staticData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Trtek Yazılım",
      logo: LogoIcon,
      plan: "Admin Paneli",
    }
  ],
  navMain: [
    {
      title: "Organizasyonlarım",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Tüm Kategoriler",
      url: "#",
      icon: Bot,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: organizationsResp } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getMyOrganizations(),
  })


  const organizations =
    organizationsResp?.data?.map((org: any) => ({
      id: org._id,
      name: org.organizationName,
      url: `/organizations/${org._id}`,
      icon: Frame,
    })) ?? []

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={staticData.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={staticData.navMain} />
        <NavProjects projects={organizations} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={staticData.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
