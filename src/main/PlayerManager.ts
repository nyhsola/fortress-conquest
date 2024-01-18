import { MapPlayer, Unit } from "w3ts"

import { BuildManager } from "./BuildManager"
import { WorkerManager } from "./WorkerManager"
import { ABILITY, Config, UNIT } from "util/Config"
import { createFloatingText } from "util/FTextUtil"
import { Task } from "util/Task"
import { createTask, createUnitAtCenter, doForLocalPlayer, withTimedLife } from "util/Util"

const ALLY_SHIFT = 12
const workerTemplate = (workerCount: number, workerLimit: number): string => "Worker count: " + workerCount + "|n" + "Worker limit: " + workerLimit + "|n" + "Every 5 sec"

export class PlayerManager {
  private readonly config: Config
  private readonly playerId: number
  private readonly allyId: number

  private income: Task = createTask(() => this.onIncome(this.buildManager.getCastle()), 10)
  private workerAbility: Task = createTask(() => this.onWorkerCast(this.buildManager.getCastle()), 5)

  private buildManager: BuildManager
  private workerManager: WorkerManager

  constructor(config: Config, playerId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = this.playerId + ALLY_SHIFT

    this.buildManager = new BuildManager()
    this.workerManager = new WorkerManager(this.allyId)

    withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
  }

  public onCastleBuild(castle: Unit) {
    this.workerAbility.reset()
    this.buildManager.onCastleBuild(castle)
    this.workerManager.setMine(this.buildManager.getMine())
    this.workerManager.setPointAndDirection(this.buildManager.getPoint(), this.buildManager.getDirection())
  }

  public tick(delta: number) {
    this.income.update(delta)
    this.workerAbility.update(delta)
  }

  private onWorkerCast(castle: Unit | undefined) {
    if (!castle || castle.getAbilityLevel(ABILITY.WORKERS) != 1) return
    this.workerManager.spawnWorker()
    this.updateWorkerAbility()
  }

  private updateWorkerAbility() {
    const text = workerTemplate(this.workerManager?.getWorkerCount() ?? 0, this.workerManager?.getWorkerLimit() ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, text, 0), this.playerId)
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
