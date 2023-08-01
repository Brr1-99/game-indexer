<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import { DatabaseService } from '$lib/services/DatabaseService'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'

    let name = 'David'
    let screen = ''

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    const handle = () => {
        console.log('clicked')
        databaseService.getKeys().then(res => {
            console.log(res)
        })
    }

    async function createRandomOwner() {
        const owner_names_pool = [
            'David',
            'John',
            'Michael',
            'Robert',
            'James',
            'William',
            'Mary',
        ]
        const res = await databaseService.setOwner({
            name: owner_names_pool[Math.floor(Math.random() * owner_names_pool.length)],
            games: [],
        })
        console.log(res)
    }
</script>

<div class="container mx-auto w-96 bg-zinc-800 py-20">
    <h1 class="text-2xl font-bold">Game Indexer</h1>
    <hr />

    <Button onClick={handle}>getKeys</Button>

    <input type="text" class="rounded bg-zinc-700" bind:value={name} />

    <Button onClick={() => (screen = Math.random().toString())}>set screen random val</Button>

    screen: {screen}

    <Button onClick={createRandomOwner}>create random owner</Button>
</div>
