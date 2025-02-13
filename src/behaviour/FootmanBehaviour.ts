import { Footman } from "game/Footman"
import { GamePlayer } from "game/GamePlayer"
import { Positions } from "global/Positions"

export enum FOOTMAN_ORDER {
  DEFEND_CASTLE,
  PREPARE_FOR_ATTACK,
  GO_TO_BANNER,
}

export class FootmanBehaviour {
  private readonly player: GamePlayer

  constructor(player: GamePlayer) {
    this.player = player
  }

  public updateState(footman: Footman) {
    switch (footman.getOrders().shift()) {
      case FOOTMAN_ORDER.DEFEND_CASTLE:
        this.onDefendOrder(footman)
        break
      case FOOTMAN_ORDER.PREPARE_FOR_ATTACK:
        this.onPrepareWarOrder(footman)
        break
      case FOOTMAN_ORDER.GO_TO_BANNER:
        this.onBanner(footman)
        break
    }
  }

  private onDefendOrder(footman: Footman) {
    const point = this.player.getCastle()?.getPoint()
    const direction = this.player.getDirection()
    const position = footman.getIndex()
    const defPoint = position && point && direction && Positions.FOOTMAN_DEF[position](point, direction)
    const location = defPoint && Location(defPoint?.x, defPoint?.y)
    location && footman.orderMove(location)
  }

  private onPrepareWarOrder(footman: Footman) {
    const point = this.player.getAttackPoint(0)
    const location = Location(point?.x, point?.y)
    location && footman.orderMove(location)
  }

  private onBanner(footman: Footman) {
    const point = this.player.getPoint()
    const direction = this.player.getDirection()
    const pointBanner = point && direction && Positions.BANNER(point, direction)
    pointBanner && footman.instantMove(Location(pointBanner.x, pointBanner.y))
  }
}
