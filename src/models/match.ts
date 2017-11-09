import { Player } from './player'
import * as assert from 'assert'
import * as clone from 'clone'

export class Match {
  name: string
  organizer?: string
  players: Player[]

  constructor(name: string, organizer?: string) {
    this.name = name
    this.organizer = organizer
    this.players = []

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
      this.addPlayer('武俊强', '	四川成都龙翔通讯队')
      this.addPlayer('于幼华', '浙江非奥项目管理中心	')
      this.addPlayer('程宇东', '广东碧桂园')
      this.addPlayer('黎德志', '煤矿体协')
    }
  }

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
      const toBeRemoved = preferred.indexOf(this.players[index].number)
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
    const index = this.players.findIndex(player => player.number === number)
    assert.ok(index !== -1, `IMPOSSIBLE! failed to find the player with number "${number}"`)
    this.players.splice(index, 1)
  }

  /**
   * update a player.
   * @param number
   * @param player
   */
  public updatePlayer(number: number, player: Player) {
    const index = this.players.findIndex(player => player.number === number)
    assert.ok(index !== -1, `IMPOSSIBLE! failed to find the player with number "${number}"`)
    this.players[index] = clone(player)
  }

  /**
   * return ** a copy ** of the player with number "number"
   * @param number number of the player
   */
  public getPlayerByNumber(number: number): Player | undefined {
    const index = this.players.findIndex(player => player.number === number)
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
    const index = this.players.findIndex(player => player.name === name)
    if (index === -1) {
      return undefined
    }

    return clone(this.players[index])
  }
}
