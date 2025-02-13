import { GamePlayer } from "game/GamePlayer"
import { forLocalPlayer } from "util/CommonUtil"
import { LOCAL_COLOR, withColor } from "util/TextUtil"

export type TABLE_ITEM_KEY = { x: number; y: number }

export const TABLE_ITEM = {
  GPM: { x: 0, y: 1 },
  TOTAL_GOLD: { x: 1, y: 1 },
} as const

export class TableManager {
  private readonly player: GamePlayer
  private readonly board: multiboard

  constructor(player: GamePlayer) {
    this.player = player

    this.board = CreateMultiboard()!!
    MultiboardSetTitleText(this.board, "Fortress Conquest")
    MultiboardSetColumnCount(this.board, 2)
    MultiboardSetRowCount(this.board, 2)

    MultiboardSetItemValue(MultiboardGetItem(this.board, 0, 0)!!, withColor("GPM:", LOCAL_COLOR.GREY))
    MultiboardSetItemValue(MultiboardGetItem(this.board, 1, 0)!!, withColor("Total Gold:", LOCAL_COLOR.GREY))

    // remove icon
    MultiboardSetItemStyle(MultiboardGetItem(this.board, 0, 0)!!, true, false)
    MultiboardSetItemStyle(MultiboardGetItem(this.board, 1, 0)!!, true, false)

    MultiboardSetItemStyle(MultiboardGetItem(this.board, 0, 1)!!, true, false)
    MultiboardSetItemStyle(MultiboardGetItem(this.board, 1, 1)!!, true, false)

    // item width
    MultiboardSetItemWidth(MultiboardGetItem(this.board, 0, 0)!!, 0.05)
    MultiboardSetItemWidth(MultiboardGetItem(this.board, 1, 0)!!, 0.05)

    MultiboardSetItemWidth(MultiboardGetItem(this.board, 0, 1)!!, 0.05)
    MultiboardSetItemWidth(MultiboardGetItem(this.board, 1, 1)!!, 0.05)

    forLocalPlayer(() => {
      MultiboardDisplay(this.board, true)
    }, this.player.playerId)
  }

  public setItemText(tableItem: TABLE_ITEM_KEY, value: string) {
    MultiboardSetItemValue(MultiboardGetItem(this.board, tableItem.x, tableItem.y)!!, value)
  }
}
