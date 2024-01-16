import { MapPlayer, Point, Unit } from "w3ts"

import { EventSystem, EventType } from "system/EventSystem"
import { ABILITY, Config, UNIT } from "util/Config"
import { createFloatingText } from "util/FTextUtil"
import { Task } from "util/Task"
import { createTask, createUnitAtCenter, createUnitAtPolar, createUnitNear, forEachPlayer, forEachUnitOfPlayerAndType, issueOrder, withTimedLife } from "util/Util"

export class Player {
  private playerId: number
  private allyId: number
  private config: Config
  private castle: Unit | undefined
  private mine: Unit | undefined
  private stock: Unit | undefined
  private taskPer10Seconds: Task
  private taskPer5Seconds: Task
  private workerCountLimit = 3
  private workerCount = 0

  constructor(config: Config, eventSystem: EventSystem, playerId: number, allyId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = allyId
    this.taskPer10Seconds = createTask(() => this.tickPer10Seconds(), 10)
    this.taskPer5Seconds = createTask(() => this.tickPer5Seconds(), 5)
    withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
    eventSystem.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.onCastleBuild(building))
    eventSystem.subscribe(EventType.PER_SECOND, () => {
      this.taskPer10Seconds.update(1)
      this.taskPer5Seconds.update(1)
    })
  }

  private tickPer10Seconds() {
    this.abilityWorker()
    this.goldIncome()
  }

  private tickPer5Seconds() {
    forEachPlayer((player: MapPlayer) => {
      let template = "Worker count: " + this.workerCount + " |n" + "Worker limit: " + this.workerCountLimit
      if (player.id == this.playerId && GetLocalPlayer() == player.handle) {
        BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, template, 0)
      }
    })
  }

  private abilityWorker() {
    forEachUnitOfPlayerAndType(this.playerId, UNIT.CASTLE, (unit: Unit) => {
      if (this.castle != undefined && unit.getAbilityLevel(ABILITY.WORKERS) == 1 && this.workerCount < this.workerCountLimit) {
        let worker = createUnitNear(unit, this.allyId, UNIT.WORKER)
        worker && this.mine && issueOrder(worker, "harvest", this.mine)
        this.workerCount = this.workerCount + 1
      }
    })
  }

  private goldIncome() {
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

  private onCastleBuild(unit: Unit) {
    if (unit?.getOwner()?.id == this.playerId) {
      let point = unit.getPoint()
      let deg = GetRandomDirectionDeg()

      this.taskPer10Seconds.reset()
      this.castle = unit

      this.mine = createUnitAtPolar(point, deg, 1600, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
      this.stock = createUnitAtPolar(point, deg + 90, 800, this.allyId, UNIT.STOCK)
    }
  }
}
