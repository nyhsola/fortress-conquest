import { ABILITY } from "global/Config"
import { forLocalPlayer } from "util/CommonUtil"
import { LOCAL_COLOR, withColor } from "util/TextUtil"

export enum FOOTMAN_MODE {
  WAR,
  DEFENCE,
}

const workerTemplate = (workerCount: number, workerLimit: number): string => "Workers (" + workerCount + "/" + workerLimit + ")"
const workerTemplateExtended = (): string => "Trains every 5 sec"

const footmanWarMode = (mode: FOOTMAN_MODE): string => (FOOTMAN_MODE.DEFENCE === mode ? withColor("(Defence)", LOCAL_COLOR.GREEN) : withColor("(War)", LOCAL_COLOR.RED))
const footmanTemplate = (mode: FOOTMAN_MODE, count: number, limit: number): string => "Footman (" + count + "/" + limit + ") " + footmanWarMode(mode)
const footmanTemplateExtended = (): string => "Trains every 5 sec"

const incomeTemplate = (totalGold: number, goldPerMin: string): string => "Total gold: " + totalGold + "|n" + "GPM: " + goldPerMin

export class TooltipService {
  static workerText(workersCount: number | undefined, workersLimit: number | undefined): string {
    const template = workerTemplate(workersCount ?? 0, workersLimit ?? 0)
    const extended = workerTemplateExtended()
    return template + "|n" + extended
  }

  static footmanText(mode: FOOTMAN_MODE, footmanCount: number | undefined, footmanLimit: number | undefined): string {
    const template = footmanTemplate(mode, footmanCount ?? 0, footmanLimit ?? 0)
    const extended = footmanTemplateExtended()
    return template + "|n" + extended
  }

  static incomeText(totalGold: number | undefined, goldPerMin: number | undefined): string {
    const text = incomeTemplate(totalGold ?? 0, (goldPerMin ?? 0).toFixed(1))
    return text
  }
}
