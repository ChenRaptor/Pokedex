"use client"
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { Button } from "@/registry/new-york/ui/button";
import { loginUser } from "@/routes/user";
import { toast } from "@/registry/new-york/ui/use-toast";
import { useRouter } from 'next/navigation';
import { setTokenInCookies } from "@/lib/cookies";

interface IFormInput {
  username: string
  password: string
}

const resolver: Resolver<IFormInput, any> = async (data) => {
  if (data.username.length === 0) {
    return {
      values: data,
      errors: {
        username: {
          type: 'manual',
          message: 'This username is required'
        }
      }
    }
  } else if (data.password.length === 0) {
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

export default function LoginPage() {

  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<IFormInput>({ resolver })
  const onSubmit: SubmitHandler<IFormInput> = (data) => loginUser({
    login: data.username,
    password: data.password
  }).then(res => {
    if ("error" in res) {
      toast({
        className: "bg-red-500 text-white",
        title: "Invalid credentials",
        description: "There was a problem with your request.",
      })
    } else {
      setTokenInCookies(res.token)
      router.refresh()
      router.push("/")
    }
  })

  return (
    <div className="container mx-auto py-16">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="text-5xl font-extrabold dark:text-white">Se connecter</h1>

        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2 space-y-2">
              <Label htmlFor="username">Nom d&apos;utilisateur *</Label>
              <Input id="username" {...register("username")} placeholder="Utilisateur"/>
              <small className="grid gap-2 space-y-2">
                {formState.errors.username && <p className="text-red-500">{formState.errors.username.message}</p>}
              </small>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2 space-y-2">
              <Label htmlFor="password">Votre mot de passe *</Label>
              <Input id="password" {...register("password")} placeholder="Mot de passe"/>
              <small className="grid gap-2 space-y-2">
                {formState.errors.password && <p className="text-red-500">{formState.errors.password.message}</p>} 
              </small>
            </div>
        </div>
        <Button type="submit">Valider</Button>
      </form>

    </div>
  );
}