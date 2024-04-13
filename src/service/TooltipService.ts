import { ABILITY } from "util/Config"
import { doForLocalPlayer } from "util/Util"

const workerTemplate = (workerCount: number, workerLimit: number): string => "Worker count: " + workerCount + "|n" + "Worker limit: " + workerLimit + "|n" + "Every 5 sec"
const incomeTemplate = (totalGold: number, goldPerMin: string): string => "Total gold: " + totalGold + "|n" + "Gold per minute: " + goldPerMin + "|n" + "Every 10 sec"

export class TooltipService {
  static updateWorker(playerId: number, workersCount: number | undefined, workersLimit: number | undefined) {
    const text = workerTemplate(workersCount ?? 0, workersLimit ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, text, 0), playerId)
  }

  static updateIncome(playerId: number, totalGold: number | undefined, goldPerMin: number | undefined) {
    const text = incomeTemplate(totalGold ?? 0, (goldPerMin ?? 0).toFixed(2))
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.INCOME, text, 0), playerId)
  }
}
