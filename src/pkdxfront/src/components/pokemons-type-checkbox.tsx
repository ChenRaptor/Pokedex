import colorTypes from "@/config/type";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Label } from "@/registry/new-york/ui/label";
import { PokemonType } from "@/routes/pokemons";
import Image from "next/image";
import { ParserBuilder, Values } from "nuqs";

interface PokemonsTypeCheckboxProps {
  type: string;
  typesInURL: Values<{
    typeOne: ParserBuilder<string>;
    typeTwo: ParserBuilder<string>;
  }>
  typesInURLNotNullable: (string | null)[];
  handleTypeChange: (type: string, primaryType?: boolean) => void;
}

export default function PokemonsTypeCheckbox ({type, typesInURL, typesInURLNotNullable, handleTypeChange}: PokemonsTypeCheckboxProps) {
  return (
    <>
      <Checkbox id={type} className="hidden" />
      <div className="grid gap-1.5 leading-none h-32" onClick={() => handleTypeChange(type, typesInURLNotNullable.includes(type) ? typesInURL.typeOne === type : undefined)}>
        <Label
          htmlFor={type}
          className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary ${typesInURLNotNullable.includes(type) ? 'border-primary' : ''}`}
        >
          <Image src={colorTypes[type as PokemonType].image} alt="Credit card" width={48} height={48} />
          <h4>{type}</h4>
          <p className="text-slate-400">{typesInURLNotNullable.includes(type) ? typesInURL.typeOne === type ? "primary" : "secondary" : null}</p>
        </Label>
      </div>
    </>
  )
}