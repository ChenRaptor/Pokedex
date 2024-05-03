import { getPokemonSSR } from "@/hooks/use-get-pokemon"
import { Badge } from "@/registry/new-york/ui/badge"
import Image from "next/image"

interface PokemonPageProps {
  params: {
    slug: string
  }
}

import colorTypes from "@/config/type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/ui/card"
import { PokemonEditDialog } from "./components/pokemon-edit-dialog"
import { PokemonDeleteDialog } from "./components/pokemon-delete-dialog"
import PokedexVoiceSpeak from "@/app/pokemons/[slug]/components/text-to-speech"


export default async function PokemonPage ({params}: PokemonPageProps) {
  const { slug } = params
  const pokemon = await getPokemonSSR(slug)
  console.log(pokemon)

  const audioText = pokemon.description || "Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une seconde à du texte standard. Si vous voulez utiliser un passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien d'embarrassant caché dans le texte. Tous les générateurs de Lorem Ipsum sur Internet tendent à reproduire le même extrait sans fin, ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum. Iil utilise un dictionnaire de plus de 200 mots latins, en combinaison de plusieurs structures de phrases, pour générer un Lorem Ipsum irréprochable. Le Lorem Ipsum ainsi obtenu ne contient aucune répétition, ni ne contient des mots farfelus, ou des touches d'humour."
  return (
    <div className="container mx-auto py-16">
      <PokemonEditDialog pkmn={pokemon}/>
      <PokemonDeleteDialog pkmn={pokemon}/>
      <PokedexVoiceSpeak text={audioText}/>



      <div className="grid grid-cols-2">
        <div className="space-y-4">
          <Card className="h-fit">
            <CardHeader className="space-y-4">
              <CardTitle className="text-3xl font-bold dark:text-white">{pokemon.name}</CardTitle>
              <CardDescription className="text-justify">{audioText}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-fit">
            <CardHeader className="space-y-4">
              <CardTitle>Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                {pokemon.types.map((type, index) => (
                  <Badge key={pokemon.id + type} className={`bg-slate-900 p-0 flex items-center justify-between pl-2 hover:bg-slate-900`}>
                    <p className="w-32 indent-5">{index ? " SECONDARY" : "PRIMARY"}</p>
                    <span className={`${colorTypes[type].bg} px-2.5 py-2.5 rounded-r-full w-32`}>{type}</span>
                  </Badge>
                ))}
                </div>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader className="space-y-4">
              <CardTitle>Régions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pokemon.regions.length === 0 && <p>Aucune région renseignée</p>}
              {pokemon.regions.map((region) => (
                <Badge key={region} className={`bg-slate-900 p-0 flex items-center justify-between pl-2 hover:bg-slate-900`}>
                  <span className="w-32">{region}</span>
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>


        <div className="m-auto">
          { pokemon && <Image src={(pokemon as any).image} alt="alt" height={500} width={500}/> }
        </div>


      </div>
      <div className={`fixed inset-0 ${colorTypes[pokemon.types[0]].bg}`} style={{zIndex: -1}}></div>
    </div>
  )
}