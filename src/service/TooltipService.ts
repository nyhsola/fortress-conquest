import { ABILITY } from "util/Config"
import { doForLocalPlayer } from "util/Util"

const workerTemplate = (workerCount: number, workerLimit: number): string => "Worker count: " + workerCount + "|n" + "Worker limit: " + workerLimit + "|n" + "Every 5 sec"

export class TooltipService {
  static updateWorker(playerId: number, workersCount: number | undefined, workersLimit: number | undefined) {
    const text = workerTemplate(workersCount ?? 0, workersLimit ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, text, 0), playerId)
  }
}
