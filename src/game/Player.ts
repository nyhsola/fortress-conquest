import { Point, Unit } from "w3ts"

import { Config, UNIT } from "util/Config"
import { createUnitAtCenter, createUnitAtPolar, withTimedLife } from "util/Util"

export class Player {
  private readonly config: Config
  private readonly startWorker: Unit | undefined

  public readonly playerId: number
  public readonly allyId: number

  private castle: Unit | undefined
  private mine: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined

  constructor(config: Config, playerId: number, allyId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = allyId

    this.startWorker = withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
  }

  public init(castle: Unit | undefined) {
    this.castle = castle
    this.point = this.castle && this.castle.getPoint()
    this.direction = GetRandomDirectionDeg()
    this.mine = createUnitAtPolar(this.point, this.direction, 1500, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
  }

  public getCastle = () => this.castle

  public getMine = () => this.mine

  public getPoint = () => this.point

  public getDirection = () => this.direction
}
