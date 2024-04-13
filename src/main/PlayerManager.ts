import { Unit } from "w3ts"

import { IncomeManager } from "./IncomeManager"
import { WorkerManager } from "./WorkerManager"
import { WORKER_ORDER } from "behaviour/WorkerBehaviour"
import { Player } from "game/Player"
import { ABILITY, Config, UNIT } from "util/Config"
import { ALLY_SHIFT } from "util/Globals"

export class PlayerManager {
  private readonly player: Player
  private readonly workerManager: WorkerManager
  private readonly incomeManager: IncomeManager

  constructor(config: Config, playerId: number) {
    this.player = new Player(config, playerId, playerId + ALLY_SHIFT)
    this.workerManager = new WorkerManager(this.player)
    this.incomeManager = new IncomeManager(this.player)
  }

  public onBuild(building: Unit) {
    if (building.typeId === UNIT.CASTLE) {
      this.player.init(building)
      this.workerManager.init()
    }
  }

  public onCast(castingUnit: Unit, spellId: number) {
    if (spellId == ABILITY.ABILITY_1) {
      this.workerManager.addOrder(WORKER_ORDER.BUILD_TOWER_1)
    }
  }

  public update(delta: number) {
    this.workerManager.update(delta)
    this.incomeManager.update(delta)
  }
}
