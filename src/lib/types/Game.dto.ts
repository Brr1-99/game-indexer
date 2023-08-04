export interface GameDto {
    name: string // unique key
    imageUrl: string
    gameDuration: number
    minPlayers: number
    maxPlayers: number
}

export interface OwnerDto {
    name: string // unique key
    imageUrl: string
    // gamesPlayed: {
    //     uno: {
    //         lastTimePlayed: number
    //         rating: number
    //     } 
    // }
    // gamesOwned: Array<string> // GameDto.name
    games: Array<string> // GameDto.name
}
