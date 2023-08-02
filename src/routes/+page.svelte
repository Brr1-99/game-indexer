<script lang="ts">
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { Button, GameCard, ModalGame, OwnerCard } from '$lib/components'
    import { gamesContext, modalContext, modalTypeContext, ownersContext } from '$lib/context/general'
    import { DatabaseService } from '$lib/services/DatabaseService.js'
    
    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    // ------------------ Data ------------------
    export let data
    ownersContext.set(data.owners)
    gamesContext.set(data.games)

    // ------------------ Button functions ------------------
    async function createOwner() {
        modalTypeContext.set('owner')
        modalContext.set(!$modalContext)
    }

    async function createGame() {
        modalTypeContext.set('game')
        modalContext.set(!$modalContext)
    }

    async function reset() {
        await databaseService.reset()
        const owners = await databaseService.getOwners()
        const games = await databaseService.getGames()
        ownersContext.set(owners)
        gamesContext.set(games)
    }

</script>

<Button onClick={reset}>
    reset DB
</Button>

<ModalGame />

<!-- OWNERS -->
<section class="mx-auto w-96 bg-zinc-800 p-8">
    <h2 class="text-2xl font-bold">Owners</h2>
    <hr />

    <Button onClick={createOwner}>
        <i class="bi bi-person-fill-add" /> Add
    </Button>

    <div class="mt-4 grid grid-cols-2 gap-4">
        {#each $ownersContext as owner}
            <OwnerCard {owner} />
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
        {#each $gamesContext as game}
            <GameCard {game} />
        {/each}
    </div>
</section>
