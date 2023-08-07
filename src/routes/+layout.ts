import { PUBLIC_REDIS_TOKEN } from '$env/static/public'
import { DatabaseService } from '$lib/services/database.service'

/** @type {import('./$types').PageLoad} */
export async function load() {
    // Fetch existing owners and games
    const databaseService = new DatabaseService(PUBLIC_REDIS_TOKEN)

    return {
        owners: await databaseService.getOwners(),
        games: await databaseService.getGames(),
    }
}
