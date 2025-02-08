import { MapPlayer, Unit } from "w3ts/handles"

import { BaseFormation } from "game/BaseFormation"
import { GamePlayer } from "game/GamePlayer"
import { UNIT } from "global/Config"
import { ALLY_SHIFT, ENEMY_PLAYER } from "global/Globals"
import { Task } from "global/Task"
import { createTask, createUnitAtPoint, issuePointOrder, sendChatMessageToAllPlayers } from "util/CommonUtil"
import { createFloatingText, createFloatingTextOnUnitRandom, FloatTextUtil } from "util/FloatTextUtil"

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

  public onUnitDeath(deathUnit: Unit, killingUnit: Unit) {
    if (deathUnit.typeId == UNIT.ZOMBIE) {
      const id = killingUnit.owner.id - ALLY_SHIFT
      const mapPlayer = MapPlayer.fromIndex(id)
      mapPlayer && createFloatingTextOnUnitRandom("DEAD!", deathUnit, mapPlayer, 8, FloatTextUtil.RED)
      const playerGold = mapPlayer?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
      mapPlayer?.setState(PLAYER_STATE_RESOURCE_GOLD, playerGold + 10)
      mapPlayer && createFloatingTextOnUnitRandom("+10", deathUnit, mapPlayer, 8, FloatTextUtil.GOLD)
    }
  }

  private spawnZombie() {
    this.players.forEach((it) => {
      const point = it.getPoint()
      const zPoint = point && BaseFormation.ZOMBIE_POINT(point)
      const unit = zPoint && createUnitAtPoint(zPoint, ENEMY_PLAYER, UNIT.ZOMBIE)
      const location = it.getCastle()?.point.handle
      unit && location && issuePointOrder(unit, "attack", location)
    })
  }
}
