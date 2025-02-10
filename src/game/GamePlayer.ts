import { Point, Unit } from "w3ts"

import { BaseFormation } from "../global/BaseFormation"
import { Config, Mode, UNIT, Zones } from "global/Config"
import { createDestructableAtPoint, createUnitAtCenter, createUnitAtPoint, issueBuildOrder, withTimedLife } from "util/CommonUtil"

export class GamePlayer {
  private readonly config: Zones

  public readonly playerId: number
  public readonly allyId: number

  public timedUnit: Unit | undefined

  private castle: Unit | undefined
  private mine: Unit | undefined
  private stock: Unit | undefined
  private barracks: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined

  constructor(config: Config, playerId: number, allyId: number) {
    this.config = config.zones
    this.playerId = playerId
    this.allyId = allyId

    this.timedUnit = withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)

    if (config.mode == Mode.DEBUG && this.playerId == 4) {
      this.timedUnit && issueBuildOrder(this.timedUnit, UNIT.CASTLE, Location(3000, -4000))
    }
  }

  public onCastleBuild(castle: Unit | undefined) {
    this.castle = castle
    this.point = this.castle && this.castle.getPoint()
    this.direction = GetRandomDirectionDeg()
    const minePoint = this.point && BaseFormation.MINE(this.point, this.direction)
    this.mine = minePoint && createUnitAtPoint(minePoint, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)

    const bannerPoint = this.point && BaseFormation.BANNER(this.point, this.direction)
    bannerPoint && createDestructableAtPoint(bannerPoint, 1, UNIT.BANNER_HUMAN)
  }

  public onBarracksBuild(barracks: Unit | undefined) {
    this.barracks = barracks
  }

  public getStock = () => this.stock

  public setStock = (stock: Unit) => (this.stock = stock)

  public getCastle = () => this.castle

  public getMine = () => this.mine

  public getBarracks = () => this.barracks

  public getPoint = () => this.point

  public getDirection = () => this.direction
}
