<script lang="ts">
    import { modalContext, modalTypeContext, selectedGameContext } from '$lib/context/general'
    import type { GameDto } from '$lib/types'
    import { Button, Image } from '.'

    export let game: GameDto
    export let locked = false

    function editGame() {
        modalContext.set(!$modalContext)
        modalTypeContext.set('edit-game')
        selectedGameContext.set(game)
    }
</script>

<div class="grid grid-rows-2 rounded bg-zinc-700 p-2">
    <!-- <div class="bgimage h-full w-full rounded" style="background-image: url({game.imageUrl});" /> -->
    <Image src={game.imageUrl} />

    <div class="relative">
        <h3 class="py-2 text-lg">{game.name}</h3>
        <p><i class="bi bi-clock-fill" /> {game.gameDuration} mins</p>
        <p><i class="bi bi-people-fill" /> {game.minPlayers} - {game.maxPlayers}</p>

        {#if !locked}
            <div class="absolute bottom-0 right-0">
                <Button onClick={editGame} title="Edit game">
                    <i class="bi bi-pencil-square" />
                </Button>
            </div>
        {/if}
    </div>
</div>