import { ABILITY } from "util/Config"
import { doForLocalPlayer } from "util/Util"

const workerTemplate = (workerCount: number, workerLimit: number): string => "Count\\Limit: " + workerCount + "\\" + workerLimit + "|n" + "Trains every 5 sec"
const footmanTemplate = (footmanCount: number, footmanLimit: number): string => "Count\\Limit: " + footmanCount + "\\" + footmanLimit + "|n" + "Trains every 5 sec"
const incomeTemplate = (totalGold: number, goldPerMin: string): string => "Total gold: " + totalGold + "|n" + "Gold per minute: " + goldPerMin

export class TooltipService {
  static updateWorker(playerId: number, workersCount: number | undefined, workersLimit: number | undefined) {
    const text = workerTemplate(workersCount ?? 0, workersLimit ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, text, 0), playerId)
  }

  static updateFootman(playerId: number, footmanCount: number | undefined, footmanLimit: number | undefined) {
    const text = footmanTemplate(footmanCount ?? 0, footmanLimit ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.FOOTMAN, text, 0), playerId)
  }

  static updateIncome(playerId: number, totalGold: number | undefined, goldPerMin: number | undefined) {
    const text = incomeTemplate(totalGold ?? 0, (goldPerMin ?? 0).toFixed(2))
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.INCOME, text, 0), playerId)
  }
}
