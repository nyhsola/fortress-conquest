import { Point, Unit } from "w3ts"

import { UNIT } from "util/Config"
import { createUnitNear, getPolarPoint, issueBuildOrder, issueOrder } from "util/Util"

export class WorkerManager {
  private readonly allyId: number
  private mine: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined

  private workerLimit = 3
  private workerCount = 0

  private isFirstUnit = true

  constructor(allyId: number) {
    this.allyId = allyId
  }

  public spawnWorker() {
    if (this.workerCount >= this.workerLimit || !this.point || !this.direction) return
    const worker = createUnitNear(this.point, this.allyId, UNIT.WORKER)
    if (this.isFirstUnit) {
      const point = getPolarPoint(this.point, this.direction + 70, 800)
      const location = Location(point?.x ?? 0, point?.y ?? 0)
      worker && issueBuildOrder(worker, UNIT.STOCK, location)
      this.isFirstUnit = false
    } else {
      worker && this.mine && issueOrder(worker, "harvest", this.mine)
    }
    this.workerCount = this.workerCount + 1
  }

  public setPointAndDirection(point: Point | undefined, direction: number | undefined) {
    this.point = point
    this.direction = direction
  }

  public setMine = (mine: Unit | undefined) => (this.mine = mine)

  public getWorkerCount = () => this.workerCount

  public getWorkerLimit = () => this.workerLimit
}
