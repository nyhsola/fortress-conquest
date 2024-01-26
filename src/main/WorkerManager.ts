import { Point, Unit } from "w3ts"

import { Player } from "game/Player"
import { STATE, Worker } from "game/Worker"
import { ABILITY, UNIT } from "util/Config"
import { Task } from "util/Task"
import { createTask, createUnitAtPolar, doForLocalPlayer } from "util/Util"

const workerTemplate = (workerCount: number, workerLimit: number): string => "Worker count: " + workerCount + "|n" + "Worker limit: " + workerLimit + "|n" + "Every 5 sec"

export class WorkerManager {
  private readonly player: Player

  private castle: Unit | undefined
  private mine: Unit | undefined
  private point: Point | undefined
  private direction: number | undefined

  private behaviour: Task = createTask(() => this.onBehaviourUpdate(), 3)
  private workerAbility: Task = createTask(() => this.onWorkerCast(this.castle), 5)
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
    const worker = new Worker(this.point, this.player.allyId)
    this.workers.push(worker)
  }

  private updateWorkerAbility() {
    const text = workerTemplate(this.workers.length ?? 0, this.workerLimit ?? 0)
    doForLocalPlayer(() => BlzSetAbilityExtendedTooltip(ABILITY.WORKERS, text, 0), this.player.playerId)
  }

  public getCastle = () => this.castle
}
