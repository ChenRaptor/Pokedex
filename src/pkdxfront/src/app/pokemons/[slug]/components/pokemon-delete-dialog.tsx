"use client"
import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"
import { DeleteIcon, EditIcon, TrashIcon } from "lucide-react"

interface PokemonEditDialogProps {
  pkmn: Pokemon
}

import { Pokemon } from "@/routes/pokemons"
export function PokemonDeleteDialog({pkmn}: PokemonEditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute top-20 right-4 w-12 h-12 cursor-pointer" variant="outline"><TrashIcon className="scale-150 stroke-red-500" onClick={() => console.log('edit')} /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer ce pokemon</DialogTitle>
          <DialogDescription>
            Delete this pokemon here. Click on delete.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
