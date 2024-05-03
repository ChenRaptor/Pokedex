"use client"
import { deleteTokenInCookies } from "@/lib/cookies"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/new-york/ui/button"
import { Separator } from "@/registry/new-york/ui/separator"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SiteHeaderAccount({username}: {username: string}) {

  const router = useRouter()

  const deleteIcon = async () => {
    await deleteTokenInCookies();
    router.refresh()
  }

  return (
    <>
    <Separator orientation="vertical" className="h-8 mx-4" />
    <div className="flex items-center justify-center gap-2">
      <span className="mr-1">{username}</span>
      <div
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "w-9 px-0 cursor-pointer"
        )}

        onClick={deleteIcon}
      >
        <LogOutIcon className="h-4 w-4" />
        <span className="sr-only">Se déconnecter</span>
      </div>
    </div>
    </>
  )
}