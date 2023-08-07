<script lang="ts">
    import type { OwnerDto } from '$lib/types/index.js'
    import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
    import { DatabaseService } from '$lib/services/database.service.js'
    import { Button, Image, ModalGame } from '$lib/components/index.js'
    import { gamesContext, ownersContext } from '$lib/context/general'

    export let data
    $: owner = $ownersContext.find(o => o.name === data.owner_name) as OwnerDto

    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    // ------------------ Button functions ------------------

    async function gameClicked(new_game: string): Promise<void> {
        // deep clone
        const owner: OwnerDto = JSON.parse(JSON.stringify($ownersContext.find(o => o.name === data.owner_name)))

        // If its present -> remove it
        if (owner.gamesOwned.includes(new_game)) {
            owner.gamesOwned = owner.gamesOwned.filter(game => game !== new_game)
        } else {
            // Add it
            owner.gamesOwned.push(new_game)
        }

        // Update it in Redis
        await databaseService.setOwner(owner)

        // Update the context
        ownersContext.set(await databaseService.getOwners())
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

    async function changePhoto(): Promise<void> {
        let imageUrl = prompt('Do you want to change your profile picture? Place the URL here', owner.imageUrl)

        // cancelled
        if (imageUrl === null) return

        owner.imageUrl = imageUrl
        await databaseService.setOwner(owner)
    }
</script>

<ModalGame />

<div class="mx-auto grid lg:w-[56rem] lg:grid-cols-2">
    <div class="mx-auto sm:w-96 rounded bg-zinc-800 p-4">
        <div class="relative flex gap-2">
            <button on:click={changePhoto} class="h-12 w-12">
                <Image src={String(owner?.imageUrl)} />
            </button>
            <div class="flex flex-col items-start">
                <span class="text-xl">{owner?.name}</span>
                <span title="Games in property"><i class="bi bi-joystick" /> {owner?.gamesOwned.length}</span>
            </div>
        </div>

        <hr class="mt-4 w-4/5" />
        <p class="my-4">Select games in property:</p>
        <div class="grid grid-cols-3 gap-2">
            {#each $gamesContext as game}
                <button
                    on:click={() => gameClicked(game.name)}
                    class="border p-1 {owner?.gamesOwned.includes(game.name) ? 'border-green-400 bg-green-900/10' : 'border-red-400 bg-red-900/10'}"
                >
                    <p class="overflow-hidden">{game.name}</p>
                    <p><i class="bi bi-clock-fill" /> {game.gameDuration} mins</p>
                    <p><i class="bi bi-people-fill" /> {game.minPlayers} - {game.maxPlayers}</p>
                </button>
            {/each}
        </div>
    </div>

    <div class="mx-auto mt-4 sm:w-96 rounded bg-zinc-800 px-2 py-4 lg:mt-0">
        <h2 class="mb-4 text-center text-2xl">Games review:</h2>

        <div class="grid grid-cols-3 text-center">
            <p>Game</p>
            <p>Rating</p>
            <p>Last time played</p>
            <hr class="col-span-3" />

            {#each $gamesContext.sort((a, b) => a.name.localeCompare(b.name)) as game}
                <div class="flex items-center gap-1 p-2">
                    <div class="h-8 w-8">
                        <Image src={game.imageUrl} />
                    </div>
                    <div title={game.name} class="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{game.name}</div>
                </div>

                <div class="flex items-center justify-start">
                    {#each [1, 2, 3, 4, 5] as n}
                        <button on:click={() => setRating(game.name, n)} class="hover:text-yellow-400">
                            <i class="bi {(owner.gamesPlayed[game.name]?.rating ?? 0) >= n ? 'bi-star-fill text-yellow-400' : 'bi-star'} mr-1" />
                        </button>
                    {/each}
                </div>

                <div class="flex items-center justify-end gap-4">
                    {#if (owner.gamesPlayed[game.name]?.lastTimePlayed ?? 0) === 0}
                        <p>Never</p>
                    {:else}
                        <p>{new Date(owner.gamesPlayed[game.name]?.lastTimePlayed).toLocaleDateString()}</p>
                    {/if}

                    <Button onClick={() => setLastTimePlayed(game.name)} title="Set last time played to: today">
                        <i class="bi bi-calendar-check" />
                    </Button>
                </div>
            {/each}

            <Button
                onClick={async () => {
                    await databaseService.setOwner(owner)
                    alert('Saved!')
                }}>SAVE</Button
            >
        </div>
    </div>
</div>
