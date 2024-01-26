import { MapPlayer } from "w3ts"

import { Player } from "game/Player"
import { createFloatingText } from "util/FTextUtil"

export class IncomeService {
  static onIncome(player: Player) {
    const mapAlly = MapPlayer.fromIndex(player.allyId)
    const allyGold = mapAlly?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
    if (allyGold > 0) {
      const mapPlayer = MapPlayer.fromIndex(player.playerId)
      const playerGold = mapAlly?.getState(PLAYER_STATE_RESOURCE_GOLD) ?? 0
      mapAlly?.setState(PLAYER_STATE_RESOURCE_GOLD, 0)
      mapPlayer?.setState(PLAYER_STATE_RESOURCE_GOLD, playerGold + allyGold)
      const castle = player.getCastle()
      castle && mapPlayer && createFloatingText("+" + allyGold, castle, mapPlayer)
    }
  }
}
