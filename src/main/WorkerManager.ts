import { Point, Unit } from "w3ts"

import { BuildManager } from "./BuildManager"
import { STATE, Worker } from "game/Worker"
import { ABILITY, UNIT } from "util/Config"
import { Task } from "util/Task"
import { createTask, createUnitNear, doForLocalPlayer, getPolarPoint, issueBuildOrder, issueOrder } from "util/Util"

const workerTemplate = (workerCount: number, workerLimit: number): string => "Worker count: " + workerCount + "|n" + "Worker limit: " + workerLimit + "|n" + "Every 5 sec"

export class WorkerManager {
  private readonly playerId: number
  private readonly allyId: number
  private castle: Unit | undefined
  private mine: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined
  private workerLimit = 3
  private behaviour: Task = createTask(() => this.onBehaviourUpdate(), 3)
  private workerAbility: Task = createTask(() => this.onWorkerCast(this.castle), 5)
  private workers: Array<Worker> = []

  constructor(playerId: number, allyId: number) {
    this.playerId = playerId
    this.allyId = allyId
  }

  public update(delta: number) {
    this.behaviour.update(delta)
    this.workerAbility.update(delta)
  }

  public onCastleBuild(buildManager: BuildManager) {
    this.workerAbility.reset()
    this.point = buildManager.getPoint()
    this.direction = buildManager.getDirection()
    this.castle = buildManager.getCastle()
    this.mine = buildManager.getMine()
  }

  public onBuild(building: Unit) {}

  private onBehaviourUpdate() {
    for (const worker of this.workers) {
      switch (worker.getState()) {
        case STATE.FREE:
          this.mine && worker.orderHarvest(this.mine)
          break
      }
    }
  }

  private onWorkerCast(castle: Unit | undefined) {
    if (!castle || castle.getAbilityLevel(ABILITY.WORKERS) != 1) return
    this.spawnWorker()
    this.updateWorkerAbility()
  }

  private spawnWorker() {
    if (this.workers.length >= this.workerLimit || !this.point || !this.direction) return
    const worker = new Worker(this.point, this.allyId)
    this.workers.push(worker)
  }

  private updateWorkerAbility() {
    const text = workerTemplate(this.workers.length ?? 0, this.workerLimit ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, text, 0), this.playerId)
  }
}
