import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { gameId } from "@/lib/utils"
import { CoinsIcon, ScissorsIcon, UserIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

const Page = () => {
  return (
    <div className="min-h-dvh bg-slate-100 p-5">
      {/* user card */}
      <div className="bg-background mt-2 flex items-center justify-between rounded-lg border px-3 py-2">
        {/* username */}
        <div className="flex items-center gap-x-1.5">
          <UserIcon className="size-5 text-blue-500" />
          <div>Username</div>
        </div>
        {/* wallet */}
        <div className="flex items-center gap-x-1.5">
          <CoinsIcon className="size-5 text-orange-500" />
          <div>2000</div>
        </div>
      </div>

      {/* multiplayer games */}
      <div className="mt-8">
        {/* games type */}
        <div className="mb-4 ml-2 text-lg font-medium">Multiplayer Games</div>
        {/* games */}

        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-background mt-2 flex w-full items-center justify-between rounded-lg border px-4 py-5">
              {/* game */}
              <div className="flex items-center gap-x-1.5">
                <ScissorsIcon className="size-5 text-blue-500" />
                <div>Rock Paper Scissors</div>
              </div>
              {/* players */}
              <div className="flex items-center gap-x-1.5">
                <UsersIcon className="size-5 text-orange-500" />
                <div>2</div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="h-full">
            <DialogHeader>
              <div className="flex items-center gap-x-1.5">
                <ScissorsIcon className="size-5 text-blue-500" />
                <div>Rock Paper Scissors</div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <Link href={"/multi/rock-paper-scissors/" + gameId()}>
                <Button className="w-full">NEW GAME</Button>
              </Link>
              <Button className="w-full">JOIN ROOM</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Page
