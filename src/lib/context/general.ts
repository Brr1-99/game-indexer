import { writable, type Writable } from 'svelte/store'
import type { GameDto, OwnerDto } from '$lib/types'

// different modals are used in the app
export const modalContext = writable(false) // is open
export const modalTypeContext: Writable<'create-game' | 'edit-game' | 'create-owner' | 'played-today'> = writable('create-game') // type of modal

// selected owner and game
export const selectedOwnerContext: Writable<OwnerDto | null> = writable(null) // selected owner
export const selectedGameContext: Writable<GameDto | null> = writable(null) // selected game

// owners and games data
export const gamesContext: Writable<Array<GameDto>> = writable([])
export const ownersContext: Writable<Array<OwnerDto>> = writable([])

// Specific context needed to pass data from /routes/+page.svelte -> to Modal.svelte/played-today form
export const playedTodayContext = writable({
    gameName: null as null | string,
    peopleWhoPlayed: [] as Array<string>,
})
