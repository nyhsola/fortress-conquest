import { LOCAL_COLOR, withColor } from "util/Colors"
import { ABILITY } from "util/Config"
import { doForLocalPlayer } from "util/Util"

export enum FOOTMAN_MODE {
  WAR,
  DEFENCE,
}

const workerTemplate = (workerCount: number, workerLimit: number): string => "Count\\Limit: " + workerCount + "\\" + workerLimit + "|n" + "Trains every 5 sec"
const footmanTemplateCount = (footmanCount: number, footmanLimit: number): string => "Count\\Limit: " + footmanCount + "\\" + footmanLimit + "|n" + "Trains every 5 sec"
const incomeTemplate = (totalGold: number, goldPerMin: string): string => "Total gold: " + totalGold + "|n" + "Gold per minute: " + goldPerMin
const footmanTemplateMode = (mode: FOOTMAN_MODE): string =>
  FOOTMAN_MODE.DEFENCE === mode ? "Footman " + withColor("(Defence)", LOCAL_COLOR.GREEN) : "Footman " + withColor("(War)", LOCAL_COLOR.RED)

export class TooltipService {
  static updateWorker(playerId: number, workersCount: number | undefined, workersLimit: number | undefined) {
    const text = workerTemplate(workersCount ?? 0, workersLimit ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, text, 0), playerId)
  }

  static updateFootmanCount(playerId: number, footmanCount: number | undefined, footmanLimit: number | undefined) {
    const text = footmanTemplateCount(footmanCount ?? 0, footmanLimit ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.FOOTMAN, text, 0), playerId)
  }

  static updateFootmanMode(playerId: number, mode: FOOTMAN_MODE) {
    const text = footmanTemplateMode(mode)
    doForLocalPlayer(() => BlzSetAbilityTooltip(ABILITY.FOOTMAN, text, 0), playerId)
  }

  static updateIncome(playerId: number, totalGold: number | undefined, goldPerMin: number | undefined) {
    const text = incomeTemplate(totalGold ?? 0, (goldPerMin ?? 0).toFixed(2))
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.INCOME, text, 0), playerId)
  }
}
