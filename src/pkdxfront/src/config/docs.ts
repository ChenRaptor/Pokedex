import { MainNavItem, SidebarNavItem } from "@/types/header"


interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home Page",
      href: "/",
    },
    {
      title: "Register Page",
      href: "/register",
    },
    {
      title: "Login Page",
      href: "/login",
    },
    {
      title: "Add Pokemon Page",
      href: "/pokemons/create",
    },
    {
      title: "Trainer Page",
      href: "/trainer",
    },
    {
      title: "GitHub",
      href: "https://github.com/ChenRaptor",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Pokemons",
      items: "getPokemonsFromAPI()",
    },
  ],
}
