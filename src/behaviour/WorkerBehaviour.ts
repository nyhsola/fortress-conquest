import { Player } from "game/Player"
import { STATE, Worker } from "game/Worker"

export class WorkerBehaviour {
  static updateState(worker: Worker, player: Player) {
    switch (worker.getState()) {
      case STATE.FREE:
        const mine = player.getMine()
        mine && worker.orderHarvest(mine)
        break
    }
  }
}
