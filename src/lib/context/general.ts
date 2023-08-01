import { writable, type Writable } from 'svelte/store'
import type { GameDto, OwnerDto } from '$lib/types'

// owners and games are created in a modal
export const modalContext = writable(false) // is open
export const modalTypeContext: Writable<'owner' | 'game'> = writable('game') // type of modal

// owners and games data
export const gamesContext: Writable<Array<GameDto>> = writable([])
export const ownersContext: Writable<Array<OwnerDto>> = writable([])
