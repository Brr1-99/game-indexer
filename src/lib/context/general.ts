import type { GameDto } from '$lib/types'
import { writable } from 'svelte/store'

export const modalGameContext = writable({
    isModalOpen: false,
    game: {} as GameDto,
})
