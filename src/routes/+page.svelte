<script lang="ts">
    import { Image } from '$lib/components'
    import GameCard from '$lib/components/GameCard.svelte'
    import { gamesContext, ownersContext } from '$lib/context/general'
    import type { GameDto, OwnerDto } from '$lib/types'

    $: peopleComing = ['David', 'Alex'] as string[]

    function handleOwnerClick(owner: OwnerDto): void {
        peopleComing = peopleComing.includes(owner.name)
            ? peopleComing.filter(name => name !== owner.name) // remove it
            : [...peopleComing, owner.name] // add it
    }

    // ------------------ Filters ------------------

    const filterByOwnersComing = (game: GameDto, peopleComing: Array<string>) =>
        $ownersContext
            .filter(owner => peopleComing.includes(owner.name)) // only owners coming
            .some(owner => owner.gamesOwned.includes(game.name)) // only games owned by owners coming

    const filterByMinMaxPlayers = (game: GameDto) => game.minPlayers <= peopleComing.length && game.maxPlayers >= peopleComing.length

    $: lists = {
        all: $gamesContext,
        ownersComing: $gamesContext.filter(game => filterByOwnersComing(game, peopleComing)),
        suitableForPlayers: $gamesContext.filter(game => filterByOwnersComing(game, peopleComing)).filter(filterByMinMaxPlayers)
    }
</script>

<h1 class="mb-8 text-center text-2xl font-bold">Select the people who comes to play today</h1>

<div class="container mx-auto mb-24 grid gap-2 lg:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-4 lg:grid-cols-6 xl:grid-cols-8">
    {#each $ownersContext as owner}
        <button
            on:click={() => handleOwnerClick(owner)}
            class="flex items-center gap-2 rounded border bg-zinc-800 p-2 hover:bg-zinc-700 {peopleComing.includes(owner.name) ? 'border-green-500' : ''}"
        >
            <div class="h-12 w-12">
                <Image src={owner.imageUrl} />
            </div>
            <div class="flex flex-col items-start">
                <span class="text-xl">{owner.name}</span>
                <span><i class="bi bi-joystick" /> {owner.gamesOwned.length}</span>
            </div>
        </button>
    {/each}
</div>

{#if peopleComing.length > 1}
    <div class="container mx-auto p-4">
        <h2 class="text-xl"><i class="bi bi-people-fill" /> {peopleComing.length} people</h2>
        <h2 class="text-xl"><i class="bi bi-joystick" /> {lists.ownersComing.length} unique games</h2>
        <h2 class="text-xl">
            <i class="bi bi-joystick" />
            {lists.suitableForPlayers.length} suitable for <i class="bi bi-people-fill" />
            {peopleComing.length} players
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 pt-8">
            {#each lists.ownersComing as game}
                <div class={game.minPlayers <= peopleComing.length && game.maxPlayers >= peopleComing.length ? '' : 'opacity-20'}>
                    <GameCard {game} locked={true} />
                </div>
            {/each}
        </div>
    </div>
{/if}
