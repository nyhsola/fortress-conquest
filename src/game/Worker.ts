import { Point, Unit } from "w3ts"

import { UNIT } from "util/Config"
import { createUnitAtPoint, issueBuildOrder, issueOrder, issuePointOrder } from "util/Util"

export enum WORKER_STATE {
  FREE,
  LOCKED,
  HARVEST,
  BUILD,
}

export class Worker {
  private readonly worker: Unit | undefined
  private state: WORKER_STATE

  constructor(point: Point, allyId: number) {
    this.worker = createUnitAtPoint(point, allyId, UNIT.WORKER)
    this.state = WORKER_STATE.FREE
  }

  public orderPoint(location: location) {
    this.worker && issuePointOrder(this.worker, "move", location)
    this.state = WORKER_STATE.LOCKED
  }

  public orderBuild(location: location, unit: number) {
    this.worker && issueBuildOrder(this.worker, unit, location)
    this.state = WORKER_STATE.BUILD
  }

  public orderHarvest(mine: Unit) {
    this.worker && issueOrder(this.worker, "harvest", mine)
    this.state = WORKER_STATE.HARVEST
  }

  public getState = () => this.state

  public isBusy = () => this.worker?.currentOrder != 0
}
