import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

import { Pokemon } from "@/routes/pokemons"
import Image from "next/image"
import { Badge } from "@/registry/new-york/ui/badge"
import colorTypes from "@/config/type"

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({pokemon} : PokemonCardProps) {

  return (
    <Card className="group">
      <CardHeader>
        <CardTitle className="">{pokemon.name}</CardTitle>
        <CardDescription>{pokemon.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative h-60 w-60 sm:h-32 sm:w-32 m-8">
        <Image src={pokemon.image} alt="alt" fill/>
      </CardContent>
      <CardFooter className="flex gap-2">
        {pokemon.types.map((type) => (
          <Badge key={pokemon.id + type} className={colorTypes[type].bg}>{type}</Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
