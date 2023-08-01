import type { GameDto, OwnerDto } from '$lib/types'

export class DatabaseService {
    private readonly prefix = 'game-indexer-web:'
    private readonly url = 'https://renewed-lioness-36757.upstash.io'
    private readonly headers: { headers: { Authorization: string } }

    constructor(token: string) {
        this.headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    }

    /**
     * Util function to fetch data from Redis
     *  - Handles errors
     *  - Logs requests
     *  - Encapsulates the response in a { result: T }
     * @param url URL to fetch from
     * @param parse Whether to parse the response as JSON
     * @returns Data from the Riot API
     */
    private async httpGet<T>(url: string, parse = false): Promise<T> {
        try {
            console.log(`Fetching ${url}`)
            const res = await fetch(url, this.headers)
            const data = await res.json()
            return parse ? JSON.parse(data.result) : data.result
        } catch (error) {
            console.error(`Fetching ${url}`, error)
            throw error
        }
    }

    // ------------------ Methods ------------------

    async getKeys(): Promise<string[]> {
        return this.httpGet<string[]>(`${this.url}/keys/*`)
    }

    // ------------------ Owners ------------------

    async getOwners(): Promise<OwnerDto[]> {
        const keys = await this.getKeys()
        return Promise.all(
            keys
                .filter(key => key.startsWith(`${this.prefix}owners:`))
                .map(async key => this.httpGet<OwnerDto>(`${this.url}/get/${key}`, true))
            )
    }

    async setOwner(owner: OwnerDto) {
        console.log(`Creating owner ${owner.name}`)
        const key = `${this.prefix}owners:${owner.name}`
        const res = await fetch(`${this.url}/set/${key}`, {
            ...this.headers,
            method: 'POST',
            body: JSON.stringify(owner),
        })

        return res.json()
    }

    // ------------------ Games ------------------

    async getGames(): Promise<GameDto[]> {
        const keys = await this.getKeys()
        return Promise.all(
            keys
                .filter(key => key.startsWith(`${this.prefix}games:`))
                .map(async key => this.httpGet<GameDto>(`${this.url}/get/${key}`, true))
            )
    }

    async setGame(game: GameDto) {
        console.log(`Creating game ${game.name}`)
        const key = `${this.prefix}games:${game.name}`
        const res = await fetch(`${this.url}/set/${key}`, {
            ...this.headers,
            method: 'POST',
            body: JSON.stringify(game),
        })

        return res.json()
    }
}
