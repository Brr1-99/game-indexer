<script lang="ts">
    import { modalContext, modalTypeContext, selectedOwnerContext } from '$lib/context/general'
    import type { OwnerDto } from '$lib/types'
    import { Button, Image } from '.'

    export let owner: OwnerDto

    function linkGames() {
        modalTypeContext.set('link-games')
        modalContext.set(!$modalContext)
        selectedOwnerContext.set(owner)
    }
</script>

<div class="rounded bg-zinc-700 p-2">
    <div class="mb-2 text-center text-xl flex gap-2">
        <div class="w-12 h-12">
            <Image src={owner.imageUrl} />
        </div>
        <span>{owner.name}</span>
    </div>

    <div class="flex justify-between items-center mb-2">
        <p class="text-center">games: {owner.gamesOwned.length}</p>
        <Button onClick={linkGames} title='Add games' >
            <i class="bi bi-list-ul"></i>
        </Button>
    </div>

    <hr />

    <div class="grid pt-2">
        {#each owner.gamesOwned as game}
            <span>{game}</span>
        {/each}
    </div>
</div>
