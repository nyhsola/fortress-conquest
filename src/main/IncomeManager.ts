import { MapPlayer } from "w3ts"

import { Player } from "game/Player"
import { TooltipService } from "service/TooltipService"
import { createFloatingText } from "util/FTextUtil"
import { Task } from "util/Task"
import { createTask } from "util/Util"

export class IncomeManager {
  private readonly income: Task
  private totalGold = 0
  private totalTime = 0

  constructor(player: Player) {
    this.income = createTask(() => this.onIncome(player), 10)
  }

  public update(delta: number) {
    this.income.update(delta)
    this.totalTime = this.totalTime + delta
  }

  private onIncome(player: Player) {
    const mapAlly = MapPlayer.fromIndex(player.allyId)
    const allyGold = mapAlly?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
    if (allyGold > 0) {
      const mapPlayer = MapPlayer.fromIndex(player.playerId)
      const playerGold = mapPlayer?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
      mapAlly?.setState(PLAYER_STATE_RESOURCE_GOLD, 0)
      mapPlayer?.setState(PLAYER_STATE_RESOURCE_GOLD, playerGold + allyGold)
      const castle = player.getCastle()
      castle && mapPlayer && createFloatingText("+" + allyGold, castle, mapPlayer)
      this.totalGold = this.totalGold + allyGold
      TooltipService.updateIncome(player.playerId, this.totalGold, this.totalGold / this.totalTime / 60)
    }
  }
}
