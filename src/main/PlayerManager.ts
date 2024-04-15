import { Unit } from "w3ts"

import { FootmanManager } from "./FootmanManager"
import { IncomeManager } from "./IncomeManager"
import { WorkerManager } from "./WorkerManager"
import { Player } from "game/Player"
import { ABILITY, UNIT } from "util/Config"
import { removeAbility } from "util/Util"

export class PlayerManager {
  public readonly player: Player
  private readonly workerManager: WorkerManager
  private readonly incomeManager: IncomeManager
  private readonly footmanManager: FootmanManager

  constructor(player: Player) {
    this.player = player
    this.workerManager = new WorkerManager(this.player)
    this.incomeManager = new IncomeManager(this.player)
    this.footmanManager = new FootmanManager(this.player)
  }

  public onBuild(building: Unit) {
    if (building.typeId === UNIT.CASTLE) {
      this.player.init(building)
      this.workerManager.init()
      this.footmanManager.init()
    }
  }

  public onCast(castingUnit: Unit, spellId: number) {
    if (spellId === ABILITY.ABILITY_2) {
      removeAbility(castingUnit, ABILITY.ABILITY_2)
    }
  }

  public update(delta: number) {
    this.workerManager.update(delta)
    this.incomeManager.update(delta)
    this.footmanManager.update(delta)
  }
}
