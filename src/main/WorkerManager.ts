import { WORKER_ORDER, WorkerBehaviour } from "behaviour/WorkerBehaviour"
import { GamePlayer } from "game/GamePlayer"
import { Worker } from "game/Worker"
import { ABILITY } from "global/Config"
import { Task } from "global/Task"
import { TooltipService } from "service/TooltipService"
import { createTask } from "util/CommonUtil"

export class WorkerManager {
  private readonly player: GamePlayer
  private readonly workers: Array<Worker> = []
  private readonly behaviour: WorkerBehaviour
  private readonly behaviourTask: Task = createTask(() => this.updateWorker(), 3)
  private readonly workerAbility: Task = createTask(() => this.onWorkerCast(), 5)

  private workerLimit = 3

  constructor(player: GamePlayer) {
    this.player = player
    this.behaviour = new WorkerBehaviour(this.player)
    this.behaviour.addOrder(WORKER_ORDER.BUILD_STOCK)
  }

  public init() {
    this.workerAbility.reset()
  }

  public update(delta: number) {
    this.behaviourTask.update(delta)
    this.workerAbility.update(delta)
  }

  public stats(): string {
    return TooltipService.workerText(this.workers.length, this.workerLimit)
  }

  private updateWorker() {
    this.behaviour.updateState(this.workers)
  }

  private onWorkerCast() {
    const castle = this.player.getCastle()
    const point = this.player.getPoint()
    const direction = this.player.getDirection()

    if (!castle) return

    if (this.workers.length >= this.workerLimit || !point || !direction) return
    this.workers.push(new Worker(point, this.player.allyId))
  }
}
