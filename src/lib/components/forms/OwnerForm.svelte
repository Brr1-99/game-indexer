<script lang="ts">
    import type { OwnerDto } from '$lib/types'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { DatabaseService } from '$lib/services/DatabaseService'
    import { modalContext, ownersContext } from '$lib/context/general'
    import { Button } from '..'

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)
    const new_owner: OwnerDto = {
        name: '',
        imageUrl: '',
        gamesOwned: [],
        gamesPlayed: {},
    }

    async function createOwner() {
        if (new_owner.name === '') return alert('Game name cannot be empty')

        await databaseService.setOwner(new_owner)

        // update gamesContext
        const owners = await databaseService.getOwners()
        ownersContext.set(owners)

        // close modal
        modalContext.set(false)
    }
</script>

<div class="flex flex-col gap-2">
    <h2 class="mr-16 text-2xl font-bold">Register a new owner</h2>
    <hr class="my-4 w-4/5" />

    <div class="flex flex-col gap-2">
        <label for="name">Your name:</label>
        <input class="mb-2 bg-zinc-700 p-1" type="text" id="name" bind:value={new_owner.name} placeholder="Name" />
    </div>

    <label for="name">Image URL:</label>
    <input class="mb-2 bg-zinc-700 p-1" type="text" id="name" bind:value={new_owner.imageUrl} placeholder="https://public-url.png" />

    <Button onClick={createOwner}>Confirm</Button>
</div>
