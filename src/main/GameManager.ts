import { MapPlayer, Unit } from "w3ts"

import { PlayerManager } from "./PlayerManager"
import { EventService, EventType } from "event/TriggerSystem"
import { Config } from "util/Config"
import { forEachPlayer } from "util/Util"

export class GameManager {
  private readonly config: Config
  private players: Record<number, PlayerManager> = {}

  constructor(config: Config) {
    this.config = config
  }

  public init() {
    const eventService = new EventService()

    forEachPlayer((player: MapPlayer) => {
      const id = player.id
      this.players[id] = new PlayerManager(this.config, id)
    })

    eventService.subscribe(EventType.PER_SECOND, () => this.update(1))
    eventService.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.onBuild(building))
  }

  public onBuild(building: Unit) {
    this.players[building.owner.id].onBuild(building)
  }

  private update(delta: number) {
    for (const player in this.players) {
      this.players[player].update(delta)
    }
  }
}
