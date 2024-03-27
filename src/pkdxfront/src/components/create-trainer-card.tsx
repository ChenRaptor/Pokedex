import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"

export function CreateTrainerCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer mon trainer</CardTitle>
        <CardDescription>
          Connecter pour profiter de davantage de fonctionnalités.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="trainer">Nom du trainer</Label>
            <Input id="trainer" placeholder="trainer" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="avatar">Avatar</Label>
            <Input id="avatar" type="file" placeholder="avatar" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Créer le trainer</Button>
      </CardFooter>
    </Card>
  )
}