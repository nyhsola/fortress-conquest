import { MapPlayer, Unit } from "w3ts"

import { EnemyManager } from "./EnemyManager"
import { PlayerManager } from "./PlayerManager"
import { EventService, EventType } from "event/EventService"
import { GamePlayer } from "game/Player"
import { WarService } from "service/WarService"
import { Config } from "util/Config"
import { ALLY_SHIFT } from "util/Globals"
import { forEachPlayer, setAliance } from "util/Util"

export class GameManager {
  private readonly players: Record<number, PlayerManager> = {}
  private readonly playersArr: Array<GamePlayer>
  private readonly eventService: EventService
  private readonly enemyManager: EnemyManager

  constructor(config: Config) {
    forEachPlayer((mapPlayer: MapPlayer) => {
      const playerId = mapPlayer.id
      const player = new GamePlayer(config, playerId, playerId + ALLY_SHIFT)
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

    FogMaskEnableOff()

    setAliance(Player(0), Player(12))
    setAliance(Player(1), Player(13))
    setAliance(Player(2), Player(14))
    setAliance(Player(3), Player(15))
    setAliance(Player(4), Player(16))
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
