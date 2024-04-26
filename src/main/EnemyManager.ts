import { BaseFormation } from "game/BaseFormation"
import { GamePlayer } from "game/Player"
import { UNIT } from "util/Config"
import { ENEMY_PLAYER } from "util/Globals"
import { Task } from "util/Task"
import { createTask, createUnitAtPoint } from "util/Util"

export class EnemyManager {
  private readonly players: Array<GamePlayer>
  private readonly spawn: Task
  private started = false

  constructor(players: Array<GamePlayer>) {
    this.players = players
    this.spawn = createTask(() => this.spawnZombie(), 10)
  }

  public init() {
    this.started = true
  }

  public update(delta: number) {
    this.started && this.spawn.update(delta)
  }

  private spawnZombie() {
    this.players.forEach((it) => {
      const point = it.getPoint()
      const zPoint = point && BaseFormation.ZOMBIE_POINT(point)
      zPoint && createUnitAtPoint(zPoint, ENEMY_PLAYER, UNIT.ZOMBIE)
    })
  }
}
