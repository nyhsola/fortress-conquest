export class IconPanel {
  public readonly handle: framehandle

  constructor(originWorldFrame: framehandle, width: number, height: number) {
    this.handle = BlzCreateFrameByType("FRAME", "IconsContainer", originWorldFrame, "", 0)!!
    this.handle && BlzFrameSetSize(this.handle, width, height)
    this.handle && BlzFrameSetPoint(this.handle, FRAMEPOINT_TOP, originWorldFrame, FRAMEPOINT_TOP, 0.1, -0.025)
  }
}
