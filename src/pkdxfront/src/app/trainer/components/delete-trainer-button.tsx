"use client"
import { Button } from "@/registry/new-york/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/new-york/ui/dialog";
import { deleteTrainer } from "@/routes/trainer";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteTrainerButton({token}: {token: string}) {
  const router = useRouter()

  const deleteIcon = async () => {
    await deleteTrainer(token);
    router.refresh()
  }

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className="w-12 h-12 cursor-pointer" variant="outline"><TrashIcon className="scale-150 stroke-red-500"/></Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Supprimer ce pokemon</DialogTitle>
        <DialogDescription>
          Delete this pokemon here. Click on delete.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit" onClick={deleteIcon}>Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}