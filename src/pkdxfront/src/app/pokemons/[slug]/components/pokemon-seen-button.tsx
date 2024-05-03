export default function PokemonSeenButton({token, pokemon}: {token: string, pokemon: string}) {
  const router = useRouter()

  const seenIcon = async () => {
    await seenPokemon(token, pokemon);
    router.refresh()
  }

  return (
    <Button onClick={seenIcon} className="w-12 h-12 cursor-pointer" variant="outline"><EyeIcon className="scale-150 stroke-green-500"/></Button>
  )
}