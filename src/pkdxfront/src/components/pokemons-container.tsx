"use client"
import { PokemonCard } from "@/components/pokemon-card";
import { useGetPokemons } from "@/hooks/use-get-pokemons";
import { DataTablePagination } from "./data-table-pagination";

export default function PokemonsContainer() {
  const {data, isLoading} = useGetPokemons()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {data && data.content.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon}/>
      ))}
      {/* <DataTablePagination table={data}/> */}
    </div>
  );
}