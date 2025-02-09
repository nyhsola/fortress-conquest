import { GamePlayer } from "game/GamePlayer"
import { IconPanel } from "ui/IconPanel"
import { forLocalPlayer } from "util/CommonUtil"

const iconCount = 5
const iconWidth = 0.02
const iconHeight = 0.02

export class UIManager {
  private readonly player: GamePlayer

  constructor(player: GamePlayer) {
    this.player = player

    const worldFrame = BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0)!!

    const iconPanel = new IconPanel(worldFrame, iconCount, iconWidth, iconHeight)

    iconPanel.addIcon()
    iconPanel.addIcon()

    BlzFrameSetVisible(iconPanel.handle, false)

    forLocalPlayer(() => {
      BlzFrameSetVisible(iconPanel.handle, true)
    }, this.player.playerId)
  }
}
