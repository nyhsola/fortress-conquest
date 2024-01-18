import { Point, Unit } from "w3ts"

import { UNIT } from "util/Config"
import { createUnitAtPolar, createUnitNear, getPolarPoint, issueBuildOrder, issueOrder } from "util/Util"

export class WorkerGroup {
  private readonly castle: Unit
  private readonly allyId: number

  private mine: Unit | undefined
  private stock: Unit | undefined

  private point: Point | undefined
  private direction: number

  private workerLimit = 3
  private workerCount = 0

  private isInit = true

  constructor(castle: Unit, allyId: number) {
    this.castle = castle
    this.allyId = allyId

    this.point = castle.getPoint()
    this.direction = GetRandomDirectionDeg()

    this.mine = createUnitAtPolar(this.point, this.direction, 1500, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
  }

  public getWorkerCount(): number {
    return this.workerCount
  }

  public getWorkerLimit(): number {
    return this.workerLimit
  }

  public spawnWorker() {
    if (this.workerCount >= this.workerLimit) return
    const worker = createUnitNear(this.castle, this.allyId, UNIT.WORKER)
    if (this.isInit) {
      const point = getPolarPoint(this.castle.getPoint(), this.direction + 70, 800)
      const location = Location(point?.x ?? 0, point?.y ?? 0)
      worker && issueBuildOrder(worker, UNIT.STOCK, location)
      this.isInit = false
    } else {
      worker && this.mine && issueOrder(worker, "harvest", this.mine)
    }
    this.workerCount = this.workerCount + 1
  }
}
