const OFFSET_X = 0.02
const OFFSET_Y = -0.05

export class Tooltip {
  private readonly handle: framehandle

  constructor(originWorldFrame: framehandle, relative: framehandle, lines: number, offsetx: number, offsety: number, tooltipFor: framehandle) {
    const tooltipFrameBackground = BlzCreateFrame("QuestButtonBaseTemplate", originWorldFrame, 0, 0)!!
    BlzFrameSetSize(tooltipFrameBackground, 0.15, 0.05)
    BlzFrameSetPoint(tooltipFrameBackground, FRAMEPOINT_BOTTOM, relative, FRAMEPOINT_BOTTOM, OFFSET_X + offsetx, OFFSET_Y + offsety)

    this.handle = tooltipFrameBackground && BlzCreateFrameByType("TEXT", "TooltipText", tooltipFrameBackground, "", 0)!!
    BlzFrameSetSize(this.handle, 0.1, 0.01 * lines)
    BlzFrameSetPoint(this.handle, FRAMEPOINT_CENTER, tooltipFrameBackground, FRAMEPOINT_CENTER, 0, 0)
    BlzFrameSetText(this.handle, "")

    BlzFrameSetTooltip(tooltipFor, tooltipFrameBackground)
  }

  public updateText(text: string) {
    BlzFrameSetText(this.handle, text)
  }
}
