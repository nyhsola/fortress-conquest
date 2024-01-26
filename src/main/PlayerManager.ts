import { MapPlayer, Unit } from "w3ts"

import { BuildManager } from "./BuildManager"
import { WorkerManager } from "./WorkerManager"
import { ABILITY, Config, UNIT } from "util/Config"
import { createFloatingText } from "util/FTextUtil"
import { ALLY_SHIFT } from "util/Globals"
import { Task } from "util/Task"
import { createTask, createUnitAtCenter, doForLocalPlayer, withTimedLife } from "util/Util"

export class PlayerManager {
  private readonly config: Config
  private readonly playerId: number
  private readonly allyId: number

  private income: Task = createTask(() => this.onIncome(this.buildManager.getCastle()), 10)

  private buildManager: BuildManager
  private workerManager: WorkerManager

  constructor(config: Config, playerId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = this.playerId + ALLY_SHIFT

    this.buildManager = new BuildManager()
    this.workerManager = new WorkerManager(this.playerId, this.allyId)

    withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
  }

  public onBuild(building: Unit) {
    if (building.typeId == UNIT.CASTLE) {
      this.buildManager.onCastleBuild(building)
      this.workerManager.onCastleBuild(this.buildManager)
    }

    this.workerManager.onBuild(building)
  }

  public update(delta: number) {
    this.income.update(delta)
    this.workerManager.update(delta)
  }

  private onIncome(castle: Unit | undefined) {
    let allyPlayer = MapPlayer.fromIndex(this.allyId)
    let allyGold = allyPlayer?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
    if (allyGold > 0) {
      let player = MapPlayer.fromIndex(this.playerId)
      let playerGold = allyPlayer?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
      allyPlayer?.setState(PLAYER_STATE_RESOURCE_GOLD, 0)
      player?.setState(PLAYER_STATE_RESOURCE_GOLD, playerGold + allyGold)
      castle && player && createFloatingText("+" + allyGold, castle, player)
    }
  }
}
