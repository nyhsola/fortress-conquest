import { MapPlayer } from "w3ts"

import { GamePlayer } from "game/GamePlayer"
import { Task } from "global/Task"
import { TooltipService } from "service/TooltipService"
import { createTask } from "util/CommonUtil"
import { createFloatingTextOnUnit, F_COLOR } from "util/FloatTextUtil"

export class IncomeManager {
  private readonly income: Task
  private totalGold = 0
  private totalTime = 0

  constructor(player: GamePlayer) {
    this.income = createTask(() => this.onIncome(player), 10)
  }

  public update(delta: number) {
    this.income.update(delta)
    this.totalTime = this.totalTime + delta
  }

  public stats(): string {
    return TooltipService.incomeText(this.totalGold, this.totalGold / this.totalTime / 60)
  }

  private onIncome(player: GamePlayer) {
    const mapAlly = MapPlayer.fromIndex(player.allyId)
    const allyGold = mapAlly?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
    if (allyGold > 0) {
      const mapPlayer = MapPlayer.fromIndex(player.playerId)
      const playerGold = mapPlayer?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
      mapAlly?.setState(PLAYER_STATE_RESOURCE_GOLD, 0)
      mapPlayer?.setState(PLAYER_STATE_RESOURCE_GOLD, playerGold + allyGold)
      const castle = player.getCastle()
      castle && mapPlayer && createFloatingTextOnUnit("+" + allyGold, castle, mapPlayer, 12, F_COLOR.GOLD)
      this.totalGold = this.totalGold + allyGold
    }
  }
}
