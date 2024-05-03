import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/registry/new-york/ui/button"
import Link from "next/link"
import { deleteTokenInCookies, getTokenInCookies } from "@/lib/cookies"
import { jwtDecode } from "jwt-decode";
import SiteHeaderAccount from "./site-header-account"

export default async function SiteHeader() {

  const token = await getTokenInCookies()
  const decoded = token && token.value && jwtDecode(token.value)

  const username =  typeof decoded?.sub === 'string' ? decoded.sub : ''

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* <MainNav /><MobileNav /> */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
        {
          username && <SiteHeaderAccount username={username}/>
        }
      </div>
    </header>
  );
}