export class Icon {
  public readonly container: framehandle

  constructor(iconsContainer: framehandle, iconWidth: number, iconHeight: number) {
    this.container = BlzCreateFrameByType("FRAME", "IconContainer", iconsContainer, "", 0)!!
    BlzFrameSetSize(this.container, iconWidth, iconHeight)
    BlzFrameSetPoint(this.container, FRAMEPOINT_TOPLEFT, iconsContainer, FRAMEPOINT_TOPLEFT, 0, 0)

    const iconFrame = BlzCreateFrameByType("BACKDROP", "Icon", iconsContainer, "", 0)!!
    BlzFrameSetSize(iconFrame, iconWidth, iconHeight)
    BlzFrameSetPoint(iconFrame, FRAMEPOINT_TOPLEFT, iconsContainer, FRAMEPOINT_TOPLEFT, 0, 0)
    BlzFrameSetTexture(iconFrame, "ReplaceableTextures\\CommandButtons\\BTNBlink.blp", 0, true)
  }
}
