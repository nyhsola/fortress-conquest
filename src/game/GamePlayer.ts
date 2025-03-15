import { Point, sleep, Unit } from "w3ts"

import { Positions } from "../global/Positions"
import { ABILITY, Config, Mode, UNIT, Zones } from "global/Config"
import { Task } from "global/Task"
import {
  createDestructableAtPoint,
  createTask,
  createUnitAtCenter,
  createUnitAtPoint,
  issueBuildOrder,
  issueOrder,
  issuePointOrder,
  withTimedLife,
} from "util/CommonUtil"

export class GamePlayer {
  private readonly config: Config

  public readonly playerId: number
  public readonly allyId: number

  public timedUnit: Unit | undefined

  private castle: Unit | undefined
  private mine: Unit | undefined
  private barracks: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined

  public currentEnemies: Array<GamePlayer> = []

  constructor(config: Config, playerId: number, allyId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = allyId

    this.timedUnit = withTimedLife(createUnitAtCenter(this.config.zones.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)

    if (config.mode == Mode.DEBUG && this.playerId == 4) {
      sleep(1)
        .then(() => this.timedUnit && IssuePointOrderLoc(this.timedUnit.handle, "blink", Location(3000, -4000)))
        .then(() => sleep(1))
        .then(() => this.timedUnit && issueBuildOrder(this.timedUnit, UNIT.CASTLE, Location(3000, -4000)))
    }
  }

  public onCastleBuild(castle: Unit | undefined) {
    this.castle = castle
    this.point = this.castle && this.castle.getPoint()
    this.direction = GetRandomDirectionDeg()
    const minePoint = this.point && Positions.MINE(this.point, this.direction)
    this.mine = minePoint && createUnitAtPoint(minePoint, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)

    const campfirePoint = this.point && Positions.CAMPFIRE(this.point, this.direction)
    campfirePoint && createDestructableAtPoint(campfirePoint, 1, UNIT.CAMPFIRE)
  }

  public onBarracksBuild(barracks: Unit | undefined) {
    this.barracks = barracks
  }

  public onEnemiesFound(enemies: Array<GamePlayer>) {
    this.currentEnemies = enemies

    for (let i = 0; i < this.currentEnemies.length; i++) {
      createDestructableAtPoint(Positions.ATTACK_POINT(this.castle!!, this.currentEnemies[i]?.getCastle()!!), 1.4, UNIT.BANNER_HUMAN)
    }
  }

  public getEnemyCastle = (enemy: number) => this.currentEnemies[enemy].getCastle()

  public getCastle = () => this.castle

  public getMine = () => this.mine

  public getBarracks = () => this.barracks

  public getPoint = () => this.point

  public getDirection = () => this.direction
}
