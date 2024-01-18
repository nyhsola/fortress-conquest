import { MapPlayer, Unit } from "w3ts"

import { Player } from "player/Player"
import { EventSystem, EventType } from "system/EventSystem"
import { Config } from "util/Config"
import { forEachPlayer } from "util/Util"

export class PlayerManager {
  private readonly config: Config
  private players: Record<number, Player> = {}

  constructor(config: Config, eventSystem: EventSystem) {
    this.config = config

    forEachPlayer((player: MapPlayer) => {
      let id = player.id
      this.players[id] = this.createPlayer(id)
    })

    eventSystem.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.players[building.owner.id].onCastleBuild(building))
    eventSystem.subscribe(EventType.PER_SECOND, () => this.tick(1))
  }

  private tick(delta: number) {
    for (const player in this.players) {
      this.players[player].tick(delta)
    }
  }

  private createPlayer(id: number): Player {
    return new Player(this.config, id)
  }
}
