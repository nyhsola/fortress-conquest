import { Player } from "game/Player"
import { Worker, WORKER_STATE } from "game/Worker"
import { UNIT } from "util/Config"
import { getPolarPoint } from "util/Util"

enum WORKER_ORDER {
  HARVEST,
  BUILD_STOCK,
}

export class WorkerBehaviour {
  private readonly player: Player
  private readonly orders: Array<WORKER_ORDER> = []

  constructor(player: Player) {
    this.player = player
    this.orders.push(WORKER_ORDER.BUILD_STOCK)
  }

  public updateState(worker: Worker) {
    switch (worker.getState()) {
      case WORKER_STATE.FREE:
      case WORKER_STATE.BUILD:
        this.orders.length > 0 ? this.proceedOrder(worker) : this.defaultOrder(worker)
        break
    }
  }

  private proceedOrder(worker: Worker) {
    const order = this.orders.shift()
    switch (order) {
      case WORKER_ORDER.BUILD_STOCK:
        const point = this.player.getPoint()
        const direction = this.player.getDirection()
        const polar = point && direction && getPolarPoint(point, direction + 40, 800)
        const location = polar && Location(polar.x, polar.y)
        location && worker.orderBuild(location, UNIT.STOCK)
        break
    }
  }

  private defaultOrder(worker: Worker) {
    const mine = this.player.getMine()
    mine && worker.orderHarvest(mine)
  }
}
