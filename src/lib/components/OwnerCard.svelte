<script lang="ts">
    import { modalContext, modalTypeContext, selectedOwnerContext } from '$lib/context/general'
    import type { OwnerDto } from '$lib/types'
    import { Button } from '.'

    export let owner: OwnerDto

    function linkGames() {
        modalTypeContext.set('link-games')
        modalContext.set(!$modalContext)
        selectedOwnerContext.set(owner)
    }
</script>

<div class="rounded bg-zinc-700 p-2">
    <p class="mb-2 text-center text-xl flex gap-2">
        <img class="rounded" src={owner.imageUrl} alt="avatar {owner.name}" width="48px" />
        <span>{owner.name}</span>
    </p>

    <div class="flex justify-between items-center mb-2">
        <p class="text-center">games: {owner.games.length}</p>
        <Button onClick={linkGames} title='Add games' >
            <i class="bi bi-list-ul"></i>
        </Button>
    </div>

    <hr />

    <div class="grid pt-2">
        {#each owner.games as game}
            <span>{game}</span>
        {/each}
    </div>
</div>
