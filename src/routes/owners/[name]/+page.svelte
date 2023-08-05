<script lang="ts">
    import type { OwnerDto } from '$lib/types/index.js'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { DatabaseService } from '$lib/services/DatabaseService.js'
    import { Button, Image, ModalGame } from '$lib/components/index.js'
    import { gamesContext, modalContext, modalTypeContext, ownersContext, selectedOwnerContext } from '$lib/context/general'

    export let data
    $: owner = $ownersContext.find(o => o.name === data.owner_name) as OwnerDto

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    // ------------------ Button functions ------------------

    function linkGames() {
        modalTypeContext.set('link-games')
        modalContext.set(!$modalContext)
        selectedOwnerContext.set(owner)
    }

    function setRating(gameName: string, rating: number): void {
        if (owner.gamesPlayed[gameName]) {
            // Update the rating
            owner.gamesPlayed[gameName].rating = rating
        } else {
            owner.gamesPlayed[gameName] = {
                rating: rating,
                lastTimePlayed: 0,
            }
        }
    }

    function setLastTimePlayed(gameName: string): void {
        if (!owner.gamesPlayed[gameName]) {
            owner.gamesPlayed[gameName] = {
                rating: 0,
                lastTimePlayed: Date.now(),
            }
        } else {
            owner.gamesPlayed[gameName].lastTimePlayed = Date.now()
        }
    }
</script>

<ModalGame />

<div class="mx-auto w-96 rounded bg-zinc-800 p-2">
    <div class="relative flex gap-2">
        <div class="h-12 w-12">
            <Image src={String(owner?.imageUrl)} />
        </div>
        <div class="flex flex-col items-start">
            <span class="text-xl">{owner?.name}</span>
            <span><i class="bi bi-joystick" /> {owner?.gamesOwned.length}</span>
        </div>
        <div class="absolute bottom-2 right-1">
            <Button onClick={linkGames} title="Edit owner">
                <i class="bi bi-pencil-square" />
            </Button>
        </div>
    </div>
</div>

<div class="mx-auto mt-20 mb-20 grid w-[600px] grid-cols-3 gap-4 bg-zinc-800 p-4">
    <p>Game</p>
    <p>Rating</p>
    <p>Last time played</p>
    <hr />
    <hr />
    <hr />

    {#each $gamesContext.sort((a, b) => a.name.localeCompare(b.name)) as game}
        <div class="flex items-center gap-2 p-2">
            <div class="h-16 w-16">
                <Image src={game.imageUrl} />
            </div>
            <div class="text-lg">{game.name}</div>
        </div>

        <div class="flex items-center justify-start">
            {#each [1, 2, 3, 4, 5] as n}
                <button on:click={() => setRating(game.name, n)} class="hover:text-yellow-400">
                    <i class="bi {(owner.gamesPlayed[game.name]?.rating ?? 0) >= n ? 'bi-star-fill text-yellow-400' : 'bi-star'} mr-1 text-xl" />
                </button>
            {/each}
        </div>

        <div class="flex items-center justify-start gap-4">
            <Button onClick={() => setLastTimePlayed(game.name)} title="Set last time played to: today">
                <i class="bi bi-calendar-check" />
            </Button>

            {#if (owner.gamesPlayed[game.name]?.lastTimePlayed ?? 0) === 0}
                <p>Never</p>
            {:else}
                <p>{new Date(owner.gamesPlayed[game.name]?.lastTimePlayed).toLocaleDateString()}</p>
            {/if}
        </div>
    {/each}

    <Button
        onClick={async () => {
            await databaseService.setOwner(owner)
            alert('Saved!')
        }}>SAVE</Button
    >
</div>
