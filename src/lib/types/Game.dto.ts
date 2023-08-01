export interface GameDto {
    name: string
    gameDuration: number
    maxPlayers: number
    lastTimePlayed: string
    rating: number
    price: number
    owner: string
}

export interface OwnerDto {
    name: string
    games: Array<GameDto>
}