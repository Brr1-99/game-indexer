import { writable, type Writable } from 'svelte/store'
import type { GameDto, OwnerDto } from '$lib/types'

// owners and games are created in a modal
export const modalContext = writable(false) // is open
export const modalTypeContext: Writable<'create-game' | 'edit-game' | 'create-owner' | 'link-games'> = writable('create-game') // type of modal
export const selectedOwnerContext: Writable<OwnerDto | null> = writable(null) // selected owner
export const selectedGameContext: Writable<GameDto | null> = writable(null) // selected game

// owners and games data
export const gamesContext: Writable<Array<GameDto>> = writable([])
export const ownersContext: Writable<Array<OwnerDto>> = writable([])
