import { MapPlayer, Unit } from "w3ts"

import { PlayerManager } from "./PlayerManager"
import { EventService, EventType } from "event/EventService"
import { Config } from "util/Config"
import { forEachPlayer } from "util/Util"

export class GameManager {
  private readonly config: Config
  private readonly eventService: EventService
  private readonly players: Record<number, PlayerManager> = {}

  constructor(config: Config) {
    this.config = config
    this.eventService = new EventService()

    forEachPlayer((player: MapPlayer) => (this.players[player.id] = new PlayerManager(this.config, player.id)))

    this.eventService.subscribe(EventType.PER_SECOND, () => this.update(1))
    this.eventService.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.onBuild(building))
    this.eventService.subscribe(EventType.CASTING_STARTED, (castingUnit: Unit, spellId: number) => this.onCast(castingUnit, spellId))
  }

  private onBuild(building: Unit) {
    this.players[building.owner.id].onBuild(building)
  }

  private onCast(castingUnit: Unit, spellId: number) {
    this.players[castingUnit.owner.id].onCast(castingUnit, spellId)
  }

  private update(delta: number) {
    for (const player in this.players) {
      this.players[player].update(delta)
    }
  }
}
