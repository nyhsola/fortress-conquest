import { Unit } from "w3ts"

import { ABILITY, UNIT } from "util/Config"
import { createUnitNear } from "util/Util"

export class BuildManager {
  private workers: Record<number, Unit> = {}

  private currentId = 1
  private workerCountLimit = 3

  private playerId: number
  private allyId: number

  constructor(playerId: number, allyId: number) {
    this.playerId = playerId
    this.allyId = allyId
  }

  public spawnWorker(castle: Unit) {
    const workersCount = Object.keys(this.workers).length

    if (castle == undefined || castle.getAbilityLevel(ABILITY.WORKERS) != 1 || workersCount >= this.workerCountLimit) return
    const worker = createUnitNear(castle, this.allyId, UNIT.WORKER)
    if (!worker) return

    this.workers[this.currentId] = worker
    this.currentId = this.currentId + 1
  }
}
