<script lang="ts">
    import { Image } from '$lib/components'
    import GameCard from '$lib/components/GameCard.svelte'
    import { gamesContext, ownersContext } from '$lib/context/general'
    import type { GameDto, OwnerDto } from '$lib/types'

    // ------------------ Data ------------------
    // which owners are selected
    $: peopleComing = [] as string[]

    // the games but with 2 props added: stars and lastTimePlayed (avg)
    $: games = $gamesContext.map(game => ({
        ...game,
        stars: getGameStars(game.name, peopleComing),
        lastTimePlayed: getLastTimePlayed(game.name, peopleComing),
    }))

    // ------------------ Methods ------------------
    function handleOwnerClick(owner: OwnerDto): void {
        peopleComing = peopleComing.includes(owner.name)
            ? peopleComing.filter(name => name !== owner.name) // remove it
            : [...peopleComing, owner.name] // add it
    }

    function getGameStars(gameName: string, peopleComing: string[]): number {
        const [stars, votes] = $ownersContext
            .filter(owner => peopleComing.includes(owner.name)) // only people coming
            .filter(owner => owner.gamesPlayed[gameName]) // only people who played this game
            .reduce(([accStars, accVotes], owner) => [accStars + owner.gamesPlayed[gameName].rating, accVotes + 1], [0, 0]) // Σ stars and votes
        return Number((stars / votes || 1).toFixed(1))
    }

    function getLastTimePlayed(gameName: string, peopleComing: string[]): number {
        const [miliseconds, votes] = $ownersContext
            .filter(owner => peopleComing.includes(owner.name)) // only people coming
            .filter(owner => owner.gamesPlayed[gameName]) // only people who played this game
            .reduce(([accStars, accVotes], owner) => [accStars + owner.gamesPlayed[gameName].lastTimePlayed, accVotes + 1], [0, 0]) // Σ lastTimePlayeds and votes
        return Math.round(miliseconds / votes || 0)
    }

    /**
     * Days passed since a specific date
     * @param date in miliseconds
     */
    const getDaysPassedSince = (date: number): number => Math.round((Date.now() - date) / (1000 * 60 * 60 * 24))

    // ------------------ Sorts ------------------
    function sortGames(a: (typeof games)[0], b: (typeof games)[0]) {
        const a_rating = a.stars + 0.03 * getDaysPassedSince(a.lastTimePlayed) // stars + 1 extra star per month
        const b_rating = b.stars + 0.03 * getDaysPassedSince(b.lastTimePlayed) // stars + 1 extra star per month
        return b_rating - a_rating
    }

    // ------------------ Filters ------------------
    const filterByOwnersComing = (game: GameDto, peopleComing: Array<string>) =>
        $ownersContext
            .filter(owner => peopleComing.includes(owner.name)) // only people coming
            .some(owner => owner.gamesOwned.includes(game.name)) // only games owned by people coming

    const filterByMinMaxPlayers = (game: GameDto) => game.minPlayers <= peopleComing.length && game.maxPlayers >= peopleComing.length

    // ------------------ Lists with filters applied ------------------
    $: lists = {
        fromOwnersComing: games.filter(game => filterByOwnersComing(game, peopleComing)),
        suitableForPlayers: games.filter(game => filterByOwnersComing(game, peopleComing)).filter(filterByMinMaxPlayers),
    }
</script>

<h1 class="mb-8 text-center text-2xl font-bold">Select the people who comes to play today</h1>

<div class="md:grid-4 container mx-auto mb-24 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 xl:grid-cols-8">
    {#each $ownersContext as owner}
        <button
            on:click={() => handleOwnerClick(owner)}
            class="flex items-center gap-2 rounded border-2 bg-zinc-800 p-2 hover:bg-zinc-700 {peopleComing.includes(owner.name)
                ? 'border-green-500'
                : 'border-zinc-800'}"
        >
            <div class="h-20 w-20">
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
        <h2 class="text-xl"><i class="bi bi-joystick" /> {lists.fromOwnersComing.length} unique games</h2>
        <h2 class="text-xl">
            <i class="bi bi-joystick" />
            {lists.suitableForPlayers.length} suitable for <i class="bi bi-people-fill" />
            {peopleComing.length} players
        </h2>

        <div class="grid grid-cols-2 gap-4 pt-8 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {#each lists.fromOwnersComing.sort(sortGames) as game}
                <div class={game.minPlayers <= peopleComing.length && game.maxPlayers >= peopleComing.length ? '' : 'opacity-20'}>
                    <GameCard {game} locked={true} />
                    <p title="Average rating">{game.stars} <i class="bi bi-star-fill text-yellow-400" /></p>
                    <p title="Average days since last time played"><i class="bi bi-calendar4" /> {getDaysPassedSince(game.lastTimePlayed)}</p>
                    <!-- Development: show average last time Played -->
                    <!-- <p title="Rating">{game.stars + 0.03 * getDaysPassedSince(game.lastTimePlayed)}</p> -->
                </div>
            {/each}
        </div>
    </div>
{/if}
