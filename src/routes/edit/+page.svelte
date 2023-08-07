<script lang="ts">
    import { Button, GameCard, ModalGame, OwnerCard } from '$lib/components'
    import { gamesContext, modalContext, modalTypeContext, ownersContext } from '$lib/context/general'

    // ------------------ Button functions ------------------
    async function createOwner() {
        modalTypeContext.set('create-owner')
        modalContext.set(!$modalContext)
    }

    async function createGame() {
        modalTypeContext.set('create-game')
        modalContext.set(!$modalContext)
    }
</script>

<ModalGame />

<div class="container mx-auto grid gap-8 lg:grid-cols-2">
    <!-- OWNERS -->
    <section class="p-8">
        <h2 class="text-2xl font-bold">Owners</h2>
        <hr class="mb-2" />

        <Button onClick={createOwner}>
            <i class="bi bi-person-fill-add" /> Add
        </Button>

        <div class="mt-4 grid grid-cols-2 gap-2 lg:gap-4 xl:grid-cols-3">
            {#each $ownersContext as owner}
                <OwnerCard {owner} />
            {/each}
        </div>
    </section>

    <!-- GAMES -->
    <section class="p-8">
        <h2 class="text-2xl font-bold">Games: {$gamesContext.length}</h2>
        <hr class="mb-2" />

        <Button onClick={createGame}>
            <i class="bi bi-person-fill-add" /> Add
        </Button>

        <div class="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-3">
            {#each $gamesContext.sort((a, b) => a.name.localeCompare(b.name)) as game}
                <GameCard {game} />
            {/each}
        </div>
    </section>
</div>
