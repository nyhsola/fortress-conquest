import { Player } from "game/Player"
import { Worker, WORKER_STATE } from "game/Worker"
import { UNIT } from "util/Config"
import { getPolarPoint } from "util/Util"

export enum WORKER_ORDER {
  HARVEST,
  BUILD_STOCK,
  BUILD_TOWERS,
}

export class WorkerBehaviour {
  private readonly player: Player
  private readonly orders: Array<WORKER_ORDER> = []

  constructor(player: Player) {
    this.player = player
    this.orders.push(WORKER_ORDER.BUILD_STOCK)
  }

  public addOrder(order: WORKER_ORDER) {
    this.orders.push(order)
  }

  public updateState(workers: Array<Worker>) {
    for (const worker of workers) {
      switch (worker.getState()) {
        case WORKER_STATE.FREE:
          let defaultOrder = true
          if (this.orders.length > 0) defaultOrder = !this.proceedOrder(worker)
          if (defaultOrder) this.defaultOrder(worker)
          break
        case WORKER_STATE.BUILD:
          this.defaultOrder(worker)
          break
      }
    }

    const anyWorker = workers.find((worker, index) => worker.getState() == WORKER_STATE.HARVEST)
    if (anyWorker && this.orders.length > 0) this.freeWorker(anyWorker)
  }

  private proceedOrder(worker: Worker): boolean {
    const order = this.orders[0]
    let isDone = false
    switch (order) {
      case WORKER_ORDER.BUILD_STOCK:
        isDone = true
        const point = this.player.getPoint()
        const direction = this.player.getDirection()
        const polar = point && direction && getPolarPoint(point, direction + 40, 800)
        const location = polar && Location(polar.x, polar.y)
        location && worker.orderBuild(location, UNIT.STOCK)
        break
    }
    if (isDone) this.orders.shift()
    return isDone
  }

  private defaultOrder(worker: Worker) {
    const mine = this.player.getMine()
    mine && worker.orderHarvest(mine)
  }

  private freeWorker(worker: Worker) {
    const point = this.player.getCastle()?.getPoint()
    const location = point && Location(point?.x, point?.y)
    location && worker.orderPoint(location)
  }
}
