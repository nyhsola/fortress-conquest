import { LOCAL_COLOR, withColor } from "util/Colors"
import { ABILITY } from "util/Config"
import { doForLocalPlayer } from "util/Util"

export enum FOOTMAN_MODE {
  WAR,
  DEFENCE,
}

const workerTemplate = (workerCount: number, workerLimit: number): string => "Workers (" + workerCount + "/" + workerLimit + ")"
const workerTemplateExtended = (): string => "Trains every 5 sec"

const footmanWarMode = (mode: FOOTMAN_MODE): string => (FOOTMAN_MODE.DEFENCE === mode ? withColor("(Defence)", LOCAL_COLOR.GREEN) : withColor("(War)", LOCAL_COLOR.RED))
const footmanTemplate = (mode: FOOTMAN_MODE, count: number, limit: number): string => "Footman (" + count + "/" + limit + ") " + footmanWarMode(mode)
const footmanTemplateExtended = (): string => "Trains every 5 sec"

const incomeTemplate = (totalGold: number, goldPerMin: string): string => "Total gold: " + totalGold + "|n" + "Gold per minute: " + goldPerMin

export class TooltipService {
  static updateWorker(playerId: number, workersCount: number | undefined, workersLimit: number | undefined) {
    const template = workerTemplate(workersCount ?? 0, workersLimit ?? 0)
    const extended = workerTemplateExtended()
    doForLocalPlayer(() => BlzSetAbilityTooltip(ABILITY.WORKERS, template, 0), playerId)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, extended, 0), playerId)
  }

  static updateFootman(playerId: number, mode: FOOTMAN_MODE, footmanCount: number | undefined, footmanLimit: number | undefined) {
    const template = footmanTemplate(mode, footmanCount ?? 0, footmanLimit ?? 0)
    const extended = footmanTemplateExtended()
    doForLocalPlayer(() => BlzSetAbilityTooltip(ABILITY.FOOTMAN, template, 0), playerId)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.FOOTMAN, extended, 0), playerId)
  }

  static updateIncome(playerId: number, totalGold: number | undefined, goldPerMin: number | undefined) {
    const text = incomeTemplate(totalGold ?? 0, (goldPerMin ?? 0).toFixed(2))
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.INCOME, text, 0), playerId)
  }
}
