import { BaseFormation } from "game/BaseFormation"
import { Player } from "game/Player"
import { Worker, WORKER_STATE } from "game/Worker"
import { UNIT } from "util/Config"

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
    this.addOrder(WORKER_ORDER.BUILD_STOCK)
  }

  public addOrder(order: WORKER_ORDER) {
    this.orders.push(order)
  }

  public updateState(workers: Array<Worker>) {
    for (const worker of workers) {
      switch (worker.getState()) {
        case WORKER_STATE.FREE:
          this.harvestOrder(worker)
          break
        case WORKER_STATE.LOCKED:
          !this.proceedOrder(worker) ? this.harvestOrder(worker) : undefined
          break
        case WORKER_STATE.BUILD:
          !worker.isBusy() ? this.harvestOrder(worker) : undefined
          break
      }
    }
    const anyWorker = workers.find((worker, index) => worker.getState() == WORKER_STATE.HARVEST)
    if (anyWorker && this.orders.length > 0) this.onPointOrder(anyWorker)
  }

  private proceedOrder(worker: Worker): boolean {
    const order = this.orders[0]
    let isDone = false
    switch (order) {
      case WORKER_ORDER.BUILD_STOCK:
        {
          isDone = true
          const point = this.player.getPoint()
          const direction = this.player.getDirection()
          const polar = point && direction && BaseFormation.STOCK(point, direction)
          const location = polar && Location(polar.x, polar.y)
          location && worker.orderBuild(location, UNIT.STOCK)
        }
        break

      case WORKER_ORDER.BUILD_TOWERS:
        {
          isDone = true
          const point = this.player.getPoint()
          const direction = this.player.getDirection()
          const polar = point && direction && BaseFormation.TOWER(point, direction)
          const location = polar && Location(polar.x, polar.y)
          location && worker.orderBuild(location, UNIT.TOWER)
        }
        break
    }
    if (isDone) this.orders.shift()
    return isDone
  }

  private harvestOrder(worker: Worker) {
    const mine = this.player.getMine()
    mine && worker.orderHarvest(mine)
  }

  private onPointOrder(worker: Worker) {
    const point = this.player.getCastle()?.getPoint()
    const location = point && Location(point?.x, point?.y)
    location && worker.orderPoint(location)
  }
}
