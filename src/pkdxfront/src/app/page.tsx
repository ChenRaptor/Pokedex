"use client"
import PokemonsContainer from "@/components/pokemons-container";
import { PokemonsSearch } from "@/components/pokemons-search";
import { Separator } from "@/registry/new-york/ui/separator";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto py-16 space-y-8">
        <PokemonsSearch />
        <Separator className="my-4" />
        <PokemonsContainer />
      </div>
    </Suspense>
  );
}