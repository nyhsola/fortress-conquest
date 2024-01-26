import { Point, Unit } from "w3ts"

import { Player } from "game/Player"
import { STATE, Worker } from "game/Worker"
import { TooltipService } from "service/TooltipService"
import { ABILITY, UNIT } from "util/Config"
import { Task } from "util/Task"
import { createTask, createUnitAtPolar } from "util/Util"

export class WorkerManager {
  private readonly player: Player

  private castle: Unit | undefined
  private mine: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined

  private behaviour: Task = createTask(() => this.updateWorker(), 3)
  private workerAbility: Task = createTask(() => this.onWorkerCast(), 5)
  private workerLimit = 3
  private workers: Array<Worker> = []

  constructor(player: Player) {
    this.player = player
  }

  public init() {
    this.workerAbility.reset()
    this.castle = this.player.getCastle()
    this.point = this.castle && this.castle.getPoint()
    this.direction = GetRandomDirectionDeg()
    this.mine = createUnitAtPolar(this.point, this.direction, 1500, PLAYER_NEUTRAL_PASSIVE, UNIT.MINE)
  }

  public update(delta: number) {
    this.behaviour.update(delta)
    this.workerAbility.update(delta)
  }

  private updateWorker() {
    for (const worker of this.workers) {
      switch (worker.getState()) {
        case STATE.FREE:
          this.mine && worker.orderHarvest(this.mine)
          break
      }
    }
  }

  private onWorkerCast() {
    if (!this.castle || this.castle.getAbilityLevel(ABILITY.WORKERS) != 1) return

    if (this.workers.length >= this.workerLimit || !this.point || !this.direction) return
    this.workers.push(new Worker(this.point, this.player.allyId))

    TooltipService.updateWorker(this.player.playerId, this.workers.length, this.workerLimit)
  }
}
