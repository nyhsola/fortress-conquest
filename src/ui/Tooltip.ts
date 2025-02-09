const OFFSET_X = 0.02
const OFFSET_Y = -0.05

export class Tooltip {
  constructor(originWorldFrame: framehandle, relative: framehandle, offsetx: number, offsety: number, tooltipFor: framehandle) {
    const tooltipFrameBackground = BlzCreateFrame("QuestButtonBaseTemplate", originWorldFrame, 0, 0)!!
    BlzFrameSetSize(tooltipFrameBackground, 0.15, 0.05)
    BlzFrameSetPoint(tooltipFrameBackground, FRAMEPOINT_BOTTOM, relative, FRAMEPOINT_BOTTOM, OFFSET_X + offsetx, OFFSET_Y + offsety)

    const tooltipText = tooltipFrameBackground && BlzCreateFrameByType("TEXT", "TooltipText", tooltipFrameBackground, "", 0)!!
    BlzFrameSetSize(tooltipText, 0.1, 0.02)
    BlzFrameSetPoint(tooltipText, FRAMEPOINT_CENTER, tooltipFrameBackground, FRAMEPOINT_CENTER, 0, 0)
    BlzFrameSetText(tooltipText, "|cffffcc00Gold Income|r\n+5 gold per second")

    BlzFrameSetTooltip(tooltipFor, tooltipFrameBackground)
  }
}
