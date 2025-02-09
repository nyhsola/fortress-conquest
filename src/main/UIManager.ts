import { GamePlayer } from "game/GamePlayer"
import { TEXTURES } from "global/Config"
import { IconPanel } from "ui/IconPanel"
import { forLocalPlayer } from "util/CommonUtil"

const iconCount = 5
const iconWidth = 0.02
const iconHeight = 0.02

export enum UI_ICON {
  WORKER,
  FOOTMAN,
  GOLD_CHEST,
  DEADLORD,
}

export class UIManager {
  private readonly player: GamePlayer
  private readonly iconPanel: IconPanel

  constructor(player: GamePlayer) {
    this.player = player

    const worldFrame = BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0)!!

    this.iconPanel = new IconPanel(worldFrame, 0.002, iconCount, iconWidth, iconHeight)

    this.iconPanel.addIcon(UI_ICON.GOLD_CHEST.toString(), TEXTURES.GOLD_CHEST, 2)
    this.iconPanel.addIcon(UI_ICON.WORKER.toString(), TEXTURES.WORKER, 2)
    this.iconPanel.addIcon(UI_ICON.FOOTMAN.toString(), TEXTURES.FOOTMAN, 2)
    this.iconPanel.addIcon(UI_ICON.DEADLORD.toString(), TEXTURES.DEADLORD, 2)

    BlzFrameSetVisible(this.iconPanel.handle, false)

    forLocalPlayer(() => {
      BlzFrameSetVisible(this.iconPanel.handle, true)
    }, this.player.playerId)
  }

  public updateIconTooltip(uiIcon: UI_ICON, text: string) {
    this.iconPanel.updateIcon(uiIcon.toString(), text)
  }
}
