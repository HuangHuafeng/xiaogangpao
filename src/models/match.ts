import { Player } from './player'
import * as clone from 'clone'

export enum MatchStatus {
  NotStarted,
  OnGoingPairring,
  OnGoingFighting,
  Finished,
}

export class Match {
  private name: string
  private organizer: string
  private players: Player[]
  private totalRounds: number

  /**
   * 0: match has not started
   * =totalRounds: match is in last round
   * >totalRounds: match has finished
   */
  private currentRound: number
  private status: MatchStatus

  constructor(name: string, organizer: string = '') {
    this.name = name
    this.organizer = organizer
    this.players = []
    this.totalRounds = 0
    this.currentRound = 0
    this.status = MatchStatus.NotStarted

    if (__DEV__) {
      this.addPlayer('赵子雨', '湖北棋牌运动管理中心')
      this.addPlayer('崔革', '黑龙江省棋牌管理中心')
      this.addPlayer('鲁天', '江苏棋院')
      this.addPlayer('赵金成', '中国棋院杭州分院')
      this.addPlayer('孙昕昊', '浙江非奥项目管理中心')
      this.addPlayer('李冠男', '辽宁队')
      this.addPlayer('黄学谦', '香港')
      this.addPlayer('孙勇征', '上海金外滩队')
      this.addPlayer('何文哲', '中国棋院杭州分院')
      this.addPlayer('李炳贤', '中国棋院杭州分院')
      this.addPlayer('武俊强', '四川成都龙翔通讯队')
      this.addPlayer('于幼华', '浙江非奥项目管理中心	')
      this.addPlayer('程宇东', '广东碧桂园')
      this.addPlayer('黎德志', '煤矿体协')
    }
  }

  public getStatus() {
    return this.status
  }

  public getTotalRounds() {
    return this.totalRounds
  }

  public getCurrentRound() {
    return this.currentRound
  }

  public getPlayers() {
    return clone(this.players)
  }

  public setTotalRounds(totalRounds: number) {
    if (totalRounds < 1) {
      throw new Error('totalRounds is less than 1!')
    }

    this.totalRounds = totalRounds
  }

  public getName() {
    return this.name
  }

  public setName(name: string) {
    if (name.length === 0) {
      throw new Error('name is empty!')
    }

    this.name = name
  }

  public getOrganizer() {
    return this.organizer
  }

  public setOrganizer(organizer: string) {
    this.organizer = organizer
  }

  /**
   * add a player to the match
   * @param name
   * @param organization
   */
  public addPlayer(name: string, organization: string = '') {
    const newPlayer = new Player(this.generatePlayerNumber(), name, organization)
    this.players.push(newPlayer)
  }

  /**
   * generate a uniqe number for a new player.
   */
  private generatePlayerNumber(): number {
    // step 1: generate an array that contains preferred numbers
    let preferred = []
    for (let index = 0; index <= this.players.length; index++) {
      preferred.push(index + 1)
    }
    // step 2: remove the numbers that are already used by existing players
    for (let index = 0; index < this.players.length; index++) {
      const toBeRemoved = preferred.indexOf(this.players[index].getNumber())
      if (toBeRemoved !== -1) {
        preferred.splice(toBeRemoved, 1)
      }
    }
    // step 3: return the smallest number of remaining preferred numbers
    return preferred[0]
  }

  /**
   * remove the player with number "number"
   * @param number
   */
  public removePlayer(number: number) {
    const index = this.players.findIndex(player => player.getNumber() === number)
    if (index === -1) {
      throw new Error(`UNEXPECTED! failed to find the player with number "${number}"`)
    }
    this.players.splice(index, 1)
  }

  /**
   * remove all players
   */
  public removeAllPlayers() {
    this.players = []
  }

  /**
   * It's probably OK to not use clone, but we use it in order to be more safe.
   * Any change should be make through the public interface, not by accessing
   * the data directly!
   */

  /**
   * update a player.
   * @param number
   * @param player
   */
  public updatePlayer(number: number, player: Player) {
    const index = this.players.findIndex(player => player.getNumber() === number)
    if (index === -1) {
      throw new Error(`UNEXPECTED! failed to find the player with number "${number}"`)
    }
    this.players[index] = clone(player)
  }

  /**
   * return ** a copy ** of the player with number "number"
   * @param number number of the player
   */
  public getPlayerByNumber(number: number): Player | undefined {
    const index = this.players.findIndex(player => player.getNumber() === number)
    if (index === -1) {
      return undefined
    }

    return clone(this.players[index])
  }

  /**
   * return ** a copy ** of the player with name "name"
   * @param name name of the player
   */
  public getPlayerByName(name: string): Player | undefined {
    const index = this.players.findIndex(player => player.getName() === name)
    if (index === -1) {
      return undefined
    }

    return clone(this.players[index])
  }
}
