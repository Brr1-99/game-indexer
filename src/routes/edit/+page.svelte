<script lang="ts">
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { Button, GameCard, ModalGame, OwnerCard } from '$lib/components'
    import { gamesContext, modalContext, modalTypeContext, ownersContext } from '$lib/context/general'
    import { DatabaseService } from '$lib/services/DatabaseService.js'

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    // ------------------ Button functions ------------------
    async function createOwner() {
        modalTypeContext.set('create-owner')
        modalContext.set(!$modalContext)
    }

    async function createGame() {
        modalTypeContext.set('create-game')
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

<!-- ONLY IF NEEDED -->
<!-- <Button onClick={reset}>
    reset DB
</Button> -->

<ModalGame />

<div class="container mx-auto grid lg:grid-cols-2 gap-8">
    <!-- OWNERS -->
    <section class="p-8">
        <h2 class="text-2xl font-bold">Owners</h2>
        <hr />

        <Button onClick={createOwner}>
            <i class="bi bi-person-fill-add" /> Add
        </Button>

        <div class="mt-4 grid grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
            {#each $ownersContext as owner}
                <OwnerCard {owner} />
            {/each}
        </div>
    </section>

    <!-- GAMES -->
    <section class="p-8">
        <h2 class="text-2xl font-bold">Games</h2>
        <hr />

        <Button onClick={createGame}>
            <i class="bi bi-person-fill-add" /> Add
        </Button>

        <div class="mt-4 grid grid-cols-2 xl:grid-cols-3 gap-4">
            {#each $gamesContext.sort((a, b) => a.name.localeCompare(b.name)) as game}
                <GameCard {game} />
            {/each}
        </div>
    </section>
</div>
