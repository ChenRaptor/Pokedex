import { getPokemons } from "@/routes/pokemons";
import { useQuery } from "@tanstack/react-query";

export function useGetPokemon(name: string) {
  return useQuery({
    queryKey: ['pokemons', `partialName=${name}`],
    queryFn: () => getPokemons(`partialName=${name}`).then((data) => data.content[0]),
  })
}

// SSR version
export async function getPokemonSSR(name: string) {
  return getPokemons(`partialName=${name}`).then((data) => data.content[0])
}