import { MapPlayer, Unit } from "w3ts"

import { WorkerGroup } from "./WorkerGroup"
import { ABILITY, Config, UNIT } from "util/Config"
import { createFloatingText } from "util/FTextUtil"
import { Task } from "util/Task"
import { createTask, createUnitAtCenter, createUnitAtPolar, createUnitNear, doForLocalPlayer, forEachUnitOfPlayerAndType, issueOrder, withTimedLife } from "util/Util"

const ALLY_SHIFT = 12

export class Player {
  private readonly config: Config
  private readonly playerId: number
  private readonly allyId: number
  private workerGroup: WorkerGroup | undefined
  private castle: Unit | undefined

  private task: Task = createTask(() => this.castAbilities(), 5)

  constructor(config: Config, playerId: number) {
    this.config = config
    this.playerId = playerId
    this.allyId = this.playerId + ALLY_SHIFT
    withTimedLife(createUnitAtCenter(this.config.zone[this.playerId], this.playerId, UNIT.START_WORKER), 60)
  }

  public onCastleBuild(castle: Unit) {
    this.task.reset()
    this.castle = castle
    this.workerGroup = new WorkerGroup(this.castle, this.allyId)
  }

  public tick(delta: number) {
    this.task.update(delta)
  }

  private castAbilities() {
    forEachUnitOfPlayerAndType(this.playerId, UNIT.CASTLE, (unit: Unit) => this.onWorkerCast(unit))
    this.onIncome()
  }

  private onWorkerCast(unit: Unit) {
    if (unit.getAbilityLevel(ABILITY.WORKERS) != 1) return
    this.workerGroup?.spawnWorker()
    const workerTemplate = this.workerTemplate(this.workerGroup?.getWorkerCount() ?? 0, this.workerGroup?.getWorkerLimit() ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, workerTemplate, 0), this.playerId)
  }

  private workerTemplate(workerCount: number, workerLimit: number): string {
    return "Worker count: " + workerCount + "|n" + "Worker limit: " + workerLimit + "|n" + "Every 5 sec"
  }

  private onIncome() {
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
