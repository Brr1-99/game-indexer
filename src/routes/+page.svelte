<script lang="ts">
    import { onMount } from 'svelte'
    import { DatabaseService } from '$lib/services/DatabaseService'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import type { GameDto, OwnerDto } from '$lib/types'
    import { Button, ModalGame } from '$lib/components'

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)
    const data: {
        owners: Array<OwnerDto>
        games: Array<GameDto>
    } = {
        owners: [],
        games: [],
    }

    // Get current state of owners and games
    onMount(async () => {
        data.owners = await databaseService.getOwners()
        data.games = await databaseService.getGames()
    })

    // ------------------ Button functions ------------------
    async function createUser() {
        // TODO: pop the modal to create a new owner
        const owner_names_pool = ['David', 'John', 'Michael', 'Robert', 'James', 'William', 'Mary']
        const res = await databaseService.setOwner({
            name: owner_names_pool[Math.floor(Math.random() * owner_names_pool.length)],
            games: [],
        })
        // reload data.owners
        data.owners = await databaseService.getOwners()
    }

    async function createGame() {}
</script>

<ModalGame />

<!-- OWNERS -->
<section class="mx-auto w-96 bg-zinc-800 p-8">
    <h2 class="text-2xl font-bold">Owners</h2>
    <hr />

    <Button onClick={createUser}>
        <i class="bi bi-person-fill-add" /> Add
    </Button>

    <div class="mt-4 grid grid-cols-2 gap-4">
        {#each data.owners as owner}
            <div class="rounded bg-zinc-700 p-2">
                <p class="pb-4">
                    <i class="bi bi-person-fill" />
                    {owner.name}
                </p>
                <p class="text-center">games: {owner.games.length}</p>
            </div>
        {/each}
    </div>
</section>

<br />
<br />
<br />

<!-- GAMES -->
<section class="mx-auto w-96 bg-zinc-800 p-8">
    <h2 class="text-2xl font-bold">Games</h2>
    <hr />
    <Button onClick={createGame}>
        <i class="bi bi-person-fill-add" /> Add
    </Button>

    <div class="mt-4 grid grid-cols-2 gap-4">
        {#each data.games as game}
            <div class="rounded bg-zinc-700 p-2">
                <p class="pb-4">
                    <i class="bi bi-person-fill" />
                    {game.name}
                </p>
            </div>
        {/each}
    </div>
</section>
