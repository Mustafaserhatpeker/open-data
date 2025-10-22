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

const baseData = {
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
    },
  ],
  projects: [
    {
      name: "Ana Sayfa",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Organizasyonlar",
      url: "/dashboard/organizations",
      icon: Frame,
    },
    {
      name: "Kategoriler",
      url: "/dashboard/categories",
      icon: Frame,
    },
    {
      name: "Veri İstekleri",
      url: "/dashboard/datarequests",
      icon: Frame,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Organizasyonları al
  const { data: organizationsResp, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getMyOrganizations(),
  })

  const orgItems =
    organizationsResp?.data?.map((org: any) => ({
      title: org.organizationName,
      url: `/dashboard/organizations/${org._id}`,
    })) ?? []

  // Ana menü
  const navMain = [
    {
      title: "Organizasyonlarım",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items:
        isLoading && orgItems.length === 0
          ? [{ title: "Yükleniyor...", url: "#" }]
          : orgItems,
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
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={baseData.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={baseData.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={baseData.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
