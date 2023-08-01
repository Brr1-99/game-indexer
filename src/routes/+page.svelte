<script lang="ts">
    import { Button, ModalGame } from '$lib/components'
    import { gamesContext, modalContext, modalTypeContext, ownersContext } from '$lib/context/general'

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
</script>

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
        {#each $gamesContext as game}
            <div class="rounded bg-zinc-700 p-2">
                <p class="pb-4">
                    <i class="bi bi-person-fill" />
                    {game.name}
                </p>
            </div>
        {/each}
    </div>
</section>
