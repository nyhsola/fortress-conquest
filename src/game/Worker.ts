import { Point, Unit } from "w3ts"

import { UNIT } from "util/Config"
import { createUnitNear, issueBuildOrder, issueOrder } from "util/Util"

export enum STATE {
  FREE,
  HARVEST,
}

export class Worker {
  private worker: Unit | undefined
  private state: STATE

  constructor(point: Point, allyId: number) {
    this.worker = createUnitNear(point, allyId, UNIT.WORKER)
    this.state = STATE.FREE
  }

  public orderBuild(location: location, unit: number) {
    this.worker && issueBuildOrder(this.worker, unit, location)
  }

  public orderHarvest(mine: Unit) {
    this.worker && issueOrder(this.worker, "harvest", mine)
    this.state = STATE.HARVEST
  }

  public getState = () => this.state
}
