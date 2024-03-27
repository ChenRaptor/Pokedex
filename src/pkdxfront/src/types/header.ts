interface MainNavItem {
  title: string
  href: string
  external?: boolean
}

interface SidebarNavItem {
  title: string
  href?: string
  items?: SidebarNavItem[] | string
}

export type { MainNavItem, SidebarNavItem }