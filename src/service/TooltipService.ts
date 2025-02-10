import { ABILITY } from "global/Config"
import { forLocalPlayer } from "util/CommonUtil"
import { LOCAL_COLOR, withColor } from "util/TextUtil"

export enum FOOTMAN_MODE {
  WAR,
  DEFENCE,
}

const workerTemplate = (workerCount: number, workerLimit: number): string => "Workers (" + workerCount + "/" + workerLimit + ")"
const workerTemplateExtended = (): string => withColor("Trains every 5 sec", LOCAL_COLOR.GREY)

const footmanTemplate = (count: number, limit: number): string => "Footman (" + count + "/" + limit + ") "
const footmanTemplateExtended = (): string => withColor("Trains every 5 sec", LOCAL_COLOR.GREY)

const incomeTemplate = (totalGold: number, goldPerMin: string): string => "TG: " + totalGold + "|n" + "GPM: " + goldPerMin

const enemiesTemplate = (enemies: number): string => "Enemies (" + enemies + ")"
const enemiesTemplateExtended = (): string => withColor("Nearby enemies", LOCAL_COLOR.GREY)

export class TooltipService {
  static workerText(workersCount: number | undefined, workersLimit: number | undefined): string {
    const template = workerTemplate(workersCount ?? 0, workersLimit ?? 0)
    const extended = workerTemplateExtended()
    return template + "|n" + extended
  }

  static footmanText(footmanCount: number | undefined, footmanLimit: number | undefined): string {
    const template = footmanTemplate(footmanCount ?? 0, footmanLimit ?? 0)
    const extended = footmanTemplateExtended()
    return template + "|n" + extended
  }

  static incomeText(totalGold: number | undefined, goldPerMin: number | undefined): string {
    const text = incomeTemplate(totalGold ?? 0, (goldPerMin ?? 0).toFixed(1))
    return text
  }

  static enemiesText(enemies: number | undefined): string {
    const text = enemiesTemplate(enemies ?? 0)
    const extended = enemiesTemplateExtended()
    return text + "|n" + extended
  }
}
