import { fetchApi } from "."

const prefix = "pkmn"

type PokemonType = "STEEL" | "DRAGON" | "ELECTRIC" | "FIRE" | "BUG" | "GRASS" | "PSYCHIC" | "GROUND" | "DARK" | "FIGHTING" | "WATER" | "FAIRY" | "ICE" | "NORMAL" | "POISON" | "ROCK" | "GHOST" | "FLYING"

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

interface PkmnDTO {
  name: string,
  description: string,
  types: PokemonType[],
  regions: {regionName: string, regionNumber: number}[],
  imgUrl: string
}

async function getPokemons(query: string) : Promise<GetPokemonsResponse | {error: string}> {
  return await fetchApi('GET',`${prefix}/search?${query}`,{}) as unknown as GetPokemonsResponse | {error: string}
}

async function addPokemons(token: string, pkmnDTO: PkmnDTO) : Promise<{error: string}> {
  return await fetchApi('POST',`${prefix}`,{token, body: pkmnDTO, noreturn: true}) as unknown as {error: string}
}


export { getPokemons, addPokemons }
export type { Pokemon, GetPokemonsResponse, PokemonType, PkmnDTO }