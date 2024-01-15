import { Timer } from "w3ts"
import { addScriptHook, W3TS_HOOK } from "w3ts/hooks"

import { initializeGame } from "startup"
import { Log } from "util/Log"

const BUILD_DATE = compiletime(() => new Date().toUTCString())
const TS_VERSION = compiletime(() => require("typescript").version)
const TSTL_VERSION = compiletime(() => require("typescript-to-lua").version)

function tsMain() {
  Timer.create().start(0, false, () => {
    try {
      initializeGame()
    } catch (ex: any) {
      Log.Error(ex)
    }
  })
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, tsMain)
