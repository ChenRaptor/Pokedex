"use client"
import PokemonsContainer from "@/components/pokemons-container";
import { PokemonsSearch } from "@/components/pokemons-search";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto py-16">
        <PokemonsSearch />
        <PokemonsContainer />
      </div>
    </Suspense>
  );
}