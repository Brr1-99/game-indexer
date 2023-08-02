<script lang="ts">
    import { faker } from '@faker-js/faker'
    import type { OwnerDto } from '$lib/types'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { DatabaseService } from '$lib/services/DatabaseService'
    import { modalContext, ownersContext } from '$lib/context/general'
    import { Button } from '..'

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)
    const new_game: OwnerDto = {
        name: '',
        imageUrl: '',
        games: [],
    }

    async function createOwner() {
        if (new_game.name === '') return alert('Game name cannot be empty')

        // Try to get the image from githubç
        const res = await fetch(`https://api.github.com/users/${new_game.name}`)
        const data = await res.json()
        new_game.imageUrl = res.ok
            ? data.avatar_url // its github image
            : faker.image.avatar() // get a random one from faker

        await databaseService.setOwner(new_game)

        // update gamesContext
        const owners = await databaseService.getOwners()
        ownersContext.set(owners)

        // close modal
        modalContext.set(false)
    }
</script>

<div class="">
    <h2 class="mr-16 text-2xl font-bold">Register a new owner</h2>
    <hr class="my-4 w-4/5" />

    <div class="flex flex-col gap-2">
        <label for="name">Your name:</label>
        <input class="mb-2 bg-zinc-700 p-1" type="text" id="name" bind:value={new_game.name} placeholder="Name" />
    </div>

    <Button onClick={createOwner}>Confirm</Button>
</div>
