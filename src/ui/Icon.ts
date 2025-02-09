import { Tooltip } from "./Tooltip"

export class Icon {
  public readonly handle: framehandle

  constructor(originWorldFrame: framehandle, relative: framehandle, index: number, iconWidth: number, iconHeight: number) {
    this.handle = BlzCreateFrameByType("FRAME", "IconContainer", relative, "", 0)!!
    BlzFrameSetSize(this.handle, iconWidth, iconHeight)
    BlzFrameSetPoint(this.handle, FRAMEPOINT_TOPLEFT, relative, FRAMEPOINT_TOPLEFT, index * iconWidth, 0)

    const iconFrame = BlzCreateFrameByType("BACKDROP", "Icon", relative, "", 0)!!
    BlzFrameSetSize(iconFrame, iconWidth, iconHeight)
    BlzFrameSetPoint(iconFrame, FRAMEPOINT_TOPLEFT, relative, FRAMEPOINT_TOPLEFT, index * iconWidth, 0)
    BlzFrameSetTexture(iconFrame, "ReplaceableTextures\\CommandButtons\\BTNBlink.blp", 0, true)

    new Tooltip(originWorldFrame, relative, index * iconWidth, 0, this.handle)
  }
}
