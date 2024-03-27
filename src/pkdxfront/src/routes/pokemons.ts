import { fetchApi } from "."

const prefix = "pkmn"

type PokemonType = "STEEL" | "DRAGON" | "ELECTRIC" | "FIRE" | "BUG" | "GRASS" | "PSYCHIC" | "GROUND" | "DARK" | "FIGHTING" | "WATER" | "FAIRY" | "ICE" | "NORMAL" | "POISON" | "ROCK" | "GHOST" | "FLYING" | "UNKNOWN" | "SHADOW" | "CELESTIAL"

interface Pokemon {
  name: string,
  description: string,
  types: PokemonType[],
  regions: string[],
  id: string,
  image: string
}

interface GetPokemonsResponse {
  content: Pokemon[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  },
  last: boolean
  totalElements: number
  totalPages: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  first: boolean
  size: number
  number: number
  empty: boolean
}

async function getPokemons(query: string) : Promise<GetPokemonsResponse> {
  const res = await fetchApi('GET',`${prefix}/search?${query}`)
  return await res.json()
}

export { getPokemons }
export type { Pokemon, GetPokemonsResponse, PokemonType }