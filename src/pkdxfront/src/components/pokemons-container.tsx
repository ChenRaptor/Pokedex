"use client"
import { PokemonCard } from "@/components/pokemon-card";
import { useGetPokemons } from "@/hooks/use-get-pokemons";
import { DataTablePagination } from "./pagination";
import { parseAsInteger, useQueryState } from "nuqs";

export default function PokemonsContainer() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withOptions({ history: 'push' }).withDefault(0))

  const {data, isLoading} = useGetPokemons()

  const previousHandler = () => {
    if (page === 0) return
    setPage((prev) => prev - 1)
  }

  const nextHandler = () => {
    if (data && page === data.totalPages) return
    setPage((prev) => prev + 1)
  }

  const setHandler = (newPage: number) => () => {
    setPage(newPage)
  }


  if (isLoading) return <div>Loading...</div>



  return (
    <div className="space-y-8 min-h-[200vh]">
      <h2 className="text-4xl font-bold dark:text-white">Pokemons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data && data.content.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
      </div>
      { data && data.totalPages &&
        <DataTablePagination previous={previousHandler} next={nextHandler} page={page} nbPages={data.totalPages} setPage={setHandler}/>
      }
    </div>
  );
}