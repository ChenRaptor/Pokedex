"use server"
import { getTokenInCookies } from "@/lib/cookies";
import { getTrainer } from "@/routes/trainer";
import { redirect } from "next/navigation";
import CreateTrainerForm from "./components/create-trainer-form";
import DeleteTrainerButton from "./components/delete-trainer-button";
import Image from "next/image";
import { Separator } from "@/registry/new-york/ui/separator";

export default async function RegisterPage() {

    const token = await getTokenInCookies()
    if (token === undefined) {
      redirect("/")
    }

    const value = token?.value ? await getTrainer(token.value) : null
    console.log(value)
    if (!value) {

    }
    if (value && "error" in value) {

    }

    return (
      <div className="container mx-auto py-16 h-screen">
        {
          value ? "error" in value ?
          <CreateTrainerForm token={token.value} />
          :
            <>
              <h1 className="text-5xl font-extrabold dark:text-white">Votre dresseur pokemon</h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-8 mt-8">
                  <h3 className="text-3xl font-bold dark:text-white">Pokémons attrapés</h3>

                  {value.pkmnCatch.map((pkmn, index) => {
                    return (
                      <div key={index} className="flex items-center justify-between w-full">
                        <p>{pkmn}</p>
                      </div>
                    )
                  })}

                  <h3 className="text-3xl font-bold dark:text-white">Pokémons vus</h3>

                  {value.pkmnSeen.map((pkmn, index) => {
                    return (
                      <div key={index} className="flex items-center justify-between w-full">
                        <p>{pkmn}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-end">
                  <div className="flex gap-4 fixed">
                    <div className="flex items-end justify-center flex-col gap-4">
                      <div className="relative w-[30rem] h-[30rem]">
                        <Image src={value.image} alt="" fill style={{objectFit: "cover"}}></Image>
                      </div>
                      <h2 className="text-4xl font-bold dark:text-white">{value.trainerName}</h2>
                      <Separator />
                      <div className="flex items-center justify-between w-full">
                        <p>Avatar de:</p>
                        <p>{value.username}</p>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p>Date de création:</p>
                        <p>{new Date(value.creationDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p>Pokémons vus:</p>
                        <p>{value.pkmnSeen.length}</p>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p>Pokémons attrapés:</p>
                        <p>{value.pkmnCatch.length}</p>
                      </div>
                    </div>
                    <DeleteTrainerButton token={token.value} />
                  </div>
                </div>
              </div>
            </>
          : null
        }
      </div>
    );
}