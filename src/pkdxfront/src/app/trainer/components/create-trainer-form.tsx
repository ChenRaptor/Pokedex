"use client"
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { createTrainer, getTrainer, TrainerDTO } from "@/routes/trainer";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import { toast } from "@/registry/new-york/ui/use-toast";
import { useRouter } from "next/navigation";

const resolver: Resolver<TrainerDTO, any> = async (data) => {
  if (data.trainerName.length === 0) {
    return {
      values: data,
      errors: {
        username: {
          type: 'manual',
          message: 'This trainer name is required'
        }
      }
    }
  }
  return {
    values: data,
    errors: {}
  }
}

export default function CreateTrainerForm({token}: {token: string}) {
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<TrainerDTO>({ resolver })
  const onSubmit: SubmitHandler<TrainerDTO> = (data) => createTrainer(token, data).then(res => {
    if ("error" in res) {
      toast({
        className: "bg-red-500 text-white",
        title: "Invalid credentials",
        description: "There was a problem with your request.",
      })
    } else {
      router.refresh()
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
    <h1 className="text-5xl font-extrabold dark:text-white">Créer votre dresseur pokemon</h1>
    <p>Pas encore un dresseur de Pokémon ? Remédiez-y en remplissant ceci.</p>
    <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2 space-y-2">
          <Label htmlFor="trainerName">Nom du dresseur *</Label>
          <Input id="trainerName" {...register("trainerName")} placeholder="Utilisateur"/>
          <small className="grid gap-2 space-y-2">
            {formState.errors.trainerName && <p className="text-red-500">{formState.errors.trainerName.message}</p>}
          </small>
        </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2 space-y-2">
          <Label htmlFor="imgUrl">URL de photo de profil</Label>
          <Input id="imgUrl" {...register("imgUrl")} placeholder="Mot de passe"/>
          <small className="grid gap-2 space-y-2">
            {formState.errors.imgUrl && <p className="text-red-500">{formState.errors.imgUrl.message}</p>}
          </small>
        </div>
    </div>
    <Button type="submit">Valider</Button>
  </form>
  )
}