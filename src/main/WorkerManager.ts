import { Point, Unit } from "w3ts"

import { WorkerBehaviour } from "behaviour/WorkerBehaviour"
import { Player } from "game/Player"
import { Worker } from "game/Worker"
import { TooltipService } from "service/TooltipService"
import { ABILITY } from "util/Config"
import { Task } from "util/Task"
import { createTask } from "util/Util"

export class WorkerManager {
  private readonly player: Player

  private behaviour: Task = createTask(() => this.updateWorker(), 3)
  private workerAbility: Task = createTask(() => this.onWorkerCast(), 5)
  private workerLimit = 3
  private workers: Array<Worker> = []

  constructor(player: Player) {
    this.player = player
  }

  public init() {
    this.workerAbility.reset()
  }

  public update(delta: number) {
    this.behaviour.update(delta)
    this.workerAbility.update(delta)
  }

  private updateWorker() {
    for (const worker of this.workers) {
      WorkerBehaviour.updateState(worker, this.player)
    }
  }

  private onWorkerCast() {
    const castle = this.player.getCastle()
    const point = this.player.getPoint()
    const direction = this.player.getDirection()

    if (!castle || castle.getAbilityLevel(ABILITY.WORKERS) != 1) return

    if (this.workers.length >= this.workerLimit || !point || !direction) return
    this.workers.push(new Worker(point, this.player.allyId))

    TooltipService.updateWorker(this.player.playerId, this.workers.length, this.workerLimit)
  }
}
