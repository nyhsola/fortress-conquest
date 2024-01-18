import { MapPlayer, Unit } from "w3ts"

import { Player } from "player/Player"
import { TriggerSystem, TriggerType } from "system/TriggerSystem"
import { Config } from "util/Config"
import { forEachPlayer } from "util/Util"

export class PlayerManager {
  private readonly config: Config
  private players: Record<number, Player> = {}

  constructor(config: Config, eventSystem: TriggerSystem) {
    this.config = config

    forEachPlayer((player: MapPlayer) => {
      let id = player.id
      this.players[id] = new Player(this.config, id)
    })

    eventSystem.subscribe(TriggerType.BUILDING_FINISHED, (building: Unit) => this.players[building.owner.id].onCastleBuild(building))
    eventSystem.subscribe(TriggerType.PER_SECOND, () => this.tick(1))
  }

  private tick(delta: number) {
    for (const player in this.players) {
      this.players[player].tick(delta)
    }
  }
}
