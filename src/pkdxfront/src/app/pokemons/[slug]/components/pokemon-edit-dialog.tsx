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
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import { EditIcon } from "lucide-react"

const OPTIONS_1: Option[] = [
  { label: 'STEEL', value: 'STEEL' },
  { label: 'DRAGON', value: 'DRAGON' },
  { label: 'ELECTRIC', value: 'ELECTRIC' },
  { label: 'FIRE', value: 'FIRE' },
  { label: 'BUG', value: 'BUG' },
  { label: 'GRASS', value: 'GRASS' },
  { label: 'PSYCHIC', value: 'PSYCHIC' },
  { label: 'GROUND', value: 'GROUND' },
  { label: 'DARK', value: 'DARK'},
  { label: 'FIGHTING', value: 'FIGHTING'},
  { label: 'WATER', value: 'WATER' },
  { label: 'FAIRY', value: 'FAIRY' },
  { label: 'ICE', value: 'ICE' },
  { label: 'NORMAL', value: 'NORMAL' },
  { label: 'POISON', value: 'POISON' },
  { label: 'ROCK', value: 'ROCK' },
  { label: 'GHOST', value: 'GHOST' },
  { label: 'FLYING', value: 'FLYING' },
];

const OPTIONS_2: Option[] = [
  { label: 'Kanto', value: 'Kanto' },
  { label: 'Johto', value: 'Johto' },
  { label: 'Hoenn', value: 'Hoenn' },
  { label: 'Sinnoh', value: 'Sinnoh' },
];

interface PokemonEditDialogProps {
  pkmn: Pokemon
}

import MultipleSelector, { Option } from '@/components/mutiple-selector';
import { Textarea } from "@/registry/new-york/ui/textarea"
import { Pokemon } from "@/routes/pokemons"
export function PokemonEditDialog({pkmn}: PokemonEditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute top-4 right-4 w-12 h-12 cursor-pointer" variant="outline"><EditIcon className="scale-150" onClick={() => console.log('edit')} /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le pokemon</DialogTitle>
          <DialogDescription>
            Make changes to pokemon here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={pkmn.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="Description"
              placeholder={pkmn.description}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="types" className="text-right">
                Types
            </Label>
            <div className="col-span-3">
              <MultipleSelector
                defaultOptions={OPTIONS_1}
                placeholder="Select types..."
                value={pkmn.types.map((type) => ({ label: type, value: type }))}
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="regions" className="text-right">
                Regions
            </Label>
            <div className="col-span-3">
              <MultipleSelector
                defaultOptions={OPTIONS_2}
                placeholder="Select regions..."
                value={pkmn.regions.map((region) => ({ label: region, value: region }))}
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
