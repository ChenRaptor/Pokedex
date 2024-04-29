import { getPokemonSSR } from "@/hooks/use-get-pokemon"
import { Badge } from "@/registry/new-york/ui/badge"
import Image from "next/image"

interface PokemonPageProps {
  params: {
    slug: string
  }
}

import colorTypes from "@/config/type"

export default async function PokemonPage ({params}: PokemonPageProps) {
  const { slug } = params
  const pokemon = await getPokemonSSR(slug)
  console.log(pokemon)
  return (
    <>
      <div className="container mx-auto py-16 space-y-8">
        <h1 className="text-xl font-bold text-black">{pokemon.name}</h1>
        <p className="text-slate-800 font-bold text-justify">{pokemon.description === '' && "Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une seconde à du texte standard. Si vous voulez utiliser un passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien d'embarrassant caché dans le texte. Tous les générateurs de Lorem Ipsum sur Internet tendent à reproduire le même extrait sans fin, ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum. Iil utilise un dictionnaire de plus de 200 mots latins, en combinaison de plusieurs structures de phrases, pour générer un Lorem Ipsum irréprochable. Le Lorem Ipsum ainsi obtenu ne contient aucune répétition, ni ne contient des mots farfelus, ou des touches d'humour."}</p>
        <div className="grid grid-cols-2 place-items-center">
          { pokemon && <Image src={(pokemon as any).image} alt="alt" height={500} width={500}/> }
          <div className="space-y-4">
          {pokemon.types.map((type, index) => (
            <Badge key={pokemon.id + type} className="bg-slate-500 p-0 flex items-center justify-between pl-2 border-4">
              <p className="w-32">{index ? " SECONDARY" : "PRIMARY"}</p>
              <span className={`${colorTypes[type].bg} px-2.5 py-2.5 rounded-r-full w-32`}>{type}</span>
            </Badge>
          ))}
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 ${colorTypes[pokemon.types[0]].bg}`} style={{zIndex: -1}}></div>
    </>
  )
}