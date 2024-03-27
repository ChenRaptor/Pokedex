import colorTypes from "@/config/type"
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
import { PokemonType } from "@/routes/pokemons"
import Image from "next/image"

export function PokemonsSearch() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recherche un pokemon</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
          {
            Object.keys(colorTypes).map((type) => (
              <div key={type}>
                <Checkbox id={type} />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={type}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Image src={colorTypes[type as PokemonType].image} alt="Credit card" width={48} height={48} />
                    {type}
                  </Label>
                </div>
              </div>
            ))
          }
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Nom" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  )
}
