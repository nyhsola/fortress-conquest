import { Point } from "w3ts"

import { GamePlayer } from "game/GamePlayer"
import { Worker, WORKER_STATE } from "game/Worker"
import { UNIT } from "global/Config"
import { Positions } from "global/Positions"

export enum WORKER_ORDER {
  BUILD_STOCK,
  BUILD_BARRACKS,
  BUILD_TOWER_1,
  BUILD_TOWER_2,
  BUILD_TOWER_3,
  BUILD_TOWER_4,
  BUILD_TOWER_5,
  BUILD_TOWER_6,
}

export class WorkerBehaviour {
  private readonly player: GamePlayer
  private readonly orders: Array<WORKER_ORDER> = []

  constructor(player: GamePlayer) {
    this.player = player
  }

  public addOrder(order: WORKER_ORDER) {
    this.orders.push(order)
  }

  public updateState(workers: Array<Worker>) {
    for (const worker of workers) {
      switch (worker.getState()) {
        case WORKER_STATE.FREE:
          this.onHarvestOrder(worker)
          break
        case WORKER_STATE.HARVEST:
          if (this.orders.length > 0) this.proceedOrder(worker)
          break
        case WORKER_STATE.BUILD:
          if (!worker.isBusy()) this.onHarvestOrder(worker)
          break
      }
    }
  }

  private proceedOrder(worker: Worker): boolean {
    if (this.orders.length <= 0) return false

    switch (this.orders.shift()) {
      case WORKER_ORDER.BUILD_STOCK:
        this.onBuildOrder(worker, UNIT.STOCK, (point: Point, direction: number) => Positions.STOCK(point, direction))
        this.addOrder(WORKER_ORDER.BUILD_BARRACKS)
        this.addOrder(WORKER_ORDER.BUILD_TOWER_1)
        this.addOrder(WORKER_ORDER.BUILD_TOWER_2)
        this.addOrder(WORKER_ORDER.BUILD_TOWER_3)
        this.addOrder(WORKER_ORDER.BUILD_TOWER_4)
        this.addOrder(WORKER_ORDER.BUILD_TOWER_5)
        this.addOrder(WORKER_ORDER.BUILD_TOWER_6)
        break

      case WORKER_ORDER.BUILD_BARRACKS:
        this.onBuildOrder(worker, UNIT.BARRACKS, (point: Point, direction: number) => Positions.BARRACKS(point, direction))
        break

      case WORKER_ORDER.BUILD_TOWER_1:
        this.onBuildOrder(worker, UNIT.TOWER, (point: Point, direction: number) => Positions.TOWER_1(point, direction))
        break

      case WORKER_ORDER.BUILD_TOWER_2:
        this.onBuildOrder(worker, UNIT.TOWER, (point: Point, direction: number) => Positions.TOWER_2(point, direction))
        break

      case WORKER_ORDER.BUILD_TOWER_3:
        this.onBuildOrder(worker, UNIT.TOWER, (point: Point, direction: number) => Positions.TOWER_3(point, direction))
        break

      case WORKER_ORDER.BUILD_TOWER_4:
        this.onBuildOrder(worker, UNIT.TOWER, (point: Point, direction: number) => Positions.TOWER_4(point, direction))
        break

      case WORKER_ORDER.BUILD_TOWER_5:
        this.onBuildOrder(worker, UNIT.TOWER, (point: Point, direction: number) => Positions.TOWER_5(point, direction))
        break

      case WORKER_ORDER.BUILD_TOWER_6:
        this.onBuildOrder(worker, UNIT.TOWER, (point: Point, direction: number) => Positions.TOWER_6(point, direction))
        break
    }

    return true
  }

  private onBuildOrder(worker: Worker, unit: number, f: (point: Point, direction: number) => Point | undefined) {
    const point = this.player.getPoint()
    const direction = this.player.getDirection()
    const polar = point && direction && f(point, direction)
    const location = polar && Location(polar.x, polar.y)
    location && worker.orderBuild(location, unit)
  }

  private onHarvestOrder(worker: Worker) {
    const mine = this.player.getMine()
    mine && worker.orderHarvest(mine)
  }

  // private onPointOrder(worker: Worker) {
  //   const point = this.player.getCastle()?.getPoint()
  //   const location = point && Location(point?.x, point?.y)
  //   location && worker.orderPoint(location)
  // }
}
