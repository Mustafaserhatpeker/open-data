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
import { getCategories } from "@/services/category.service"


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
      name: "Web Arayüzü",
      url: "/",
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
      name: "Veri Setleri",
      url: "/dashboard/datasets",
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

  const { data: organizationsResp, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getMyOrganizations(),
  })

  const { data: categoriesResp, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  })

  const orgItems =
    organizationsResp?.data?.map((org: any) => ({
      title: org.organizationName,
      url: `/dashboard/organizations/${org._id}`,
    })) ?? []

  const catItems =
    categoriesResp?.data?.map((cat: any) => ({
      title: cat.categoryName,
      url: `/dashboard/categories/${cat._id}`,
    })) ?? []

  // Ana menü
  const navMain = [
    {
      title: "Organizasyonlarım",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items:
        isLoading && orgItems.length === 0
          ? [{ title: "Yükleniyor...", url: "#" }]
          : orgItems,
    },
    {
      title: "Tüm Kategoriler",
      url: "#",
      icon: Bot,
      isActive: false,
      items: isLoadingCategories && catItems.length === 0
        ? [{ title: "Yükleniyor...", url: "#" }]
        : catItems,
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
