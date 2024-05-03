"use client"
import PokemonsContainer from "@/components/pokemons-container";
import { PokemonsSearch } from "@/components/pokemons-search";
import useRefresh from "@/hooks/use-refresh";
import { Separator } from "@/registry/new-york/ui/separator";
import { Suspense } from "react";

export default function Home() {
  const refresh = useRefresh();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {
        !refresh && <div className="invisible absolute">refresh</div>
      }
      <div className="container mx-auto py-16 space-y-8">
        <PokemonsSearch />
        <Separator className="my-4" />
        <PokemonsContainer />
      </div>
    </Suspense>
  );
}