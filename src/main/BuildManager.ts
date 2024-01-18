import { Point, Unit } from "w3ts"

import { UNIT } from "util/Config"
import { createUnitAtPolar } from "util/Util"

export class BuildManager {
  private castle: Unit | undefined
  private mine: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined

  public onCastleBuild(castle: Unit) {
    this.castle = castle
    this.point = castle.getPoint()
    this.direction = GetRandomDirectionDeg()
    this.mine = createUnitAtPolar(this.point, this.direction, 1500, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
  }

  public getPoint = () => this.point

  public getDirection = () => this.direction

  public getCastle = () => this.castle

  public getMine = () => this.mine
}
