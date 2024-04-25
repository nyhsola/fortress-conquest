import { Point, Unit } from "w3ts"

import { BaseFormation } from "./BaseFormation"
import { Config, UNIT } from "util/Config"
import { createUnitAtCenter, createUnitAtPoint, withTimedLife } from "util/Util"

export class Player {
  private readonly config: Config

  public readonly playerId: number
  public readonly allyId: number

  private castle: Unit | undefined
  private mine: Unit | undefined
  private stock: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined
  private warPoint: Point | undefined

  constructor(config: Config, playerId: number, allyId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = allyId

    withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
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
