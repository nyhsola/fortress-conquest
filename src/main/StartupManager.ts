import { Dialog, MapPlayer, Trigger } from "w3ts"

import { GameManager } from "./GameManager"
import { Config, Mode, Zones } from "util/Config"
import { sendChatMessageToAllPlayers } from "util/Util"

const UNTIL_START = 5
const DIALOG_TITLE = "Mode pick"

export class StartupManager {
  constructor() {
    const dialog = Dialog.create()
    const host = MapPlayer.fromIndex(0)

    sendChatMessageToAllPlayers("Wait for host to pick mode.")

    if (!dialog || !host) return

    dialog.setMessage("Choose an option")

    const button1 = dialog.addButton("Default")
    const button2 = dialog.addButton("Debug")

    const trigger1 = Trigger.create()
    const trigger2 = Trigger.create()

    if (!button1 || !button2) return

    trigger1.registerDialogButtonEvent(button1)
    trigger2.registerDialogButtonEvent(button2)

    const init = new Initializer()

    trigger1.addAction(() => init.defaultMode())
    trigger2.addAction(() => init.debugMode())

    dialog.display(host, true)
  }
}

class Initializer {
  private mode: Mode = Mode.DEFAULT
  private isConfirmed: boolean = false
  private timer: timer
  private timerDialog: timerdialog | undefined

  constructor() {
    this.timer = CreateTimer()
    StartTimerBJ(this.timer, false, UNTIL_START)
    this.timerDialog = CreateTimerDialogBJ(this.timer, DIALOG_TITLE)

    const startTimerExpired = Trigger.create()
    startTimerExpired.registerTimerExpireEvent(this.timer)
    startTimerExpired.addAction(() => this.confirm())
  }

  public defaultMode() {
    this.mode = Mode.DEFAULT
    this.confirm()
  }

  public debugMode() {
    this.mode = Mode.DEBUG
    this.confirm()
  }

  public confirm() {
    if (this.isConfirmed) return
    this.isConfirmed = true
    this.destroy()
    new GameManager(new Config(this.mode))
    sendChatMessageToAllPlayers("Mode: " + Mode[this.mode])
  }

  private destroy() {
    this.timer && DestroyTimer(this.timer)
    this.timerDialog && DestroyTimerDialogBJ(this.timerDialog)
  }
}
