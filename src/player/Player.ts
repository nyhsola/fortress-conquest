import { MapPlayer, Point, Unit } from "w3ts"

import { EventSystem, EventType } from "system/EventSystem"
import { ABILITY, Config, UNIT } from "util/Config"
import { createFloatingText } from "util/FTextUtil"
import { Task } from "util/Task"
import { createTask, createUnitAtCenter, createUnitAtPolar, createUnitNear, forEachPlayer, forEachUnitOfPlayerAndType, issueOrder, withTimedLife } from "util/Util"

const ALLY_SHIFT = 12

export class Player {
  private readonly config: Config
  private readonly playerId: number
  private readonly allyId: number
  private castle: Unit | undefined
  private mine: Unit | undefined
  private stock: Unit | undefined
  private taskPer10Seconds: Task = createTask(() => this.checkAbilities(), 10)
  private taskPer5Seconds: Task = createTask(() => this.updateStats(), 5)
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
    this.taskPer10Seconds.reset()
    this.mine = createUnitAtPolar(point, direction, 1600, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
    this.stock = createUnitAtPolar(point, direction + 80, 800, this.allyId, UNIT.STOCK)
  }

  public tick(delta: number) {
    this.taskPer10Seconds.update(delta)
    this.taskPer5Seconds.update(delta)
  }

  private checkAbilities() {
    this.checkAbilityWorkerAndSpawn()
    this.transferGoldAndPlaceText()
  }

  private checkAbilityWorkerAndSpawn() {
    forEachUnitOfPlayerAndType(this.playerId, UNIT.CASTLE, (unit: Unit) => {
      if (this.castle != undefined && unit.getAbilityLevel(ABILITY.WORKERS) == 1 && this.workerCount < this.workerCountLimit) {
        let worker = createUnitNear(unit, this.allyId, UNIT.WORKER)
        worker && this.mine && issueOrder(worker, "harvest", this.mine)
        this.workerCount = this.workerCount + 1
      }
    })
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

  private updateStats() {
    forEachPlayer((player: MapPlayer) => {
      let template = "Worker count: " + this.workerCount + " |n" + "Worker limit: " + this.workerCountLimit
      if (player.id == this.playerId && GetLocalPlayer() == player.handle) {
        BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, template, 0)
      }
    })
  }
}
