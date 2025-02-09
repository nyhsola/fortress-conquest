import { Icon } from "./Icon"

const OFFSET_X = 0.1
const OFFSET_Y = -0.025

export class IconPanel {
  public readonly handle: framehandle

  private readonly originWorldFrame: framehandle
  private readonly icons: Array<Icon> = []
  private iconWidth: number
  private iconHeight: number

  constructor(originWorldFrame: framehandle, iconCountMax: number, iconWidth: number, iconHeight: number) {
    this.originWorldFrame = originWorldFrame
    this.iconWidth = iconWidth
    this.iconHeight = iconHeight

    this.handle = BlzCreateFrameByType("FRAME", "IconsContainer", originWorldFrame, "", 0)!!
    this.handle && BlzFrameSetSize(this.handle, iconWidth * iconCountMax, iconHeight)
    this.handle && BlzFrameSetPoint(this.handle, FRAMEPOINT_TOP, originWorldFrame, FRAMEPOINT_TOP, OFFSET_X, OFFSET_Y)
  }

  public addIcon() {
    this.icons.push(new Icon(this.originWorldFrame, this.handle, this.icons.length, this.iconWidth, this.iconHeight))
  }
}
