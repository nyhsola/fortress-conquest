import { FOOTMAN_STATE } from "game/Footman"
import { Squad } from "game/Squad"

export enum FOOTMAN_ORDER {
  DEFEND,
  WAR,
}

enum GLOBAL_ORDER {
  RESET,
}

export class FootmanBehaviour {
  private readonly globalOrders: Array<GLOBAL_ORDER> = []

  constructor() {
    this.globalOrders.push(GLOBAL_ORDER.RESET)
  }

  public updateState(squads: Array<Squad>) {
    switch (this.globalOrders.shift()) {
      case GLOBAL_ORDER.RESET:
        squads.forEach((it) => it.reset())
    }

    squads.forEach((it) => this.proceedSquad(it))
  }

  private proceedSquad(squad: Squad) {
    for (const footman of squad.getFootmans()) {
      switch (footman.getState()) {
        case FOOTMAN_STATE.LOCKED:
          squad.proceedOrder(footman)
          break
      }
    }

    if (squad.getOrders().length > 0) {
      squad
        .getFootmans()
        .filter((footman, index) => footman.getState() == FOOTMAN_STATE.FREE)
        .slice(0, squad.getOrders().length)
        .forEach((footman) => footman.lockFootman())
    }
  }
}
