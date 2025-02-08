import { GamePlayer } from "game/GamePlayer"
import { Icon } from "ui/Icon"
import { IconPanel } from "ui/IconPanel"
import { Tooltip } from "ui/Tooltip"
import { forLocalPlayer } from "util/CommonUtil"

const iconCount = 5
const iconWidth = 0.02
const iconHeight = 0.02

export class UIManager {
  private readonly player: GamePlayer

  constructor(player: GamePlayer) {
    this.player = player

    const worldFrame = BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0)!!

    const iconPanel = new IconPanel(worldFrame, iconWidth * iconCount, iconHeight)
    const icon = new Icon(iconPanel.handle, iconWidth, iconHeight)
    const tooltip = new Tooltip(worldFrame, iconPanel.handle, icon.container)

    BlzFrameSetVisible(iconPanel.handle, false)

    forLocalPlayer(() => {
      BlzFrameSetVisible(iconPanel.handle, true)
    }, this.player.playerId)
  }
}
