import { MapPlayer, Unit } from "w3ts"

import { AbilityManager } from "./AbilityManager"
import { IncomeManager } from "./IncomeManager"
import { SquadManager } from "./SquadManager"
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
  private readonly squadManager: SquadManager
  private readonly uiManager: UIManager
  private readonly abilityManager: AbilityManager
  private readonly tableManager: TableManager

  constructor(player: GamePlayer) {
    this.player = player
    this.workerManager = new WorkerManager(this.player)
    this.incomeManager = new IncomeManager(this.player)
    this.squadManager = new SquadManager(this.player)
    this.uiManager = new UIManager(this.player)
    this.abilityManager = new AbilityManager(this.player)
    this.tableManager = new TableManager(this.player)

    this.abilityManager.updateTooltip(ABILITY.FOOTMAN_PASSIVE, TooltipService.footmanAbilityText)
    this.abilityManager.updateTooltipExtended(ABILITY.FOOTMAN_PASSIVE, TooltipService.footmanAbilityExtendedText)

    this.abilityManager.updateTooltip(ABILITY.INCOME, TooltipService.incomeAbilityText)
    this.abilityManager.updateTooltipExtended(ABILITY.INCOME, TooltipService.incomeAbilityExtendedText)

    this.abilityManager.updateTooltip(ABILITY.WORKERS, TooltipService.workerAbilityText)
    this.abilityManager.updateTooltipExtended(ABILITY.WORKERS, TooltipService.workerAbilityExtendedText)

    this.tableManager.setItemText(TABLE_ITEM.PLAYER, MapPlayer.fromIndex(this.player.playerId)!!.name)
  }

  public init(enemies: Array<GamePlayer>) {
    // this.uiManager.updateIconTooltip(UI_ICON.DEADLORD, TooltipService.enemiesText(enemies.length))
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
      this.squadManager.init()
    }
    if (building.typeId === UNIT.TOWER) {
      mapPlayer && building.setOwner(mapPlayer, true)
    }
  }

  public update(delta: number) {
    this.workerManager.update(delta)
    this.incomeManager.update(delta)
    this.squadManager.update(delta)

    this.tableManager.setItemText(TABLE_ITEM.TOTAL_GOLD, this.incomeManager.getTotalGold())
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

  public onResearchFinished(techId: number) {
    const allyPlayer = MapPlayer.fromIndex(this.player.allyId)!!.handle
    const mapPlayer = MapPlayer.fromIndex(this.player.playerId)!!.handle
    const level = GetPlayerTechCount(mapPlayer, techId, true)
    SetPlayerTechResearched(allyPlayer, techId, level)
  }
}
