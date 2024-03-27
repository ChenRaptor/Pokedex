"use client"
import { getPokemons } from "@/routes/pokemons"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

export function useGetPokemons() {
  const searchParams = useSearchParams()
  const value = searchParams.toString()

  return useQuery({
    queryKey: ['pokemons', value],
    queryFn: () => getPokemons(value),
  })
}