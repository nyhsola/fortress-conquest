import { Tooltip } from "./Tooltip"

export class Icon {
  public readonly handle: framehandle
  private readonly tooltip: Tooltip

  constructor(originWorldFrame: framehandle, relative: framehandle, lines: number, texture: string, offsetX: number, iconWidth: number, iconHeight: number) {
    this.handle = BlzCreateFrameByType("FRAME", "IconContainer", relative, "", 0)!!
    BlzFrameSetSize(this.handle, iconWidth, iconHeight)
    BlzFrameSetPoint(this.handle, FRAMEPOINT_TOPLEFT, relative, FRAMEPOINT_TOPLEFT, offsetX, 0)

    const iconFrame = BlzCreateFrameByType("BACKDROP", "Icon", relative, "", 0)!!
    BlzFrameSetSize(iconFrame, iconWidth, iconHeight)
    BlzFrameSetPoint(iconFrame, FRAMEPOINT_TOPLEFT, relative, FRAMEPOINT_TOPLEFT, offsetX, 0)
    BlzFrameSetTexture(iconFrame, texture, 0, true)

    this.tooltip = new Tooltip(originWorldFrame, relative, lines, offsetX, 0, this.handle)
  }

  public updateText(text: string) {
    this.tooltip.updateText(text)
  }
}
