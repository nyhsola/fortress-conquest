import { MapPlayer, Unit } from "w3ts"

import { PlayerManager } from "../main/PlayerManager"
import { EnemyManager } from "./EnemyManager"
import { GamePlayer } from "game/GamePlayer"
import { Config, Mode, Zones } from "global/Config"
import { ALLY_SHIFT } from "global/Globals"
import { BorderService } from "service/BorderService"
import { EventService, EventType } from "service/EventService"
import { AllyUtil } from "util/AllyUtil"
import { forEachPlayingPlayer, ifAllyGetOwner, sendChatMessageToAllPlayers, setAliance, setEnemies } from "util/CommonUtil"
import { StartUtil } from "util/StartUtil"

export class GameManager {
  private readonly players: Record<number, PlayerManager> = {}
  private readonly playersArr: Array<GamePlayer>
  private readonly eventService: EventService
  private readonly borderService: BorderService
  private readonly enemyManager: EnemyManager

  constructor(config: Config) {
    this.startGame(config)

    this.playersArr = Object.entries(this.players).map((it) => it[1].player)
    this.eventService = new EventService()
    this.enemyManager = new EnemyManager(this.playersArr)
    this.borderService = new BorderService(this.playersArr)

    this.eventService.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.onBuild(building))

    if (config.mode == Mode.DEBUG) {
      FogMaskEnableOff()
      FogEnableOff()
    } else {
      FogMaskEnableOff()
    }

    AllyUtil.setAllyInit()
  }

  private startGame(config: Config) {
    forEachPlayingPlayer((mapPlayer: MapPlayer) => {
      const playerId = mapPlayer.id
      const allyId = playerId + ALLY_SHIFT
      const player = new GamePlayer(config, playerId, allyId)
      this.players[playerId] = new PlayerManager(player)
      const mapPlayerAlly = MapPlayer.fromIndex(allyId)
      mapPlayerAlly && (mapPlayerAlly.name = mapPlayer.name)

      const point = player.timedUnit && player.timedUnit.getPoint()
      const location = point && Location(point.x, point.y)
      const camDistance = GetCameraField(CAMERA_FIELD_ZOFFSET)

      player.timedUnit && location && PanCameraToTimedLocWithZForPlayer(mapPlayer.handle, location, camDistance, 0.75)
    })

    if (config.mode == Mode.DEBUG) {
      const playerId = 4
      const allyId = playerId + ALLY_SHIFT
      const player = new GamePlayer(config, playerId, allyId)
      this.players[4] = new PlayerManager(player)
      const mapPlayer = MapPlayer.fromIndex(4)
      mapPlayer && (mapPlayer.name = "DEBUG")
    }
  }

  private init() {
    this.enemyManager.init()
    this.borderService.init()
    AllyUtil.setEnemies()

    for (const player in this.players) {
      const playerManager = this.players[player]
      const playerId = playerManager.player.playerId
      const enemies = this.borderService.neighbors.get(playerId) ?? new Set()
      const mapPlayers: Array<GamePlayer> = [...enemies].map((it: number) => this.players[it].player)
      playerManager.init(mapPlayers)
    }

    this.eventService.subscribe(EventType.PER_SECOND, () => this.update(1))
    this.eventService.subscribe(EventType.CASTING_STARTED, (castingUnit: Unit, spellId: number) => this.onCast(castingUnit, spellId))
    this.eventService.subscribe(EventType.CASTING_FINISHED, (castingUnit: Unit, spellId: number) => this.onFinishCast(castingUnit, spellId))
    this.eventService.subscribe(EventType.UNIT_DEATH, (deathUnit: Unit, killingUnit: Unit) => this.onUnitDeath(deathUnit, killingUnit))
    this.eventService.subscribe(EventType.UPGRADING_FINISHED, (player: MapPlayer, techId: number) => this.onResearchFinished(player, techId))
  }

  private onBuild(building: Unit) {
    this.players[ifAllyGetOwner(building.owner.id)].onBuild(building)
    StartUtil.startWhenAllCastlesAreBuilt(this.playersArr, () => this.init())
  }

  private update(delta: number) {
    for (const player in this.players) {
      this.players[player].update(delta)
    }
    this.enemyManager.update(delta)
  }

  private onCast(castingUnit: Unit, spellId: number) {
    this.players[castingUnit.owner.id].onCast(castingUnit, spellId)
  }

  private onFinishCast(castingUnit: Unit, spellId: number) {
    this.players[castingUnit.owner.id].onFinishCast(castingUnit, spellId)
  }

  private onUnitDeath(deathUnit: Unit, killingUnit: Unit) {
    this.enemyManager.onUnitDeath(deathUnit, killingUnit)
  }

  private onResearchFinished(player: MapPlayer, techId: number) {
    this.players[player.id].onResearchFinished(techId)
  }
}
