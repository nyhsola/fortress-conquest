import { MapPlayer, Unit } from "w3ts"

import { Player } from "main/Player"
import { Config, UNIT } from "util/Config"
import { forEachPlayer } from "util/Util"

export class PlayerManager {
  private readonly config: Config

  private players: Record<number, Player> = {}

  constructor(config: Config) {
    this.config = config

    forEachPlayer((player: MapPlayer) => {
      const id = player.id
      this.players[id] = new Player(this.config, id)
    })
  }

  public onBuild(building: Unit) {
    if (building.typeId != UNIT.CASTLE) return
    this.players[building.owner.id].onCastleBuild(building)
  }

  public tick(delta: number) {
    for (const player in this.players) {
      this.players[player].tick(delta)
    }
  }
}
