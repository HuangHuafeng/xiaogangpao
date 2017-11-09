import { Player } from './player'
import { assertNever } from '../desktop'

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
    this.players.push(new Player(this.generatePlayerNumber(), name, organization))
  }

  private generatePlayerNumber(): number {
    let number = 1
    if (this.players.length > 0) {
      number = this.players[this.players.length - 1].number + 1
    }

    return number
  }

  /**
   *
   * @param number
   */
  public removePlayer(number: number) {
    const index = this.players.findIndex(player => player.number === number)
    if (index === -1) {
      assertNever(index as never, `IMPOSSIBLE! failed to find the player: "${number}"`)
    }
    this.players.splice(index, 1)
  }

  public updatePlayer(number: number, player: Player) {
    const index = this.players.findIndex(player => player.number === number)
    if (index === -1) {
      assertNever(index as never, `IMPOSSIBLE! failed to find the player with number "${number}"`)
    }
    this.players[index] = player
  }

  /**
   * return ** a copy ** of the player with number "number"
   * TODO: check npm module for deep copy
   * @param number
   */
  public getPlayer(number: number): Player {
    let player = this.players[this.players.findIndex(player => player.number === number)]
    return JSON.parse(JSON.stringify(player))
  }
}
