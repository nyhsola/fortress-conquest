import { Point, Unit } from "w3ts"

import { FootmanManager } from "./FootmanManager"
import { IncomeManager } from "./IncomeManager"
import { WorkerManager } from "./WorkerManager"
import { GamePlayer } from "game/GamePlayer"
import { ABILITY, UNIT } from "util/Config"
import { removeAbility } from "util/Util"

export class PlayerManager {
  public readonly player: GamePlayer
  private readonly workerManager: WorkerManager
  private readonly incomeManager: IncomeManager
  private readonly footmanManager: FootmanManager

  constructor(player: GamePlayer) {
    this.player = player
    this.workerManager = new WorkerManager(this.player)
    this.incomeManager = new IncomeManager(this.player)
    this.footmanManager = new FootmanManager(this.player)
  }

  public onBuild(building: Unit) {
    if (building.typeId === UNIT.CASTLE) {
      this.player.onCastleBuild(building)
      this.workerManager.init()
      this.footmanManager.init()
    }
  }

  public onWarInit(point: Point) {
    this.player.onWarInit(point)
  }

  public onCast(castingUnit: Unit, spellId: number) {}

  public onFinishCast(castingUnit: Unit, spellId: number) {
    if (spellId === ABILITY.ABILITY_1) {
      removeAbility(castingUnit, ABILITY.ABILITY_1)
    }
    if (spellId === ABILITY.ABILITY_2) {
      removeAbility(castingUnit, ABILITY.ABILITY_2)
    }
    if (spellId === ABILITY.ABILITY_3) {
      removeAbility(castingUnit, ABILITY.ABILITY_3)
    }
    if (spellId == ABILITY.FOOTMAN) {
      this.footmanManager.onWarModeSwitch()
    }
  }

  public update(delta: number) {
    this.workerManager.update(delta)
    this.incomeManager.update(delta)
    this.footmanManager.update(delta)
  }
}
