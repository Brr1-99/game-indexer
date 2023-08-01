import type { GameDto, OwnerDto } from '$lib/types'

export class DatabaseService {
    private readonly prefix = 'game-indexer-web:'
    private readonly url = 'https://renewed-lioness-36757.upstash.io'
    private readonly headers: { headers: { Authorization: string } }

    constructor(token: string) {
        this.headers = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    async getKeys(): Promise<string[]> {
        console.log(this.url,this.headers)
        const res = await fetch(`${this.url}/get/foo`, this.headers)
        return await res.json()
    }

    async setOwner(owner: OwnerDto) {
        console.log(`Creating owner ${owner.name}`)
        const key = `${this.prefix}owners:${owner.name}`
        const res = await fetch(`${this.url}/set/${key}`, {
            ...this.headers,
            method: 'POST',
            body: JSON.stringify(owner)
        })

        return await res.json()
    }
}
