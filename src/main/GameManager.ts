import { MapPlayer, Unit } from "w3ts"

import { EnemyManager } from "./EnemyManager"
import { PlayerManager } from "./PlayerManager"
import { EventService, EventType } from "event/EventService"
import { Player } from "game/Player"
import { WarService } from "service/WarService"
import { Config } from "util/Config"
import { ALLY_SHIFT } from "util/Globals"
import { forEachPlayer } from "util/Util"

export class GameManager {
  private readonly players: Record<number, PlayerManager> = {}
  private readonly playersArr: Array<Player>
  private readonly eventService: EventService
  private readonly enemyManager: EnemyManager

  constructor(config: Config) {
    forEachPlayer((mapPlayer: MapPlayer) => {
      const playerId = mapPlayer.id
      const player = new Player(config, playerId, playerId + ALLY_SHIFT)
      this.players[playerId] = new PlayerManager(player)
    })

    this.playersArr = Object.entries(this.players).map((it) => it[1].player)

    this.eventService = new EventService()
    this.enemyManager = new EnemyManager(this.playersArr)

    this.eventService.subscribe(EventType.PER_SECOND, () => this.update(1))
    this.eventService.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.onBuild(building))
    this.eventService.subscribe(EventType.CASTING_STARTED, (castingUnit: Unit, spellId: number) => this.onCast(castingUnit, spellId))
    this.eventService.subscribe(EventType.CASTING_FINISHED, (castingUnit: Unit, spellId: number) => this.onFinishCast(castingUnit, spellId))
    this.eventService.subscribe(EventType.START_TIMER_EXPIRED, () => this.onStartTimerExpired())

    FogEnableOff()
    FogMaskEnableOff()
  }

  private onBuild(building: Unit) {
    this.players[building.owner.id].onBuild(building)
  }

  private onCast(castingUnit: Unit, spellId: number) {
    this.players[castingUnit.owner.id].onCast(castingUnit, spellId)
  }

  private onFinishCast(castingUnit: Unit, spellId: number) {
    this.players[castingUnit.owner.id].onFinishCast(castingUnit, spellId)
  }

  private onStartTimerExpired() {
    this.enemyManager.init()
    const point = WarService.initializeWarPlace(this.playersArr)
    for (const player in this.players) {
      point && this.players[player].onWarInit(point)
    }
  }

  private update(delta: number) {
    for (const player in this.players) {
      this.players[player].update(delta)
    }
    this.enemyManager.update(delta)
  }
}
