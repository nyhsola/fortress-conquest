import { GameCache, Point, Unit } from "w3ts"

import { GamePlayer } from "./GamePlayer"
import { UNIT } from "global/Config"
import { Positions } from "global/Positions"
import { createUnitAtPoint, issuePointOrder } from "util/CommonUtil"

export enum FOOTMAN_STATE {
  CREATED,
  PREPARE,
  WAITING,

  PREPARE_FOR_ATTACK,
  WAITING_FOR_ATTACK,

  ATTACK_CASTLE,
  DEFEND_CASTLE,
}

export enum FOOTMAN_ORDER {
  DEFEND_CASTLE,
  PREPARE_FOR_ATTACK,
  ATTACK_CASTLE,
  PREPARE,
}

export class Footman {
  private readonly player: GamePlayer
  private readonly footman: Unit | undefined
  private orders: Array<FOOTMAN_ORDER> = []
  private index: number = 0

  public state: FOOTMAN_STATE = FOOTMAN_STATE.CREATED

  constructor(player: GamePlayer) {
    this.player = player

    const barracks = this.player?.getBarracks()!!
    const point = barracks?.getPoint()!!

    this.footman = createUnitAtPoint(point, this.player.allyId, UNIT.FOOTMAN)
  }

  public addOrder = (order: FOOTMAN_ORDER) => this.orders.push(order)

  public setIndex = (index: number) => (this.index = index)

  public isWaitingAttack = () => this.state == FOOTMAN_STATE.WAITING_FOR_ATTACK

  public isBusy = () => this.footman?.currentOrder != 0 || this.orders.length != 0

  public isDead = () => this.footman?.isAlive() == false

  public updateState() {
    switch (this.state) {
      case FOOTMAN_STATE.CREATED:
      case FOOTMAN_STATE.WAITING:
      case FOOTMAN_STATE.WAITING_FOR_ATTACK:
        this.proceedOrder()
        break
      case FOOTMAN_STATE.PREPARE:
        if (!this.isBusy()) {
          this.state = FOOTMAN_STATE.WAITING
        }
        break
      case FOOTMAN_STATE.PREPARE_FOR_ATTACK:
        if (!this.isBusy()) {
          this.state = FOOTMAN_STATE.WAITING_FOR_ATTACK
        }
        break
    }
  }

  private proceedOrder() {
    if (this.orders.length != 0) {
      const order = this.orders[0]
      switch (order) {
        case FOOTMAN_ORDER.DEFEND_CASTLE:
          this.onDefendOrder()
          this.orders.shift()
          this.state = FOOTMAN_STATE.DEFEND_CASTLE
          break
        case FOOTMAN_ORDER.ATTACK_CASTLE:
          this.onAttackOrder()
          this.orders.shift()
          this.state = FOOTMAN_STATE.ATTACK_CASTLE
          break
        case FOOTMAN_ORDER.PREPARE:
          this.onBanner()
          this.orders.shift()
          this.state = FOOTMAN_STATE.PREPARE
          break
        case FOOTMAN_ORDER.PREPARE_FOR_ATTACK:
          this.onPrepareAttackOrder()
          this.orders.shift()
          this.state = FOOTMAN_STATE.PREPARE_FOR_ATTACK
          break
      }
    }
  }

  private onDefendOrder() {
    const point = this.player.getCastle()?.getPoint()
    const direction = this.player.getDirection()
    const defPoint = this.index && point && direction && Positions.FOOTMAN_DEF[this.index](point, direction)
    const location = defPoint && Location(defPoint?.x, defPoint?.y)
    location && this.orderMove(location)
  }

  private onPrepareAttackOrder() {
    const point = this.player.getAttackPoint(0)
    const location = Location(point?.x, point?.y)
    location && this.orderMove(location)
  }

  private onAttackOrder() {
    const point = this.player.getEnemyCastle(0)?.getPoint()
    const location = point && Location(point?.x, point?.y)
    location && this.orderAttack(location)
  }

  private onBanner() {
    const point = this.player.getPoint()
    const direction = this.player.getDirection()
    const pointBanner = point && direction && Positions.BANNER(point, direction)
    this.removeGuardPosition()
    pointBanner && this.orderMove(Location(pointBanner.x, pointBanner.y))
  }

  private removeGuardPosition() {
    const unit = this.footman?.handle
    unit && RemoveGuardPosition(unit)
  }

  private orderMove(location: location) {
    this.footman && issuePointOrder(this.footman, "move", location)
  }

  private orderAttack(location: location) {
    this.footman && issuePointOrder(this.footman, "attack", location)
  }
}
