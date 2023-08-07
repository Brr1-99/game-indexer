import { writeFile } from 'node:fs/promises'
const base_url = 'https://renewed-lioness-36757.upstash.io'
const token = undefined
const headers = {
    headers: {
        Authorization: `Bearer ${token}}`,
    },
}

if (!token) throw new Error('No token provided')

async function httpGet(url, parse = false) {
    console.log(`---- Fetching ${url}`)
    const res = await fetch(url, headers)
    const data = await res.json()
    return parse ? JSON.parse(data.result) : data.result
}

async function getKeys() {
    return httpGet(`${base_url}/keys/game-indexer-web:*`)
}

;(async () => {
    const keys = await getKeys()
    console.log(keys)

    const result = await Promise.all(
        keys.map(async key => {
            const data = await httpGet(`${base_url}/get/${key}`)
            return [key, data]
        }),
    )

    const date = new Date().toLocaleDateString().replaceAll('/', '-')

    await writeFile(`scripts/game-indexer-${date}.json`, JSON.stringify(result))
})()
