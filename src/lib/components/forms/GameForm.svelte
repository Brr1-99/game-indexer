<script lang="ts">
    import type { GameDto } from '$lib/types'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { DatabaseService } from '$lib/services/DatabaseService'
    import { gamesContext, modalContext } from '$lib/context/general'
    import { Button } from '..'

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)
    const new_game: GameDto = {
        name: '',
        imageUrl: '',
        gameDuration: 0,
        minPlayers: 0,
        maxPlayers: 0,
    }

    async function createGame() {
        if (new_game.name === '') return alert('Game name cannot be empty')
        if (new_game.gameDuration === 0) return alert('Game duration cannot be 0')
        if (new_game.minPlayers === 0) return alert('Game min players cannot be 0')
        if (new_game.maxPlayers === 0) return alert('Game max players cannot be 0')

        await databaseService.setGame(new_game)

        // update gamesContext
        const games = await databaseService.getGames()
        gamesContext.set(games)

        // close modal
        modalContext.set(false)
    }
</script>

<div class="">
    <h2 class="mr-16 text-2xl font-bold">Register a new game</h2>
    <hr class="my-4 w-4/5" />

    <div class="flex flex-col gap-2">
        <label for="name">Name of the game:</label>
        <input class="mb-2 bg-zinc-700 p-1" type="text" id="name" bind:value={new_game.name} placeholder="Name" />

        <label for="gameDuration">Average duration in minutes:</label>
        <input class="mb-2 bg-zinc-700 p-1" type="number" id="gameDuration" min="5" bind:value={new_game.gameDuration} placeholder="Duration" />

        <p>Number of players</p>
        <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
                <label for="minPlayers">Minimum:</label>
                <input class="mb-2 bg-zinc-700 p-1" type="number" id="minPlayers" min="1" bind:value={new_game.minPlayers} placeholder="Min players" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="maxPlayers">Maximum:</label>
                <input class="mb-2 bg-zinc-700 p-1" type="number" id="maxPlayers" min="1" bind:value={new_game.maxPlayers} placeholder="Max players" />
            </div>
        </div>

        <label for="name">Image URL:</label>
        <input class="mb-2 bg-zinc-700 p-1" type="text" id="name" bind:value={new_game.imageUrl} placeholder="https://public-url.png" />
    </div>

    <Button onClick={createGame}>Confirm</Button>
</div>
