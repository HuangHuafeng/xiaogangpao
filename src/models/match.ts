import { Player } from './player'

export class Match {
  name: string
  organizer?: string
  players: Player[]

  constructor(name: string, organizer?: string) {
    this.name = name
    this.organizer = organizer
    this.players = []
  }
}
