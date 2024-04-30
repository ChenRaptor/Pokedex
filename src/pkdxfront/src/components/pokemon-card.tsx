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
import {useRouter} from "next/navigation"

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({pokemon} : PokemonCardProps) {
  const router = useRouter()

  return (
    <Card className={`group ${pokemon.types[0] && colorTypes[pokemon.types[0]].bg} grayscale-[50%] hover:grayscale-0 transition-all`} onClick={() => router.push(`http://localhost:3000/pokemons/${pokemon.name}`)}>
      <CardHeader>
        <CardTitle className="">{pokemon.name}</CardTitle>
        <CardDescription>{pokemon.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative h-60 w-60 sm:h-32 sm:w-32 m-8">
        <Image src={pokemon.image} alt="alt" fill/>
      </CardContent>
      <CardFooter className="flex gap-2">
        {pokemon.types.map((type) => (
          <Badge key={pokemon.id + type} className={`${colorTypes[type].bg} hover:${colorTypes[type].bg}`}>{type}</Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
