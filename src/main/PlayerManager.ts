import { MapPlayer, Unit } from "w3ts"

import { FootmanManager } from "./FootmanManager"
import { IncomeManager } from "./IncomeManager"
import { TABLE_ITEM, TableManager } from "./TableManager"
import { UI_ICON, UIManager } from "./UIManager"
import { WorkerManager } from "./WorkerManager"
import { GamePlayer } from "game/GamePlayer"
import { ABILITY, UNIT } from "global/Config"
import { TooltipService } from "service/TooltipService"
import { removeAbility } from "util/CommonUtil"

export class PlayerManager {
  public readonly player: GamePlayer
  private readonly workerManager: WorkerManager
  private readonly incomeManager: IncomeManager
  private readonly footmanManager: FootmanManager
  private readonly uiManager: UIManager
  private readonly tableManager: TableManager

  constructor(player: GamePlayer) {
    this.player = player
    this.workerManager = new WorkerManager(this.player)
    this.incomeManager = new IncomeManager(this.player)
    this.footmanManager = new FootmanManager(this.player)
    this.uiManager = new UIManager(this.player)
    this.tableManager = new TableManager(this.player)

    this.tableManager.setItemText(TABLE_ITEM.GPM, "999")
    this.tableManager.setItemText(TABLE_ITEM.TOTAL_GOLD, "999")
  }

  public init(enemies: Array<GamePlayer>) {
    this.uiManager.updateIconTooltip(UI_ICON.DEADLORD, TooltipService.enemiesText(enemies.length))
    this.player.onEnemiesFound(enemies)
  }

  public onBuild(building: Unit) {
    const mapPlayer = MapPlayer.fromIndex(this.player.playerId)

    if (building.typeId === UNIT.CASTLE) {
      this.player.onCastleBuild(building)
      this.workerManager.init()
    }
    if (building.typeId === UNIT.BARRACKS) {
      mapPlayer && building.setOwner(mapPlayer, true)
      this.player.onBarracksBuild(building)
      this.footmanManager.init()
    }
    if (building.typeId === UNIT.TOWER) {
      mapPlayer && building.setOwner(mapPlayer, true)
    }
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
  }

  public update(delta: number) {
    this.workerManager.update(delta)
    this.incomeManager.update(delta)
    this.footmanManager.update(delta)

    this.uiManager.updateIconTooltip(UI_ICON.WORKER, this.workerManager.stats())
    this.uiManager.updateIconTooltip(UI_ICON.FOOTMAN, this.footmanManager.stats())
    this.uiManager.updateIconTooltip(UI_ICON.GOLD_CHEST, this.incomeManager.stats())
  }
}
