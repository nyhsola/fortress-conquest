import { MapPlayer, Unit } from "w3ts"

import { Player } from "player/Player"
import { AbilitySystem, AbilityType } from "system/AbilitySystem"
import { EventSystem, EventType } from "system/EventSystem"
import { Config } from "util/Config"
import { forEachPlayer } from "util/Util"

export class PlayerManager {
  private readonly config: Config
  private players: Record<number, Player> = {}

  constructor(config: Config, eventSystem: EventSystem, abilitySystem: AbilitySystem) {
    this.config = config

    forEachPlayer((player: MapPlayer) => {
      let id = player.id
      this.players[id] = this.createPlayer(id)
    })

    eventSystem.subscribe(EventType.BUILDING_FINISHED, (building: Unit) => this.players[building.owner.id].onCastleBuild(building))
    abilitySystem.subscribe(AbilityType.WORKER, (unit: Unit) => this.players[unit.owner.id].onWorkerCast(unit))
  }

  private createPlayer(id: number): Player {
    return new Player(this.config, id)
  }
}
