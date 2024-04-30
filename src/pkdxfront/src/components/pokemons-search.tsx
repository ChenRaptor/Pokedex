"use client"
import colorTypes from "@/config/type"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import { useQueryStates, useQueryState, parseAsString, parseAsInteger } from 'nuqs'
import PokemonsTypeCheckbox from "./pokemons-type-checkbox"

export function PokemonsSearch() {
  const [partialNameInURL, setPartialNameInURL] = useQueryState('partialName', {history: 'push'})
  const [pkmnByPage, setPkmnByPage] = useQueryState('size', parseAsInteger.withOptions({ history: 'push' }).withDefault(10))

  const [typesInURL, setTypesInURL] = useQueryStates(
    {
      typeOne: parseAsString,
      typeTwo: parseAsString
    },
    {
      history: 'push'
    }
  )

  const typesInURLNotNullable = [typesInURL.typeOne, typesInURL.typeTwo];

  const handleTypeChange = (type: string, primaryType?: boolean) => {
    let updatedTypeOne = typesInURL.typeOne;
    let updatedTypeTwo = typesInURL.typeTwo;

    if (primaryType === true) {
      updatedTypeOne = typesInURL.typeOne === type ? null : type;
    } else if (primaryType === false) {
      updatedTypeTwo = typesInURL.typeTwo === type ? null : type;
    } else {
      if (typesInURL.typeOne === null) {
        updatedTypeOne = type;
      } else if (typesInURL.typeTwo === null) {
        updatedTypeTwo = type;
      }
    }

    setTypesInURL({
      typeOne: updatedTypeOne,
      typeTwo: updatedTypeTwo
    });
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Bienvenue à mon </span>
          Pokedex.
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Explorez un monde de merveilles avec notre Pokédex ultime ! Découvrez une pléthore de Pokémon fascinants, des créatures aussi variées que mystérieuses. Que vous soyez un dresseur aguerri ou un novice curieux, plongez dans notre Pokédex pour en apprendre davantage sur ces êtres fantastiques qui peuplent notre monde. Que l&apos;aventure commence !</p>
      </div>
      <h2 className="text-4xl font-bold dark:text-white">Recherchez un pokemon</h2>

      <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 space-y-2">
            <Label htmlFor="name">Nom du pokemon</Label>
            <Input id="name" placeholder="Nom" onChange={(event) => setPartialNameInURL(event.target.value)} value={partialNameInURL ?? ""}/>
          </div>
          <div className="grid gap-2 space-y-2">
            <Label htmlFor="pkmnByPage">Nombre de pokemon par page</Label>
            <Input type="number" id="pkmnByPage" placeholder="10" onChange={(event) => setPkmnByPage(Number(event.target.value))} value={pkmnByPage ?? 10}/>
          </div>
      </div>

      <div className="space-y-2">
        <Label>Type du pokemon</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-9 gap-2">
          {
            Object.keys(colorTypes).map((type) => (
              <PokemonsTypeCheckbox
                key={type}
                type={type}
                typesInURL={typesInURL}
                typesInURLNotNullable={typesInURLNotNullable}
                handleTypeChange={handleTypeChange}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
