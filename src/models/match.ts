import { Player } from './player'

export class Match {
  name: string
  organizer?: string
  players: Player[]

  constructor(name: string, organizer?: string) {
    this.name = name
    this.organizer = organizer
    this.players = [
      { number: 1, name: 'Huafeng', organization: 'Xihu' },
      { number: 2, name: 'Fengda', organization: 'Xihu' },
    ]
  }

  public addPlayer(name: string, organization: string = '') {
    this.players.push(new Player(this.generatePlayerNumber(), name, organization))
  }

  private generatePlayerNumber(): number {
    return this.players.length + 1
  }
}
