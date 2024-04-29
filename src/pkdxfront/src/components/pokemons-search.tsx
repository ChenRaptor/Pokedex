"use client"
import colorTypes from "@/config/type"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import { PokemonType } from "@/routes/pokemons"
import Image from "next/image"
import { useQueryStates, useQueryState, parseAsString } from 'nuqs'

export function PokemonsSearch() {
  const [partialNameInURL, setPartialNameInURL] = useQueryState('partialName')

  const [typesInURL, setTypesInURL] = useQueryStates(
    {
      typeOne: parseAsString,
      typeTwo: parseAsString
    },
    {
      history: 'push'
    }
  )

  const typesInURLNotNullable = [typesInURL.typeOne, typesInURL.typeTwo]

  const handleTypeChange = (type: string, primaryType?: boolean) => {
    if (primaryType === true) {
      if (typesInURL.typeOne === type) {
        setTypesInURL({
          typeOne: null,
          typeTwo: typesInURL.typeTwo
        })
        return
      }
      setTypesInURL({
        typeOne: type,
        typeTwo: typesInURL.typeTwo
      })
    } else if (primaryType === false) {
      if (typesInURL.typeTwo === type) {
        setTypesInURL({
          typeOne: typesInURL.typeOne,
          typeTwo: null
        })
        return
      }
      setTypesInURL({
        typeOne: typesInURL.typeOne,
        typeTwo: type
      })
    } else {
      if (typesInURL.typeOne === null) {
        setTypesInURL({
          typeOne: type,
          typeTwo: typesInURL.typeTwo
        })
      } else if (typesInURL.typeTwo === null) {
        setTypesInURL({
          typeOne: typesInURL.typeOne,
          typeTwo: type
        })
      }
    }
  }

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
                <Checkbox id={type} className="hidden" />
                <div className="grid gap-1.5 leading-none h-32" onClick={() => handleTypeChange(type, typesInURLNotNullable.includes(type) ? typesInURL.typeOne === type : undefined)}>
                  <Label
                    htmlFor={type}
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary ${typesInURLNotNullable.includes(type) ? 'border-primary' : ''}`}
                  >
                    <Image src={colorTypes[type as PokemonType].image} alt="Credit card" width={48} height={48} />
                    <h4>{type}</h4>
                    <p className="text-slate-400">{typesInURLNotNullable.includes(type) ? typesInURL.typeOne === type ? "primary" : "secondary" : null}</p>
                  </Label>
                </div>
              </div>
            ))
          }
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Nom" onChange={(event) => setPartialNameInURL(event.target.value)} value={partialNameInURL ?? ""}/>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
