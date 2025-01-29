import { Point, Unit } from "w3ts"

import { BaseFormation } from "./BaseFormation"
import { Config, Mode, UNIT, Zones } from "util/Config"
import { createUnitAtCenter, createUnitAtPoint, issueBuildOrder, withTimedLife } from "util/Util"

export class GamePlayer {
  private readonly config: Zones

  public readonly playerId: number
  public readonly allyId: number

  private castle: Unit | undefined
  private mine: Unit | undefined
  private stock: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined
  private warPoint: Point | undefined

  constructor(config: Config, playerId: number, allyId: number) {
    this.config = config.zones
    this.playerId = playerId
    this.allyId = allyId

    const unit = withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)

    if (config.mode == Mode.DEBUG && this.playerId == 4) {
      unit && issueBuildOrder(unit, UNIT.CASTLE, Location(4000, -5000))
    }
  }

  public onCastleBuild(castle: Unit | undefined) {
    this.castle = castle
    this.point = this.castle && this.castle.getPoint()
    this.direction = GetRandomDirectionDeg()
    const minePoint = this.point && BaseFormation.MINE(this.point, this.direction)
    this.mine = minePoint && createUnitAtPoint(minePoint, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
  }

  public onWarInit(point: Point) {
    this.warPoint = point
  }

  public getStock = () => this.stock

  public setStock = (stock: Unit) => (this.stock = stock)

  public getCastle = () => this.castle

  public getMine = () => this.mine

  public getPoint = () => this.point

  public getDirection = () => this.direction

  public getWarPoint = () => this.warPoint
}
