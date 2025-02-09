import { Icon } from "./Icon"

const OFFSET_X = 0.1
const OFFSET_Y = -0.025

export class IconPanel {
  public readonly handle: framehandle

  private readonly originWorldFrame: framehandle
  private icons: Map<string, Icon> = new Map()
  private padding: number
  private iconWidth: number
  private iconHeight: number

  constructor(originWorldFrame: framehandle, padding: number, iconCountMax: number, iconWidth: number, iconHeight: number) {
    this.originWorldFrame = originWorldFrame
    this.iconWidth = iconWidth
    this.iconHeight = iconHeight
    this.padding = padding

    this.handle = BlzCreateFrameByType("FRAME", "IconsContainer", originWorldFrame, "", 0)!!
    this.handle && BlzFrameSetSize(this.handle, iconWidth * iconCountMax, iconHeight)
    this.handle && BlzFrameSetPoint(this.handle, FRAMEPOINT_TOP, originWorldFrame, FRAMEPOINT_TOP, OFFSET_X, OFFSET_Y)
  }

  public addIcon(name: string, texture: string, lines: number) {
    const offsetX = this.icons.size * this.iconWidth + this.icons.size * this.padding
    const icon = new Icon(this.originWorldFrame, this.handle, lines, texture, offsetX, this.iconWidth, this.iconHeight)
    this.icons.set(name, icon)
  }

  public updateIcon(name: string, text: string) {
    this.icons.get(name)?.updateText(text)
  }
}
