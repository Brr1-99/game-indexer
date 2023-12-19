<script lang="ts">
    import type { OwnerDto } from '$lib/types'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { DatabaseService } from '$lib/services/database.service'
    import { modalContext, ownersContext, playedTodayContext } from '$lib/context/general'
    import { Button } from '..'

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    // Complete list of owners
    let owners = [] as OwnerDto[]
    ownersContext.subscribe(data => {
        owners = data
    })

    // List of owners who played today, and which game
    let gameSelected = null as string | null
    let peopleWhoPlayed = [] as string[]
    playedTodayContext.subscribe(data => {
        gameSelected = data.gameName
        peopleWhoPlayed = data.peopleWhoPlayed
    })

    // Confirm the game has been played today for each person
    async function confirm() {
        if (!gameSelected || !peopleWhoPlayed.length) return

        for (const person of peopleWhoPlayed) {
            await databaseService.setGamePlayedToday(gameSelected, person)
        }

        // update gamesContext
        playedTodayContext.set({
            gameName: null,
            peopleWhoPlayed: [],
        })

        // close modal
        modalContext.set(false)
    }
</script>

<div class="flex flex-col gap-2">
    <h2 class="mr-16 text-2xl font-bold">Game played today!</h2>
    <hr class="my-4 w-4/5" />

    <h3 class="text-xl text-center">{gameSelected}</h3>

    <h3 class="mt-2">Has been played by:</h3>
    <ul class="grid grid-cols-2 mt-2 mb-4">
        {#each peopleWhoPlayed as person}
            <p>- {person}</p>
        {/each}
    </ul>

    <Button onClick={confirm}>Confirm</Button>
</div>
