"use client"
import MultipleSelector, { Option } from "@/components/mutiple-selector";
import { Button } from "@/registry/new-york/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { toast } from "@/registry/new-york/ui/use-toast";
import { addPokemons, PkmnDTO, PokemonType } from "@/routes/pokemons";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  name: string
  imgUrl: string
  description: string
  types: Option[]
  regions: Option[]
}

const OPTIONS_1: Option[] = [
  { label: 'STEEL', value: 'STEEL' },
  { label: 'DRAGON', value: 'DRAGON' },
  { label: 'ELECTRIC', value: 'ELECTRIC' },
  { label: 'FIRE', value: 'FIRE' },
  { label: 'BUG', value: 'BUG' },
  { label: 'GRASS', value: 'GRASS' },
  { label: 'PSYCHIC', value: 'PSYCHIC' },
  { label: 'GROUND', value: 'GROUND' },
  { label: 'DARK', value: 'DARK'},
  { label: 'FIGHTING', value: 'FIGHTING'},
  { label: 'WATER', value: 'WATER' },
  { label: 'FAIRY', value: 'FAIRY' },
  { label: 'ICE', value: 'ICE' },
  { label: 'NORMAL', value: 'NORMAL' },
  { label: 'POISON', value: 'POISON' },
  { label: 'ROCK', value: 'ROCK' },
  { label: 'GHOST', value: 'GHOST' },
  { label: 'FLYING', value: 'FLYING' },
];

const OPTIONS_2: Option[] = [
  { label: 'Kanto', value: 'Kanto' },
  { label: 'Johto', value: 'Johto' },
  { label: 'Hoenn', value: 'Hoenn' },
  { label: 'Sinnoh', value: 'Sinnoh' },
];

const resolver: Resolver<IFormInput, any> = async (data) => {
  if (data.name.length === 0) {
    return {
      values: data,
      errors: {
        username: {
          type: 'manual',
          message: 'This username is required'
        }
      }
    }
  } else if (data.imgUrl.length === 0) {
    return {
      values: data,
      errors: {
        password: {
          type: 'manual',
          message: 'This password is required'
        }
      }
    }
  }
  return {
    values: data,
    errors: {}
  }
}


export default function AddPokemonForm({token}: {token: string}) {

  const form = useForm<IFormInput>({ resolver })
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const types = data.types.map((type) => type.value)
    const regions = data.regions.map((region) => ({regionName: region.value, regionNumber: 1}))
    const pkmnDTO: PkmnDTO = {
      name: data.name,
      imgUrl: data.imgUrl,
      description: data.description,
      types: types as PokemonType[],
      regions: regions
    }
    console.log(pkmnDTO)
    addPokemons(token, pkmnDTO).then(res => {
      console.log(res)
      if ("error" in res) {
        toast({
          className: "bg-red-500 text-white",
          title: "Invalid credentials",
          description: "There was a problem with your request.",
        })
      } else {
        toast({
          title: "Pokemon ajouté",
          description: "Le pokemon a bien été ajouté au pokedex.",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="text-5xl font-extrabold dark:text-white">Ajouter un pokemon au pokedex</h1>

        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2 space-y-2">
              <Label htmlFor="name">Nom du pokemon *</Label>
              <Input id="name" {...form.register("name")} placeholder="Nom du pokemon"/>
              <small className="grid gap-2 space-y-2">
                {form.formState.errors.name && <p className="text-red-500">{form.formState.errors.name.message}</p>}
              </small>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2 space-y-2">
              <Label htmlFor="imgUrl">Url de l&apos;image du pokemon *</Label>
              <Input id="imgUrl" {...form.register("imgUrl")} placeholder="https://..."/>
              <small className="grid gap-2 space-y-2">
                {form.formState.errors.imgUrl && <p className="text-red-500">{form.formState.errors.imgUrl.message}</p>}
              </small>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2 space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" {...form.register("description")} placeholder="Description"/>
              <small className="grid gap-2 space-y-2">
                {form.formState.errors.description && <p className="text-red-500">{form.formState.errors.description.message}</p>}
              </small>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="types"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Types</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={OPTIONS_1}
                  placeholder="Sélectionne un type primaire (et secondaire)..."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="regions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regions</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={OPTIONS_2}
                  placeholder="Sélectionne une région..."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit">Valider</Button>
      </form>
    </Form>
  );
}