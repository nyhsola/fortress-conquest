import { MapPlayer, Unit } from "w3ts"

import { WorkerManager } from "./WorkerManager"
import { WORKER_ORDER } from "behaviour/WorkerBehaviour"
import { Player } from "game/Player"
import { IncomeService } from "service/IncomeService"
import { ABILITY, Config, UNIT } from "util/Config"
import { ALLY_SHIFT } from "util/Globals"
import { Task } from "util/Task"
import { createTask } from "util/Util"

export class PlayerManager {
  private readonly player: Player
  private readonly income: Task
  private readonly workerManager: WorkerManager

  constructor(config: Config, playerId: number) {
    this.player = new Player(config, playerId, playerId + ALLY_SHIFT)
    this.income = createTask(() => IncomeService.onIncome(this.player), 10)
    this.workerManager = new WorkerManager(this.player)
  }

  public onBuild(building: Unit) {
    if (building.typeId === UNIT.CASTLE) {
      this.player.init(building)
      this.workerManager.init()
    }
  }

  public onCast(castingUnit: Unit, spellId: number) {
    if (spellId == ABILITY.ABILITY_1) {
      this.workerManager.addOrder(WORKER_ORDER.BUILD_TOWERS)
    }
  }

  public update(delta: number) {
    this.income.update(delta)
    this.workerManager.update(delta)
  }
}
