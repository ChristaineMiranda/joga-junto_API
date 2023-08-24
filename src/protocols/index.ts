export type GameRequest =  {
    firstTeam: string,
    secondTeam: string,
    date:string,
    time: string,
    step: string,
    round: string,
    trip: string
}
export type GameInput =  {
    firstTeam: string,
    secondTeam: string,
    dateTime: Date,
    step: string,
    round: string,
    trip: string
}

export type GameUpdate = {
    firstTeam?:string, 
    secondTeam?:string, 
    date?:string, 
    time?: string,
    step? : string,
    round?:string, 
    trip?:string, 
    goalsFirst?:number,
    goalsSecond?:number, 
    winner?:string
}
