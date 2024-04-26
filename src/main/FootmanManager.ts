import { Unit } from "w3ts"

import { FOOTMAN_ORDER, FootmanBehaviour } from "behaviour/FootmanBehaviour"
import { Footman } from "game/Footman"
import { GamePlayer } from "game/Player"
import { FOOTMAN_MODE, TooltipService } from "service/TooltipService"
import { ABILITY } from "util/Config"
import { Task } from "util/Task"
import { createTask } from "util/Util"

export class FootmanManager {
  private readonly player: GamePlayer
  private readonly footmans: Array<Footman> = []
  private readonly behaviour: FootmanBehaviour
  private readonly behaviourTask: Task = createTask(() => this.updateBehavior(), 3)
  private readonly footmanAbility: Task = createTask(() => this.onFootmanCast(), 5)

  private currentMode = FOOTMAN_MODE.DEFENCE
  private footmanLimit = 6

  constructor(player: GamePlayer) {
    this.player = player
    this.behaviour = new FootmanBehaviour(this.player)
    this.behaviour.addOrder(FOOTMAN_ORDER.DEFEND, this.footmanLimit)
  }

  public init() {
    this.footmanAbility.reset()
  }

  public update(delta: number) {
    this.behaviourTask.update(delta)
    this.footmanAbility.update(delta)
  }

  private updateBehavior() {
    this.behaviour.updateState(this.footmans)
  }

  public onWarModeSwitch() {
    this.currentMode === FOOTMAN_MODE.DEFENCE ? (this.currentMode = FOOTMAN_MODE.WAR) : (this.currentMode = FOOTMAN_MODE.DEFENCE)
    const newOrder = this.currentMode === FOOTMAN_MODE.DEFENCE ? FOOTMAN_ORDER.DEFEND : FOOTMAN_ORDER.WAR
    TooltipService.updateFootmanMode(this.player.playerId, this.currentMode)
    this.behaviour.addOrder(newOrder, this.footmanLimit)
  }

  private onFootmanCast() {
    const castle = this.player.getCastle()
    const point = this.player.getPoint()
    const direction = this.player.getDirection()

    if (!castle || castle.getAbilityLevel(ABILITY.FOOTMAN) != 1) return

    if (this.footmans.length >= this.footmanLimit || !point || !direction) return
    this.footmans.push(new Footman(point, this.player.allyId))

    TooltipService.updateFootmanCount(this.player.playerId, this.footmans.length, this.footmanLimit)
  }
}
