export interface GameDto {
    name: string // unique key
    gameDuration: number
    maxPlayers: number
    lastTimePlayed: string
    rating: number
    price: number
    owner: string
}

export interface OwnerDto {
    name: string // unique key
    games: Array<string> // GameDto.name
}
