import { GamePlayer } from "game/GamePlayer"
import { forLocalPlayer } from "util/CommonUtil"

export class AbilityManager {
  private readonly player: GamePlayer

  constructor(player: GamePlayer) {
    this.player = player
  }

  public updateTooltip(ability: number, text: string) {
    forLocalPlayer(() => BlzSetAbilityTooltip(ability, text, 0), this.player.playerId)
  }

  public updateTooltipExtended(ability: number, text: string) {
    forLocalPlayer(() => BlzSetAbilityExtendedTooltip(ability, text, 0), this.player.playerId)
  }
}
