import { MapPlayer, Unit } from "w3ts"

import { EnemyManager } from "../main/EnemyManager"
import { PlayerManager } from "../main/PlayerManager"
import { EventService, EventType } from "event/EventService"
import { GamePlayer } from "game/GamePlayer"
import { WarService } from "service/WarService"
import { Config, Mode, Zones } from "util/Config"
import { ALLY_SHIFT } from "util/Globals"
import { forEachPlayer, ifAllyGetOwner, sendChatMessageToAllPlayers, setAliance } from "util/Util"

export class GameManager {
  private readonly players: Record<number, PlayerManager> = {}
  private readonly playersArr: Array<GamePlayer>
  private readonly eventService: EventService
  private readonly enemyManager: EnemyManager

  constructor(config: Config) {
    forEachPlayer((mapPlayer: MapPlayer) => {
      if (mapPlayer.slotState == PLAYER_SLOT_STATE_PLAYING && mapPlayer.controller == MAP_CONTROL_USER) {
        const playerId = mapPlayer.id
        const allyId = playerId + ALLY_SHIFT
        const player = new GamePlayer(config, playerId, allyId)
        this.players[playerId] = new PlayerManager(player)
        const mapPlayerAlly = MapPlayer.fromIndex(allyId)
        mapPlayerAlly && (mapPlayerAlly.name = mapPlayer.name)
      }
    })

    if (config.mode == Mode.DEBUG) {
      const playerId = 4
      const allyId = playerId + ALLY_SHIFT
      const player = new GamePlayer(config, playerId, allyId)
      this.players[4] = new PlayerManager(player)
      const mapPlayer = MapPlayer.fromIndex(4)
      mapPlayer && (mapPlayer.name = "DEBUG")
    }

    this.playersArr = Object.entries(this.players).map((it) => it[1].player)

    this.eventService = new EventService(config)
    this.enemyManager = new EnemyManager(this.playersArr)

    this.eventService.subscribe(EventType.PER_SECOND, () => this.update(1))
    this.eventService.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.onBuild(building))
    this.eventService.subscribe(EventType.CASTING_STARTED, (castingUnit: Unit, spellId: number) => this.onCast(castingUnit, spellId))
    this.eventService.subscribe(EventType.CASTING_FINISHED, (castingUnit: Unit, spellId: number) => this.onFinishCast(castingUnit, spellId))
    this.eventService.subscribe(EventType.START_TIMER_EXPIRED, () => this.onStartTimerExpired())
    this.eventService.subscribe(EventType.UNIT_DEATH, (deathUnit: Unit, killingUnit: Unit) => this.onUnitDeath(deathUnit, killingUnit))

    if (config.mode == Mode.DEBUG) {
      FogMaskEnableOff()
      FogEnableOff()
    } else {
      FogMaskEnableOff()
    }

    setAliance(Player(0), Player(12))
    setAliance(Player(1), Player(13))
    setAliance(Player(2), Player(14))
    setAliance(Player(3), Player(15))
    setAliance(Player(4), Player(16))

    const originWorldFrame = BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0)

    const iconWidth = 0.02
    const width = iconWidth * 5
    const height = 0.02

    const iconsContainer = originWorldFrame && BlzCreateFrameByType("FRAME", "IconsContainer", originWorldFrame, "", 0)
    iconsContainer && BlzFrameSetSize(iconsContainer, width, height)
    iconsContainer && BlzFrameSetPoint(iconsContainer, FRAMEPOINT_TOP, originWorldFrame, FRAMEPOINT_TOP, 0.1, -0.025)

    const iconContainer = iconsContainer && BlzCreateFrameByType("FRAME", "IconContainer", iconsContainer, "", 0)
    iconContainer && BlzFrameSetSize(iconContainer, iconWidth, height)
    iconContainer && BlzFrameSetPoint(iconContainer, FRAMEPOINT_TOPLEFT, iconsContainer, FRAMEPOINT_TOPLEFT, 0, 0)

    const iconFrame = iconsContainer && BlzCreateFrameByType("BACKDROP", "Icon", iconsContainer, "", 0)
    iconFrame && BlzFrameSetSize(iconFrame, iconWidth, height)
    iconFrame && BlzFrameSetPoint(iconFrame, FRAMEPOINT_TOPLEFT, iconsContainer, FRAMEPOINT_TOPLEFT, 0, 0)
    iconFrame && BlzFrameSetTexture(iconFrame, "ReplaceableTextures\\CommandButtons\\BTNBlink.blp", 0, true)

    const tooltipFrameBackground = originWorldFrame && BlzCreateFrame("QuestButtonBaseTemplate", originWorldFrame, 0, 0)
    tooltipFrameBackground && BlzFrameSetSize(tooltipFrameBackground, 0.25, 0.025)
    tooltipFrameBackground && BlzFrameSetPoint(tooltipFrameBackground, FRAMEPOINT_CENTER, originWorldFrame, FRAMEPOINT_CENTER, 0, 0)

    const tooltipText = tooltipFrameBackground && BlzCreateFrameByType("TEXT", "TooltipText", tooltipFrameBackground, "", 0)
    tooltipText && BlzFrameSetSize(tooltipText, width, height)
    tooltipText && BlzFrameSetPoint(tooltipText, FRAMEPOINT_CENTER, tooltipFrameBackground, FRAMEPOINT_CENTER, 0, 0)
    tooltipText && BlzFrameSetText(tooltipText, "|cffffcc00Gold Income|r\n+5 gold per second\nGold Spent: 500\nGold Earned: 55")

    tooltipText && iconContainer && BlzFrameSetTooltip(iconContainer, tooltipFrameBackground)
  }

  private onBuild(building: Unit) {
    this.players[ifAllyGetOwner(building.owner.id)].onBuild(building)
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
