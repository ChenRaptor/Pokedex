"use client"

import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import { Textarea } from "@/registry/new-york/ui/textarea"
import Image from "next/image"
import colorTypes from "@/config/type"
import { PokemonType } from "@/routes/pokemons"
export function CreatePokemonCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un nouveau Pokemon</CardTitle>
        <CardDescription>
          What area are you having problems with?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2">
          {
            Object.keys(colorTypes).map((type) => (
              <div key={type}>
                <Checkbox id={type} />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={type}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Image src={colorTypes[type as PokemonType].image} alt="Credit card" width={24} height={24} />
                    {type}
                  </Label>
                </div>
              </div>
            ))
          }
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pokemonName">Nom du pokemon</Label>
          <Input id="pokemonName" placeholder="pokemonName" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description du pokemon</Label>
          <Textarea
            id="description"
            placeholder="description"
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}
