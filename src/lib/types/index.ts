export type GameDto = {
    name: string // unique key
    imageUrl: string
    gameDuration: number
    minPlayers: number
    maxPlayers: number
}

export type OwnerDto = {
    name: string // unique key
    imageUrl: string
    gamesOwned: Array<string> // ref: GameDto.name owned
    gamesPlayed: Record<
        string, // ref: GameDto.name played
        {
            lastTimePlayed: number
            rating: number
        }
    >
}
