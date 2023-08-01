export interface GameDto {
    name: string // unique key
    gameDuration: number
    minPlayers: number
    maxPlayers: number
    lastTimePlayed: number
    rating: number
}

export interface OwnerDto {
    name: string // unique key
    games: Array<string> // GameDto.name
}
