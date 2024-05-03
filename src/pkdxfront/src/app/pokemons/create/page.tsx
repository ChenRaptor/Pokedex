"use server"
import { getTokenInCookies } from "@/lib/cookies";
import { redirect } from "next/navigation";
import AddPokemonForm from "./components/add-pokemon-form";

export default async function CreatePage() {

  const token = await getTokenInCookies()
  if (token === undefined) {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-16">
      <AddPokemonForm token={token.value} />
    </div>
  );
}