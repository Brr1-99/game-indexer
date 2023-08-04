<script lang="ts">
    import { modalContext, modalTypeContext, selectedGameContext } from "$lib/context/general"
    import type { GameDto } from "$lib/types"
    import { Button, Image } from "."

    export let game: GameDto

    function editGame() {
        modalContext.set(!$modalContext)
        modalTypeContext.set('edit-game')
        selectedGameContext.set(game)
    }
</script>

<div class="rounded bg-zinc-700 p-2 grid grid-rows-2">
    <Image src={game.imageUrl} />

    <div class="relative">
        <h3 class="text-lg py-2">{game.name}</h3>
        <p><i class="bi bi-clock-fill"></i> {game.gameDuration} mins</p>
        <p><i class="bi bi-people-fill"></i> {game.minPlayers} - {game.maxPlayers}</p>
    
        <div class="absolute bottom-0 right-0">
            <Button onClick={editGame} title="Edit game">
                <i class="bi bi-pencil-square"></i>
            </Button>
        </div>
    </div>
</div>
