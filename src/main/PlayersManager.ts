import { MapPlayer, Unit } from "w3ts"

import { PlayerManager } from "main/PlayerManager"
import { Config, UNIT } from "util/Config"
import { forEachPlayer } from "util/Util"

export class PlayersManager {
  private readonly config: Config

  private players: Record<number, PlayerManager> = {}

  constructor(config: Config) {
    this.config = config

    forEachPlayer((player: MapPlayer) => {
      const id = player.id
      this.players[id] = new PlayerManager(this.config, id)
    })
  }

  public onBuild(building: Unit) {
    this.players[building.owner.id].onBuild(building)
  }

  public update(delta: number) {
    for (const player in this.players) {
      this.players[player].update(delta)
    }
  }
}
