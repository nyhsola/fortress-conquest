import { MapPlayer, Unit } from "w3ts"

import { ABILITY, Config, UNIT } from "util/Config"
import { createFloatingText } from "util/FTextUtil"
import { createUnitAtCenter, createUnitAtPolar, createUnitNear, doForLocalPlayer, forEachUnitOfPlayerAndType, issueOrder, withTimedLife } from "util/Util"

const ALLY_SHIFT = 12

export class Player {
  private readonly config: Config
  private readonly playerId: number
  private readonly allyId: number
  private castle: Unit | undefined
  private mine: Unit | undefined
  private stock: Unit | undefined
  private workerCountLimit = 3
  private workerCount = 0

  constructor(config: Config, playerId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = this.playerId + ALLY_SHIFT
    withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
  }

  public onCastleBuild(castle: Unit) {
    this.castle = castle
    const point = castle.getPoint()
    const direction = GetRandomDirectionDeg()
    this.mine = createUnitAtPolar(point, direction, 1600, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
    this.stock = createUnitAtPolar(point, direction + 80, 800, this.allyId, UNIT.STOCK)
  }

  public onWorkerCast(unit: Unit) {
    const worker = createUnitNear(unit, this.allyId, UNIT.WORKER)
    worker && this.mine && issueOrder(worker, "harvest", this.mine)
    this.workerCount = this.workerCount + 1
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, this.workerTemplate(), 0), this.playerId)
  }

  private workerTemplate(): string {
    return "Worker count: " + this.workerCount + " |n" + "Worker limit: " + this.workerCountLimit
  }

  private transferGoldAndPlaceText() {
    let allyPlayer = MapPlayer.fromIndex(this.allyId)
    let allyGold = allyPlayer?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
    if (allyGold > 0) {
      let player = MapPlayer.fromIndex(this.playerId)
      let playerGold = allyPlayer?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
      allyPlayer?.setState(PLAYER_STATE_RESOURCE_GOLD, 0)
      player?.setState(PLAYER_STATE_RESOURCE_GOLD, playerGold + allyGold)
      this.castle && player && createFloatingText("+" + allyGold, this.castle, player)
    }
  }
}
