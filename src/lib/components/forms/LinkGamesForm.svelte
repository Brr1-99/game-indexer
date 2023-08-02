<script lang="ts">
    import type { OwnerDto } from '$lib/types'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { DatabaseService } from '$lib/services/DatabaseService'
    import { gamesContext, ownersContext, selectedOwnerContext } from '$lib/context/general'

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    async function gameClicked(new_game: string): Promise<void> {
        // deep clone
        const owner: OwnerDto = JSON.parse(JSON.stringify($selectedOwnerContext))

        // If its present -> remove it
        if (owner.games.includes(new_game)) {
            owner.games = owner.games.filter((game) => game !== new_game)
        } else {
            // Add it
            owner.games.push(new_game)
        }
        
        // Update it in Redis
        await databaseService.setOwner(owner)

        // Update the context
        selectedOwnerContext.set(owner)
        ownersContext.set(await databaseService.getOwners())
    }
</script>

<div class="">
    <h2 class="mr-16 text-2xl font-bold">Which games does {$selectedOwnerContext?.name} have?</h2>
    <hr class="my-4 w-4/5" />
    <p class="mb-2 text-center text-xl flex gap-2">
        <img class="rounded" src={$selectedOwnerContext?.imageUrl} alt="avatar {$selectedOwnerContext?.name}" width="48px" />
        <span>{$selectedOwnerContext?.name} games:</span>
    </p>

    <p>If you want have a game that is not in the list, <br/> add them on the main page</p>

    <hr class="my-4 w-4/5" />
    <div class="grid grid-cols-3 gap-2">
        {#each $gamesContext as game}
            <button
                on:click={() => gameClicked(game.name)}
                class="bg-zinc-700 py-1 px-2 border {$selectedOwnerContext?.games.includes(game.name) ? 'border-green-400' : 'border-red-400'}">
                <p>{game.name}</p>
                <p><i class="bi bi-clock-fill"></i> {game.gameDuration} mins</p>
                <p><i class="bi bi-people-fill"></i> {game.minPlayers} - {game.maxPlayers}</p>
            </button>
        {/each}
    </div>
</div>
