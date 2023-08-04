<script lang="ts">
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { DatabaseService } from '$lib/services/DatabaseService'
    import { gamesContext, modalContext, selectedGameContext } from '$lib/context/general'
    import { Button } from '..'

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    async function createGame() {
        if ($selectedGameContext!.gameDuration === 0) return alert('Game duration cannot be 0')
        if ($selectedGameContext!.minPlayers === 0) return alert('Game min players cannot be 0')
        if ($selectedGameContext!.maxPlayers === 0) return alert('Game max players cannot be 0')

        await databaseService.setGame($selectedGameContext!)

        // update gamesContext
        const games = await databaseService.getGames()
        gamesContext.set(games)

        // close modal
        modalContext.set(false)
    }
</script>

{#if $selectedGameContext}
    <div>
        <h2 class="mr-16 text-2xl font-bold">Edit {$selectedGameContext.name}</h2>
        <hr class="my-4 w-4/5" />

        <div class="flex flex-col gap-2">
            <label for="name">Name of the game:</label>
            <span class="mb-2 bg-zinc-700 p-1 text-gray-400">
                <i class="bi bi-info-circle-fill text-white" title="You cannot edit the game name"></i> {$selectedGameContext.name}
            </span>

            <label for="gameDuration">Average duration in minutes:</label>
            <input class="mb-2 bg-zinc-700 p-1" type="number" id="gameDuration" min="5" bind:value={$selectedGameContext.gameDuration} placeholder="Duration" />

            <p>Number of players</p>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-2">
                    <label for="minPlayers">Minimum:</label>
                    <input class="mb-2 bg-zinc-700 p-1" type="number" id="minPlayers" min="1" bind:value={$selectedGameContext.minPlayers} placeholder="Min players" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="maxPlayers">Maximum:</label>
                    <input class="mb-2 bg-zinc-700 p-1" type="number" id="maxPlayers" min="1" bind:value={$selectedGameContext.maxPlayers} placeholder="Max players" />
                </div>
            </div>

            <label for="name">Image URL:</label>
            <input class="mb-2 bg-zinc-700 p-1" type="text" id="name" bind:value={$selectedGameContext.imageUrl} placeholder="https://public-url.png" />
        </div>

        <Button onClick={createGame}>Confirm</Button>
    </div>
{/if}